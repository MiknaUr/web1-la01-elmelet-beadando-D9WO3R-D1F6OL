let helyek = [];
let editingId = null;
let nextId = 1;

// LISTA MEGJELENÍTÉSE
function renderTable() {
    const tbody = document.querySelector("#helyTable tbody");
    tbody.innerHTML = "";

    helyek.forEach(h => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${h.az}</td>
            <td>${h.telepules}</td>
            <td>${h.utca}</td>
            <td>
                <button class="btn-edit" onclick="editHely(${h.az})">Szerkesztés</button>
                <button class="btn-delete" onclick="deleteHely(${h.az})">Törlés</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// HOZZÁADÁS / MÓDOSÍTÁS
document.getElementById("saveBtn").onclick = () => {
    const telepules = document.getElementById("telepules").value;
    const utca = document.getElementById("utca").value;

    if (!telepules || !utca) {
        alert("Minden mező kötelező!");
        return;
    }

    if (editingId === null) {
        // CREATE
        helyek.push({
            az: nextId++,
            telepules,
            utca
        });
    } else {
        // UPDATE
        const h = helyek.find(x => x.az === editingId);
        h.telepules = telepules;
        h.utca = utca;
        editingId = null;
        document.getElementById("saveBtn").innerText = "Hozzáadás";
        document.getElementById("form-title").innerText = "Új hely hozzáadása";
    }

    document.getElementById("telepules").value = "";
    document.getElementById("utca").value = "";

    renderTable();
};

// SZERKESZTÉS
function editHely(az) {
    const h = helyek.find(x => x.az === az);
    editingId = az;

    document.getElementById("telepules").value = h.telepules;
    document.getElementById("utca").value = h.utca;

    document.getElementById("saveBtn").innerText = "Mentés";
    document.getElementById("form-title").innerText = "Hely módosítása";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// TÖRLÉS
function deleteHely(az) {
    if (!confirm("Biztos törlöd?")) return;

    helyek = helyek.filter(h => h.az !== az);
    renderTable();
}

// Indítás
renderTable();
