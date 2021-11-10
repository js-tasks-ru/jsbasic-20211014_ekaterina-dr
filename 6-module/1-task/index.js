/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');
    this.createTable();
  }

  createTable() {
    let thead = document.createElement('thead');
    thead.innerHTML = ` <tr>
    <th>name</th>
    <th>age</th>
    <th>salary</th>
    <th>city</th>
    <th></th>
    </tr>`;

    this.elem.appendChild(thead);

    let tbody = document.createElement('tbody');

    this.rows.forEach(row => {
      let tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.name}</td>
     <td>${row.age}</td>  
     <td>${row.salary}</td>
     <td>${row.city}</td>`;

      let td = document.createElement('td');
      let button = document.createElement('button');
      button.onclick = this.onclick;
      button.innerHTML = 'X';

      td.appendChild(button);
      tr.appendChild(td);
      tbody.appendChild(tr);
    })

    this.elem.appendChild(tbody);
  }

  onclick(event) {
    event.target.closest('tr').remove();
  }

}