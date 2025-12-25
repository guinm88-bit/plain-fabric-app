function addRow() {
  const table = document.getElementById("designTable");
  const row = table.insertRow();

  row.innerHTML = `
    <td><input placeholder="Colour"></td>
    <td><input type="number" placeholder="cm"></td>
    <td><input type="number" placeholder="meters"></td>
    <td><input type="number" value="5"></td>
    <td class="result"></td>
  `;
}

function calculate() {
  const fabricLength = Number(document.getElementById("fabricLength").value);
  const epi = Number(document.getElementById("epi").value);
  const rows = document.querySelectorAll("#designTable tr");

  rows.forEach((row, index) => {
    if (index === 0) return;

    const widthCm = Number(row.cells[1].children[0].value);
    const hankLength = Number(row.cells[2].children[0].value);
    const wastage = Number(row.cells[3].children[0].value);

    if (!widthCm || !hankLength) return;

    const widthInch = widthCm / 2.54;
    const ends = widthInch * epi;
    const totalYarnLength = ends * fabricLength;
    let hanks = totalYarnLength / hankLength;

    hanks = hanks * (1 + wastage / 100);
    hanks = Math.ceil(hanks);

    row.cells[4].innerText = hanks;
  });
}

function calculateCosting() {
  const dyeRate = Number(document.getElementById("dyeRate").value);
  const weaveRate = Number(document.getElementById("weaveRate").value);
  const washRate = Number(document.getElementById("washRate").value);

  const fabricLength = Number(document.getElementById("fabricLength").value);
  const rows = document.querySelectorAll("#designTable tr");

  let totalHanks = 0;

  rows.forEach((row, index) => {
    if (index === 0) return;
    const hanksCell = row.cells[4].innerText;
    if (hanksCell) {
      totalHanks += Number(hanksCell);
    }
  });

  const dyeCost = totalHanks * dyeRate;
  const weaveCost = fabricLength * weaveRate;
  const washCost = fabricLength * washRate;

  const totalCost = dyeCost + weaveCost + washCost;

  document.getElementById("costResult").innerHTML = `
    Dyeing Cost: ₹${dyeCost.toFixed(2)} <br>
    Weaving Cost: ₹${weaveCost.toFixed(2)} <br>
    Washing Cost: ₹${washCost.toFixed(2)} <br><br>
    <strong>Total Fabric Cost: ₹${totalCost.toFixed(2)}</strong>
  `;
}

