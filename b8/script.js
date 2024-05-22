let employees = JSON.parse(localStorage.getItem("employees")) || [
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 25,
    gender: "male",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    age: 30,
    gender: "female",
  },
  {
    id: 3,
    name: "Lê Hoàng Cước",
    age: 40,
    gender: "male",
  },
  {
    id: 4,
    name: "Phạm Thị Dịu",
    age: 22,
    gender: "female",
  },
  {
    id: 5,
    name: "Võ Thành An",
    age: 28,
    gender: "male",
  },
  {
    id: 6,
    name: "Đỗ Thị Diệu",
    age: 35,
    gender: "female",
  },
  {
    id: 7,
    name: "Nguyễn Văn Thành",
    age: 50,
    gender: "male",
  },
  {
    id: 8,
    name: "Hoàng Thị Hải",
    age: 27,
    gender: "female",
  },
  {
    id: 9,
    name: "Nguyễn Thành Nam",
    age: 33,
    gender: "male",
  },
  {
    id: 10,
    name: "Nguyễn Văn Kiên",
    age: 26,
    gender: "male",
  },
  {
    id: 11,
    name: "Nguyễn Ngọc Bách",
    age: 17,
    gender: "male",
  },
  {
    id: 12,
    name: "Nguyễn Thu Hiền",
    age: 19,
    gender: "female",
  },
];
localStorage.setItem("employees", JSON.stringify(employees));
console.log(employees)

function generateTable() {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let empList = document.querySelector('.empList');
    empList.innerHTML = '';

    for (let i = 0; i < employees.length; i++) {
        let row = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.textContent = employees[i].id;
        row.appendChild(idCell);

        let nameCell = document.createElement('td');
        nameCell.textContent = employees[i].name;
        row.appendChild(nameCell);

        let ageCell = document.createElement('td');
        ageCell.textContent = employees[i].age;
        row.appendChild(ageCell);

        let genderCell = document.createElement('td');
        genderCell.textContent = employees[i].gender;
        row.appendChild(genderCell);

        let actionCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteEmployee(employees[i].id);
        }
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        empList.appendChild(row);
    }
    console.log(employees);
}


function saveEmployee() {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let id = document.getElementById('empID').value;
    let name = document.getElementById('empName').value;
    let age = document.getElementById('empAge').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    let newEmployee = {
        id: id,
        name: name,
        age: age,
        gender: gender
    };

    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));
    generateTable();
}

function updateEmployee() {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let id = document.getElementById('empID').value;
    let name = document.getElementById('empName').value;
    let age = document.getElementById('empAge').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == id) {
            employees[i].name = name;
            employees[i].age = age;
            employees[i].gender = gender;
            break;
        }
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    generateTable();
}

function sortByName() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.sort((a, b) => {
      let lastNameA = a.name.split(" ").pop();
      let lastNameB = b.name.split(" ").pop();
      return lastNameA.localeCompare(lastNameB);
  });
  localStorage.setItem("employees", JSON.stringify(employees));
  generateTable();
}


function sortByAge() {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.sort((a, b) => a.age - b.age);
    localStorage.setItem("employees", JSON.stringify(employees));
    generateTable();
}

function deleteEmployee(id) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees = employees.filter(employee => employee.id != id);
    localStorage.setItem("employees", JSON.stringify(employees));
    generateTable();
}
