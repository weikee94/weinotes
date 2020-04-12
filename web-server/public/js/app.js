console.log("loading client js");

fetch("http://localhost:3000/weather?address=!").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#message-one");
const msgTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  msgOne.textContent = "Loading ...";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOne.textContent = data.error;
        } else {
          msgOne.textContent = data.location;
          msgTwo.textContent = data.forecast;
        }
      });
    }
  );
});
