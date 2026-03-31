const programs = {
  "5A": ["Matematik", "Türkçe", "Fen", "Sosyal", "İngilizce"],
  "5B": ["Türkçe", "Matematik", "Fen", "Beden Eğitimi", "Sosyal"],
  "6A": ["Matematik", "Türkçe", "Fen", "Sosyal Bilgiler", "Din Kültürü"],
  "6B": ["Türkçe", "Sosyal Bilgiler", "Matematik", "Fen", "İngilizce"],
  "7A": ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilgiler", "Bilişim"],
  "7B": ["Matematik", "Türkçe", "Fen", "İngilizce", "Müzik"],
  "8A": ["Türkçe", "Matematik", "Fen", "T.C. İnkılap", "İngilizce"],
  "8B": ["Matematik", "Türkçe", "Fen", "Din Kültürü", "Görsel Sanatlar"]
};

const gunler = ["Pzt", "Sal", "Çar", "Per", "Cum"];
const slots = ["1", "2", "3", "4", "5"];

function renderPrograms() {
  const container = document.getElementById("programContainer");
  Object.entries(programs).forEach(([sinif, dersler]) => {
    const card = document.createElement("div");
    card.className = "program";
    card.innerHTML = `<h3>${sinif}</h3>`;

    const table = document.createElement("table");
    table.innerHTML = `<thead><tr><th>Gün</th>${slots.map(s => `<th>${s}</th>`).join("")}</tr></thead>`;

    const tbody = document.createElement("tbody");
    gunler.forEach((gun, idx) => {
      const tr = document.createElement("tr");
      const rotated = [...dersler.slice(idx), ...dersler.slice(0, idx)];
      tr.innerHTML = `<td>${gun}</td>${rotated.map(d => `<td>${d}</td>`).join("")}`;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    card.appendChild(table);
    container.appendChild(card);
  });
}

const weekdaySchedule = [
  ["1. Ders", "08:30", "09:10"],
  ["2. Ders", "09:20", "10:00"],
  ["3. Ders", "10:10", "10:50"],
  ["4. Ders", "11:00", "11:40"],
  ["Öğle Arası", "11:40", "12:30"],
  ["5. Ders", "12:30", "13:10"],
  ["6. Ders", "13:20", "14:00"],
  ["7. Ders", "14:10", "14:50"]
];

function renderWeekdayTimes() {
  const tbody = document.getElementById("weekdayTimes");
  weekdaySchedule.forEach(([ders, baslangic, bitis]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${ders}</td><td>${baslangic}</td><td>${bitis}</td>`;
    tbody.appendChild(tr);
  });
}

function renderFridayInputs() {
  const tbody = document.getElementById("fridayTimes");
  const saved = JSON.parse(localStorage.getItem("fridayTimes") || "null");
  const base = saved || weekdaySchedule.filter(([d]) => d.includes("Ders"));

  base.forEach(([ders, baslangic, bitis], i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ders}</td>
      <td><input type="time" id="start-${i}" value="${baslangic}" /></td>
      <td><input type="time" id="end-${i}" value="${bitis}" /></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("saveFriday").addEventListener("click", () => {
    const updated = base.map(([ders], i) => [
      ders,
      document.getElementById(`start-${i}`).value,
      document.getElementById(`end-${i}`).value
    ]);
    localStorage.setItem("fridayTimes", JSON.stringify(updated));
    alert("Cuma ders saatleri kaydedildi.");
  });
}

renderPrograms();
renderWeekdayTimes();
renderFridayInputs();
