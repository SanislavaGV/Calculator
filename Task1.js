document.addEventListener('DOMContentLoaded', (event) => {
    const bitCheckboxesContainer = document.getElementById('bit-checkboxes');
    const checkboxArray = [];

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const checkboxRow = document.createElement('tr');
    const labelRow = document.createElement('tr');

    tbody.appendChild(checkboxRow);
    tbody.appendChild(labelRow);
    table.appendChild(tbody);
    bitCheckboxesContainer.appendChild(table);

    const rightInput = document.querySelector('input[type="radio"][value="right"]');
    const leftInput = document.querySelector('input[type="radio"][value="left"]');

    function createCheckboxes(start, end, step) {
        checkboxRow.innerHTML = '';  // Clear previous checkboxes
        labelRow.innerHTML = '';     // Clear previous labels

        for (let i = start; i !== end; i += step) {
            const checkboxCell = document.createElement('td');
            const labelCell = document.createElement('td');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `bit-${i}`;

            const label = document.createElement('label');
            label.textContent = i;
            label.setAttribute('for', `bit-${i}`);

            checkboxCell.appendChild(checkbox);
            labelCell.appendChild(label);
            checkboxRow.appendChild(checkboxCell);
            labelRow.appendChild(labelCell);

            checkboxArray.push(checkbox);
        }
    }

    // Initial checkbox creation
    createCheckboxes(31, -1, -1);

    function reverseRowContents() {
        const labelCells = Array.from(labelRow.children);
        const checkboxCells = Array.from(checkboxRow.children);

        labelCells.reverse().forEach(cell => labelRow.appendChild(cell));
        checkboxCells.reverse().forEach(cell => checkboxRow.appendChild(cell));
    }

    rightInput.addEventListener('change', (event) => {
        if (event.target.checked) {
            reverseRowContents();
        }
    });

    leftInput.addEventListener('change', (event) => {
        if (event.target.checked) {
            reverseRowContents();
        }
    });
});

// Calculation of result
document.getElementById('calculate').addEventListener('click', function () {
    const alignment = document.querySelector('input[name="alignment"]:checked');
    const bitValues = [];

    for (let i = 0; i < 32; i++) {
        const checkbox = document.getElementById(`bit-${i}`);
        bitValues.push(checkbox.checked ? 1 : 0);
    }

    if (alignment.value === 'left') {
        bitValues.reverse();
    }

    let resultValue = 0n;
    for (let i = 0; i < bitValues.length; i++) {
        if (bitValues[i] === 1) {
            resultValue += 1n << BigInt(i);
        }
    }

    const binaryValue = bitValues.reverse().join('');
    const hexValue = resultValue.toString(16);
    const octalValue = resultValue.toString(8);

    document.getElementById('result-value-decimal').textContent = `Decimal: ${resultValue}`;
    document.getElementById('result-value-binary').textContent = `Binary: ${binaryValue}`;
    document.getElementById('result-value-hex').textContent = `Hexadecimal: ${hexValue}`;
    document.getElementById('result-value-octal').textContent = `Octal: ${octalValue}`;
});
