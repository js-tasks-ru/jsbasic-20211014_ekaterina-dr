function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    let status = row.cells[3];

    if (status.dataset.available === 'true') {
      row.classList.add('available');
    } else if (status.dataset.available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.setAttribute('hidden', true);
    }

    row.classList.add(row.cells[2].innerHTML === 'm' ? 'male' : 'female');

    if (row.cells[1].innerHTML < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
