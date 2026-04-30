import { useState, useEffect } from "react";
import "./Crud.css";

export default function App() {
  const [helyek, setHelyek] = useState([]);
  const [form, setForm] = useState({ az: null, telepules: "", utca: "" });

  const loadData = () => {
    fetch("http://localhost/Helykezelo/project/api/hely_list.php")
      .then(res => res.json())
      .then(data => setHelyek(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = form.az === null
      ? "http://localhost/Helykezelo/project/api/hely_add.php"
      : "http://localhost/Helykezelo/project/api/hely_update.php";

    const body = form.az === null
      ? { telepules: form.telepules, utca: form.utca }
      : { az: form.az, telepules: form.telepules, utca: form.utca };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(() => loadData());

    setForm({ az: null, telepules: "", utca: "" });
  };

  const editHely = (h) => {
    setForm({
      az: h.az,
      telepules: h.telepules,
      utca: h.utca
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteHely = async (az) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a helyet?")) return;

    await fetch("http://localhost/Helykezelo/project/api/hely_delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ az })
    });

    loadData();
  };

  return (
    <div className="crud-wrapper">

    <a href="../../../../index.html" className="back-btn">← Vissza a főoldalra</a>

    <h1 className="crud-title">React CRUD – Helyek</h1>

      <div className="crud-card">
        <h2>{form.az === null ? "Új hely hozzáadása" : "Hely módosítása"}</h2>

        <form onSubmit={handleSubmit} className="crud-form">
          <input
            type="text"
            placeholder="Település"
            value={form.telepules}
            onChange={(e) => setForm({ ...form, telepules: e.target.value })}
            required
            className="crud-input"
          />

          <input
            type="text"
            placeholder="Utca"
            value={form.utca}
            onChange={(e) => setForm({ ...form, utca: e.target.value })}
            required
            className="crud-input"
          />

          <button type="submit" className="crud-btn">
            {form.az === null ? "Hozzáadás" : "Mentés"}
          </button>
        </form>
      </div>

      <table className="crud-table">
        <thead>
          <tr>
            <th>Az</th>
            <th>Település</th>
            <th>Utca</th>
            <th>Műveletek</th>
          </tr>
        </thead>

        <tbody>
          {helyek.map(h => (
            <tr key={h.az}>
              <td>{h.az}</td>
              <td>{h.telepules}</td>
              <td>{h.utca}</td>
              <td>
                <button onClick={() => editHely(h)} className="crud-btn-edit">
                  Szerkesztés
                </button>

                <button onClick={() => deleteHely(h.az)} className="crud-btn-delete">
                  Törlés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
