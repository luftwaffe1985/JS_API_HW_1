import { training } from "./data.js";

const trainingInfo = JSON.parse(training);

const scheduleElement = document.getElementById("schedule");

trainingInfo.forEach((item) => {
  const { name, time, maxParticipants } = item;
  let { currentParticipants } = item;

  const listItem = document.createElement("div");
  listItem.classList.add("card", "mb-3");

  listItem.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">Time: ${item.time}</p>
      <p class="card-text">Max q-ty of participants: ${item.maxParticipants}</p>
      <p class="card-text" id="currentParticipants">Current q-ty of participants: ${item.currentParticipants}</p>
      <button class="btn btn-primary" id="${item.name}">Register</button>
      <button class="btn btn-danger disabled" id="cancel-${item.name}">Cancel registration</button>
    </div>`;

  scheduleElement.appendChild(listItem);

  const cancelButton = listItem.querySelector(".btn-danger");

  const signUpButton = listItem.querySelector(".btn-primary");

  setEventListeners(signUpButton, cancelButton, item.id);
  function setEventListeners(add, remove, id) {
    add.removeEventListener("click", addFunc);
    remove.removeEventListener("click", removeFunc);
    add.addEventListener("click", addFunc);
    remove.addEventListener("click", removeFunc);

    function addFunc() {
      trainingInfo.forEach((el) => {
        if (el.id === id) {
          console.log(el.id, id);
          currentParticipants++;
          listItem.querySelector(
            ".card-text:last-of-type"
          ).textContent = `Current q-ty of participants: ${currentParticipants}`;
          signUpButton.classList.add("disabled");
          signUpButton.nextElementSibling.classList.remove("disabled");
        }
        if (currentParticipants == maxParticipants) {
          signUpButton.classList.add("disabled");
        }
      });
    }
    function removeFunc() {
      trainingInfo.forEach((el) => {
        if (el.id === id && !currentParticipants == 0) {
          currentParticipants--;
          listItem.querySelector(
            ".card-text:last-of-type"
          ).textContent = `Current q-ty of participants: ${currentParticipants}`;
          cancelButton.classList.add("disabled");
          cancelButton.previousElementSibling.classList.remove("disabled");
        }
      });
    }
  }
});
