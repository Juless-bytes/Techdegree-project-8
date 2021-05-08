  
// global variables

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const searchBar = document.getElementById('search');

// use fetch to gather data from API

fetch(urlAPI)
  .then(response => response.json())
  .then(response => response.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

function displayEmployees (employeeData) {
  employees = employeeData;

  // store employee html
  let employeeHTML = '';

  // loop through each employee and create HTML markup for them
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="card" data-index="${index}">
        <img src="${picture.large}" class="avatar">
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `
  })

  gridContainer.innerHTML = employeeHTML;
}

// create a function that displays the modal
function  displayModal (index) {
  let { name, dob, phone, email, location, picture } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img src="${picture.large}" class="avatar">
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${location.city}</p>
      <div class="horizontal-line"></div>
      <p class="phone">${phone}</p>
      <p class="address2">${location.street.number} ${location.street.name}, ${location.state} ${location.postcode}</p>
      <p class="dob">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      <button id="left-arrow" class="arrow" onclick='prevModal(${index})'>&#8249;</button>
      <button id="right-arrow" class="arrow" onclick='nextModal(${index})'>&#8250;</button>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// toggle modal
gridContainer.addEventListener('click', e => {
  if (e.target !== gridContainer) {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

// close modal
modalClose.addEventListener('click', e => {
  overlay.classList.add("hidden");
});

// left/right arrow navigation for modals

function prevModal(index) {
  let prevIndex = index -= 1;
  if (prevIndex > -1) {
    displayModal(prevIndex);
  } else {
    displayModal(11);
  }
}

function nextModal(index) {
  let nextIndex = index += 1;
  if (nextIndex < 12) {
    displayModal(nextIndex);
  } else {
    displayModal(0);
  }
}


// search bar
function searchFunction () {
  const toLower = searchBar.value.toLowerCase();
  const names = document.getElementsByClassName('card');
  let name;
  let textValue;

  for (let i = 0; i < names.length; i++) {
    name = names[i].getElementsByClassName('name')[0];
    textValue = name.textContent;
    if (textValue.toLowerCase().indexOf(toLower) > -1) {
      names[i].style.display = "";
    } else {
      names[i].style.display = "none";
    }
  }
}

searchBar.addEventListener('keyup', searchFunction);