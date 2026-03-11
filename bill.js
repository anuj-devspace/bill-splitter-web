function formatAmount(value) {
  if (!isFinite(value)) return "0.00";
  return value.toFixed(2);
}

function calculateSplit() {
  const billInput = document.getElementById("bill-amount");
  const peopleInput = document.getElementById("people-count");
  const customTipInput = document.getElementById("custom-tip");
  const perPersonEl = document.getElementById("per-person-total");
  const totalWithTipEl = document.getElementById("total-with-tip");
  const summaryLine = document.getElementById("summary-line");

  const activeChip = document.querySelector(".chip--active");
  const chipTip = activeChip ? Number(activeChip.dataset.tip) : 0;

  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);
  const customTip = customTipInput.value !== "" ? Number(customTipInput.value) : null;

  const tipPercent = customTip !== null && customTip >= 0 ? customTip : chipTip;

  if (!bill || bill <= 0 || !people || people <= 0) {
    perPersonEl.textContent = "0.00";
    totalWithTipEl.textContent = "0.00";
    summaryLine.textContent = "Enter a valid bill amount and number of people.";
    return;
  }

  const tipAmount = (bill * tipPercent) / 100;
  const totalWithTip = bill + tipAmount;
  const perPerson = totalWithTip / people;

  perPersonEl.textContent = formatAmount(perPerson);
  totalWithTipEl.textContent = formatAmount(totalWithTip);

  const tipText = tipPercent > 0 ? `${tipPercent}% tip` : "no tip";
  summaryLine.textContent = `₹${formatAmount(bill)} split between ${people} ${
    people === 1 ? "person" : "people"
  } with ${tipText}.`;
}

function resetForm() {
  const billInput = document.getElementById("bill-amount");
  const peopleInput = document.getElementById("people-count");
  const customTipInput = document.getElementById("custom-tip");
  const perPersonEl = document.getElementById("per-person-total");
  const totalWithTipEl = document.getElementById("total-with-tip");
  const summaryLine = document.getElementById("summary-line");
  const chips = document.querySelectorAll(".chip");

  billInput.value = "";
  peopleInput.value = "2";
  customTipInput.value = "";

  chips.forEach((chip) => chip.classList.remove("chip--active"));
  const tenPercentChip = document.querySelector('.chip[data-tip="10"]');
  if (tenPercentChip) tenPercentChip.classList.add("chip--active");

  perPersonEl.textContent = "0.00";
  totalWithTipEl.textContent = "0.00";
  summaryLine.textContent = "Enter an amount to see how it is split.";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputs = [
    document.getElementById("bill-amount"),
    document.getElementById("people-count"),
    document.getElementById("custom-tip"),
  ];
  const chips = document.querySelectorAll(".chip");
  const resetBtn = document.getElementById("reset-btn");
  const customTipInput = document.getElementById("custom-tip");

  inputs.forEach((input) => {
    if (!input) return;
    input.addEventListener("input", calculateSplit);
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");

      if (customTipInput) {
        customTipInput.value = "";
      }

      calculateSplit();
    });
  });

  if (customTipInput) {
    customTipInput.addEventListener("input", () => {
      chips.forEach((c) => c.classList.remove("chip--active"));
      calculateSplit();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetForm);
  }

  calculateSplit();
});

