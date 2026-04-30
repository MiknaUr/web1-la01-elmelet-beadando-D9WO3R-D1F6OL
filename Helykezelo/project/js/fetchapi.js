const API = "http://localhost/Helykezelo/project/api/";

let editingId = null;

// 1) LISTA BETÖLTÉSE
function loadHelyek() {
    fetch(API + "hely_list.php")
        .then(res => res.json())
        .then(data => renderTable(data));
}

function renderTable(helyek) {
    const tbody = document.querySelector("#helyTable tbody");
    tbody.innerHTML = "";

    helyek.forEach(h => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${h.az}</td>
            <td>${h.telepules}</td>
            <td>${h.utca}</td>
            <td>
                <button class="btn-edit" onclick="editHely(${h.az}, '${h.telepules}', '${h.utca}')">Szerkesztés</button>
                <button class="btn-delete" onclick="deleteHely(${h.az})">Törlés</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// 2) HOZZÁADÁS / MÓDOSÍTÁS
document.getElementById("saveBtn").onclick = () => {
    const telepules = document.getElementById("telepules").value;
    const utca = document.getElementById("utca").value;

    if (!telepules || !utca) {
        alert("Minden mező kötelező!");
        return;
    }

    const url = editingId === null ? "hely_add.php" : "hely_update.php";

    const body = editingId === null
        ? { telepules, utca }
        : { az: editingId, telepules, utca };

    fetch(API + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(() => {
        editingId = null;
        document.getElementById("form-title").innerText = "Új hely hozzáadása";
        document.getElementById("saveBtn").innerText = "Hozzáadás";
        document.getElementById("telepules").value = "";
        document.getElementById("utca").value = "";
        loadHelyek();
    });
};

// 3) SZERKESZTÉS
function editHely(az, telepules, utca) {
    editingId = az;
    document.getElementById("telepules").value = telepules;
    document.getElementById("utca").value = utca;
    document.getElementById("form-title").innerText = "Hely módosítása";
    document.getElementById("saveBtn").innerText = "Mentés";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 4) TÖRLÉS
function deleteHely(az) {
    if (!confirm("Biztos törlöd?")) return;

    fetch(API + "hely_delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ az })
    }).then(() => loadHelyek());
}

// Indítás
loadHelyek();
