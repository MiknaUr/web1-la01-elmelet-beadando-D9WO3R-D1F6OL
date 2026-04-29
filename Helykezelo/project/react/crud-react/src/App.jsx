import { useState, useEffect } from "react";

export default function App() {
  const [helyek, setHelyek] = useState([]);
  const [form, setForm] = useState({ az: null, telepules: "", utca: "" });

  // 1) LISTA BETÖLTÉSE
  const loadData = () => {
    fetch("http://localhost/Helykezelo/project/api/hely_list.php")
      .then(res => res.json())
      .then(data => setHelyek(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2) HOZZÁADÁS / MÓDOSÍTÁS
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.az === null) {
      // CREATE
      fetch("http://localhost/Helykezelo/project/api/hely_add.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telepules: form.telepules,
          utca: form.utca
        })
      })
      .then(() => loadData());
    } else {
      // UPDATE
      fetch("http://localhost/Helykezelo/project/api/hely_update.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          az: form.az,
          telepules: form.telepules,
          utca: form.utca
        })
      })
      .then(() => loadData());
    }

    setForm({ az: null, telepules: "", utca: "" });
  };

  // 3) SZERKESZTÉS
const editHely = (h) => {
  setForm({
    az: h.az,
    telepules: h.telepules,
    utca: h.utca
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};


  // 4) TÖRLÉS
const deleteHely = async (az) => {

  // megerősítés
  if (!window.confirm("Biztosan törölni szeretnéd ezt a helyet?")) {
    return;
  }

  await fetch("http://localhost/Helykezelo/project/api/hely_delete.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ az })
  });

  loadHelyek();
};

  return (
  <div style={{
    maxWidth: "900px",
    margin: "40px auto",
    fontFamily: "Arial",
    padding: "20px"
  }}>
    
    <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
      React CRUD – Helyek
    </h1>

    {/* FORM KÁRTYA */}
    <div style={{
      background: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginBottom: "30px"
    }}>
      <h2 style={{ marginTop: 0 }}>
        {form.az === null ? "Új hely hozzáadása" : "Hely módosítása"}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Település"
          value={form.telepules}
          onChange={(e) => setForm({ ...form, telepules: e.target.value })}
          required
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="text"
          placeholder="Utca"
          value={form.utca}
          onChange={(e) => setForm({ ...form, utca: e.target.value })}
          required
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {form.az === null ? "Hozzáadás" : "Mentés"}
        </button>
      </form>
    </div>

    {/* TÁBLÁZAT */}
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      background: "white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <thead>
        <tr style={{ background: "#007bff", color: "white" }}>
          <th style={{ padding: "10px" }}>Az</th>
          <th style={{ padding: "10px" }}>Település</th>
          <th style={{ padding: "10px" }}>Utca</th>
          <th style={{ padding: "10px" }}>Műveletek</th>
        </tr>
      </thead>

      <tbody>
        {helyek.map(h => (
          <tr key={h.az} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px" }}>{h.az}</td>
            <td style={{ padding: "10px" }}>{h.telepules}</td>
            <td style={{ padding: "10px" }}>{h.utca}</td>
            <td style={{ padding: "10px" }}>
              <button
                onClick={() => editHely(h)}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  background: "#ffc107",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Szerkesztés
              </button>

              <button
                onClick={() => deleteHely(h.az)}
                style={{
                  padding: "6px 12px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
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
