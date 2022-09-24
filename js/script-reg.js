//Запрос селекторов
const form = document.forms.regForm;
const login = form.elements.login;
const password = form.elements.password;
const button = form.elements.btn;
const errorMessage = form.querySelector(".reg-section__error span");
//graphQl
const url = "http://peoplein.ap-northeast-2.elasticbeanstalk.com/graphql";

// Перехватчик ошибок Promise
window.addEventListener("unhandledrejection", function (event) {
  // объект события имеет два специальных свойства:
  console.log(event.promise); // [object Promise] - промис, который сгенерировал ошибку
  console.log(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});

document.addEventListener("DOMContentLoaded", function () {
  // событие аутентификации
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // валидация формы
    let error = formValidate(form);
    if (error === 0) {
      getToken(login.value, password.value);
    } else {
      //   login.value = "unvalid mail";
      login.classList.add("_error");
      //   password.value = "unvalid password";
      password.classList.add("_error");
      errorMessage.style.opacity = 1;
    }
  });
  button.addEventListener("click", (e) => {});

  form.addEventListener("click", function (event) {
    if (event.target.dataset.type === "login") {
      login.value = "";
      login.placeholder = "";
      login.classList.remove("_error");
      errorMessage.style.opacity = 0;
    }
    if (event.target.dataset.type === "password") {
      password.value = "";
      password.placeholder = "";
      password.classList.remove("_error");
      errorMessage.style.opacity = 0;
    }
  });

  button.addEventListener("submit", function (e) {});

  // динамическое получение token и регистрация событий
  function getToken(login, password) {
    const query = `mutation {
      login(username:"${login}", password: "${password}"){
        id
        username
        token
      }
    }`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      //   credentials: "include",
      //   referrer: "http://localhost:4200",
      //   mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        return Object.entries(data);
      })
      .then((data) => data[0][1])
      .then((data) => data.login.token)
      .then((data) => {
        // функция сетевого запроса на идинтефикацию
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
          if (response.ok) {
            return response.json();
          }
          return response
            .json()
            .then((err) => {
              suggBox.insertAdjacentHTML(
                "afterbegin",
                `
                <div class="error">${err.message}...</div>
                `
              );
              setTimeout(() => {
                suggBox.innerHTML = "";
              }, 3000);
              const error = new Error("Ошибка запроса");
              error.data = error;
              throw error;
            })
            .catch((error) => console.log(error));
        }
        getDataRequest("POST", url, query, data);
        //переход к странице index-search.html
        window.open("index-search.html", "_self");
      });
  }

  // функции валидация формы
  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll("._req");

    for (let i = 0; i < formReq.length; i++) {
      const item = formReq[i];
      formRemoveError(item);

      if (item.classList.contains("_login")) {
        if (loginTest(item)) {
          formAddError(item);
          error++;
        }
      } else if (item.value === "") {
        formAddError(item);
        error++;
      }
    }
    return error;
  }

  function formAddError(item) {
    item.classList.add("_error");
  }
  function formRemoveError(item) {
    item.classList.remove("_error");
  }
  //валидация логина
  function loginTest(item) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(item.value);
  }
});
