//! резервные функции
// Функция сетевого запроса данных
// async function sendRequest(method, url, query = null, token) {
//     const headers = {
//         "Content-Type": "application/json",
//         "Authorization" : "Bearer " + token
//     };
//     const response = await fetch(url, {
//         method: method,
//         body: JSON.stringify({ query }),
//         headers: headers,
//     });
//     if (response.ok) {
//         return response.json();
//     }
//     const error = await response.json();
//     const e = new Error("Ошибка запроса");
//     e.data = error;
//     throw e;
// }

//! селекторы
const form = document.forms.searchForm;
const requestBtn = form.elements.searchBtn;
const searchInput = form.elements.searchInput;
//карусель
const divItem = document.querySelector(".carousel-item");
// добавление класса active при пагинации
const pagination = document.querySelector(".pagination");
const items = document.querySelectorAll(".page-link");
// добавление класса active при поиске
const navList = document.querySelector(".nav-list");
const navLiItems = document.querySelectorAll(".nav__item");

const url = "http://peoplein.ap-northeast-2.elasticbeanstalk.com/graphql";

//====================================
// Загрузка DOM(запрос аутентификации, силизация блока карточек, прокрутка браузера)
document.addEventListener("DOMContentLoaded", function (e) {
  getToken();
  setTimeout(() => {
    document.querySelector(".section-content__container").style.cssText = `
    opacity: 1;
    `;
  }, 1000);
  //   setScrollTo();
});

//====================================
// переменные с запросами
const searchApplicants = `query {
  searchApplicantsByKeyword(pageNumber: 0, pageCount: 4, sortBy: "id", keyword: "java") {
    currentPage
    totalPages
    content {
      id
      firstName
      lastName
      country
      gender
      visa
      dateOfBirth
      degree
      yearsOfExperience
      resumeGoogleDrivePath
      languages {
        languageName
      }
      skills {
        skillName
        skillType
      }
      experience {
        id
        company
        startOfWork
        endOfWork
        details
        yearsWorked
      }
      certificates {
        id
        certificateName
        acquisitionDate
        expiryDate
      }
    }
  }
}`;

// Общая функция запросов и регистрации событий
function getToken(login = "admin", password = "admin") {
  //Запрос на аутентификацию
  const query = `mutation {
    login(username:"${login}", password: "${password}"){
      id
      username
      token
    }
  }`;
  //запрос всех апликантов
  const getApplicants = `query {
    getAllApplicants {
      id
      firstName
      lastName
      country
      gender
      visa
      dateOfBirth
      degree
      yearsOfExperience
      resumeGoogleDrivePath
      languages {
        languageName
      }
      skills {
        skillName
        skillType
      }
      experience {
        id
        company
        startOfWork
        endOfWork
        details
        yearsWorked
      }
      certificates {
        id
        certificateName
        acquisitionDate
        expiryDate
      }
    }
  }
`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((response) => response.json())
    .then((data) => {
      return Object.entries(data);
    })
    .then((data) => data[0][1])
    .then((data) => data.login.token)
    .then((data) => {
      // функция сетевого запроса на аутентификацию
      async function getDataRequest(method, url, query = null, token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify({ query }),
          headers: headers,
        });
      }
      getDataRequest("POST", url, query, data);

      //  функция запроса всех апликантов
      async function sendRequest(method, url, query = null, token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify({ query }),
          headers: headers,
        });
        if (response.ok) {
          return response.json();
        }
        const error = await response.json();
        const e = new Error("Ошибка запроса");
        e.data = error;
        throw e;
      }
      // запрос всех доступных апликантов
      sendRequest("POST", url, getApplicants, data)
        .then((data) => data.data.getAllApplicants)
        .then((res) => {
          let personFirstGroup = res.splice(0, 4);
          createCarouselItem("active");
          personFirstGroup.forEach((elem) => {
            printData(elem);
          });
          console.log(personFirstGroup);
          return res;
        })
        .then((res) => {
          let personSecondGroup = res.splice(0, 4);
          createCarouselItem();
          personSecondGroup.forEach((elem) => {
            printData(elem);
          });
          return res;
        })
        // 3 страница слайдера
        // .then((res) => {
        //   let personThirdGroup = res.splice(0, 4);
        //   createCarouselItem();
        //   personThirdGroup.forEach((elem) => {
        //     printData(elem);
        //   });
        //   return res;
        // })
        .then((res) => console.log(res));

      //? регистрация событий
      // поиск апликанта по ключевому слову
      requestBtn.addEventListener("click", function (e) {
        sendRequest("POST", url, searchApplicants, data).then((data) =>
          console.log(data)
        );
      });
    });
}
// Общие события

// очистить форму поиска при клике и добавить ховер ссылкам ссверху
searchInput.addEventListener("click", function (event) {
  searchInput.value = " ";
  Array.from(navLiItems).forEach((item) => {
    item.classList.remove("active");
  });
  navLiItems[1].classList.add("active");
});

// дилегирование класса active при пагинации
pagination.addEventListener("click", function (event) {
  let li = event.target; // (1)
  if (!li) return;

  Array.from(items).forEach((item) => {
    item.classList.remove("active");
  });
  li.classList.add("active");
});

//
const favoritesBtn = document.getElementsByClassName("card__favorites");
console.log(favoritesBtn);

const cardSection = document.getElementsByClassName(".card-section");
console.log(cardSection);
// favoritesBtn[0].addEventListener("click", function (event) {
//   event.preventDefault();
//   console.log(cardSection);
// });

// создание слайда
function createCarouselItem(active = " ") {
  const divInner = document.querySelector(".carousel-inner");
  const divItem = document.createElement("div");
  divItem.className = `carousel-item ${active}`;
  const divContainer = document.createElement("div");
  divContainer.className = "carousel-container";
  divInner.append(divItem);
  divItem.append(divContainer);
}
// создание карты апликанта
function printData({
  certificates,
  country,
  dateOfBirth,
  degree,
  experience,
  firstName,
  gender,
  id,
  languages = {},
  lastName,
  resumeGoogleDrivePath,
  skills = {},
  visa,
  yearsOfExperience,
}) {
  const divCard = document.createElement("div");
  divCard.className = "section-card card-section";
  divCard.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="section-card__header">
      <picture><source srcset="img/cardImage.svg" type="image/webp"><img src="img/cardImage.svg" alt=""class="card__img" /></picture>
    <div class="section-card__info">
    <ul>
      <li><span>Nationality:</span></li>
      <li><span class="card__nationality">${country}</span></li>
      <li><span>Visa:</span></li>
      <li><span class="card__visa">${visa}</span></li>
      <li><span>Age:</span></li>
      <li><span class="card__age">${_calculateAge(dateOfBirth)}</span></li>
    </ul>
    </div>
    </div>
    <div class="section-card__body">
    <h3>${lastName}</h3>
    <p>${skills[0].skillType}</p>
    <ul>
    <li><span>Experence</span></li>
        <li><a class="tooltip" href="#">Programming languages<span class="custom info"><img src="img/icons/Info.png" alt="Информация" height="48" width="48" /><em>${getSkills(
          skills
        )}</em></span></a></li>
        <li><button type="button" class="card__favorites">+ Add to Favorites</button></li>
        <li><button type="button" class="card__interview">+ Invite for Interview</button></li>
    </ul>
    </div>
`
  );
  const divContainer = document.querySelectorAll(".carousel-container");
  for (let i = 0; i < divContainer.length; i++) {
    divContainer[i].append(divCard);
  }

  // получаем языки программирования
  getSkills(skills);
  function getSkills(arr) {
    let skillName = [];
    for (let i = 0; i < arr.length; i++) {
      skillName.push(arr[i].skillName);
    }
    return skillName;
  }
}

// расчет полного возраста
function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - new Date(birthday);
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
// прокрутка браузера
function setScrollTo() {
  window.scrollTo({
    top: 700,
    left: 0,
    behavior: "smooth",
  });
}
