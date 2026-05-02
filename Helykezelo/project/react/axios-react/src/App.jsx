import { useEffect, useState } from "react";
import axios from "axios";
import "./Crud.css";   

const API = "http://web1project.vgltd.hu/project/api/";

export default function App() {
  const [helyek, setHelyek] = useState([]);
  const [form, setForm] = useState({
    az: null,
    telepules: "",
    utca: ""
  });

  const load = () => {
    axios.get(API + "hely_list.php")
      .then(res => setHelyek(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const save = () => {
    if (!form.telepules || !form.utca) {
      alert("Minden mező kötelező!");
      return;
    }

    if (form.az === null) {
      axios.post(API + "hely_add.php", {
        telepules: form.telepules,
        utca: form.utca
      }).then(() => {
        load();
        setForm({ az: null, telepules: "", utca: "" });
      });
    } else {
      axios.post(API + "hely_update.php", {
        az: form.az,
        telepules: form.telepules,
        utca: form.utca
      }).then(() => {
        load();
        setForm({ az: null, telepules: "", utca: "" });
      });
    }
  };

  const del = (az) => {
    if (!window.confirm("Biztos törlöd?")) return;

    axios.post(API + "hely_delete.php", { az })
      .then(() => load());
  };

  return (
    <div className="container">
      <a href="../../../../index.html" className="back-btn">← Vissza a főoldalra</a>
      <h1>Axios CRUD – Helyek</h1>
      <br></br>
      <div className="form-row">
        <input
          placeholder="Település"
          value={form.telepules}
          onChange={(e) => setForm({ ...form, telepules: e.target.value })}
        />

        <input
          placeholder="Utca"
          value={form.utca}
          onChange={(e) => setForm({ ...form, utca: e.target.value })}
        />

        <button onClick={save} className="btn">
          {form.az === null ? "Hozzáadás" : "Módosítás"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>AZ</th>
            <th>Település</th>
            <th>Utca</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {helyek.map(h => (
            <tr key={h.az}>
              <td>{h.az}</td>
              <td>{h.telepules}</td>
              <td>{h.utca}</td>
              <td>
                <button onClick={() => {setForm(h);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    }} className="btn btn-edit">Szerkeszt
                </button>
                <button onClick={() => del(h.az)} className="btn btn-delete">
                  Töröl
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
