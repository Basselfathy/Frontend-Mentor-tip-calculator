// Selecting elements
const elements = {
	billInput: document.getElementById("bill"),
	tipButtons: document.querySelectorAll(".tip-buttons button"),
	customTipInput: document.getElementById("custom-tip"),
	peopleInput: document.getElementById("people"),
	tipAmountDisplay: document.getElementById("tip-amount"),
	totalAmountDisplay: document.getElementById("total-amount"),
	billErrorMessage: document.getElementById("error-bill"),
	peopleErrorMessage: document.getElementById("error-people"),
	resetButton: document.getElementById("reset"),
};

let tipPercent = 0;

// Function: Show or hide error messages
function toggleError(element, messageElement, condition) {
	if (condition) {
		messageElement.style.display = "block";
		element.style.outlineColor = "tomato";
	} else {
		messageElement.style.display = "none";
		element.style.outlineColor = "";
	}
}

// Function: Calculate and update outputs
function calculateTip() {
	const bill = parseFloat(elements.billInput.value);
	const people = parseInt(elements.peopleInput.value) || 0; // Default to 0 if empty

	// Validation: Bill input
	toggleError(
		elements.billInput,
		elements.billErrorMessage,
		bill <= 0 || isNaN(bill)
	);

	// Validation: People input
	// Ensure `people` is treated as valid if it is at least 1
	toggleError(elements.peopleInput, elements.peopleErrorMessage, people < 1);

	if (bill <= 0 || isNaN(bill) || people < 1) return;

	// Calculate tip and total amounts
	const tipAmount = (bill * (tipPercent / 100)) / people;
	const totalAmount = (bill + tipAmount * people) / people;

	// Update UI
	elements.tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
	elements.totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

// Event listeners for tip buttons
elements.tipButtons.forEach((button) =>
	button.addEventListener("click", (e) => {
		tipPercent = parseInt(e.target.getAttribute("data-tip"));
		elements.customTipInput.value = ""; // Clear custom tip input
		calculateTip();
	})
);

// Event listener for custom tip input
elements.customTipInput.addEventListener("input", () => {
	tipPercent = parseFloat(elements.customTipInput.value) || 0;
	calculateTip();
});

// Event listeners for bill and people inputs
[elements.billInput, elements.peopleInput].forEach((input) =>
	input.addEventListener("input", calculateTip)
);

// Reset button functionality
elements.resetButton.addEventListener("click", () => {
	Object.values(elements).forEach((el) => {
		if (el.tagName === "INPUT") el.value = "";
	});
	tipPercent = 0;
	elements.tipAmountDisplay.textContent = "$0.00";
	elements.totalAmountDisplay.textContent = "$0.00";
	elements.billErrorMessage.style.display = "none";
	elements.peopleErrorMessage.style.display = "none";
});
