class activity {
  constructor(title, description, imgUrl, id) {
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.id = id;
  }
}
class repository {
  constructor() {
    this.activities = [];
    this.next_id = 0;
  }
  createActivity(activity) {
    activity.id = this.next_id++;
    this.activities.push(activity);
  }
  getAllActivities() {
    return this.activities;
  }
  getActivity(id) {
    const activity = this.activities.find((activity) => activity.id === id);
    return activity ? activity : false;
  }
  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id != id);
    return true;
}
}

let newRepo = new repository();

function passHtml(newactivity) {
  const { title, description, imgUrl, id } = newactivity;

  const card = document.createElement("div");
  card.id = "item-card";
  card.classList.add("item-skills", `item-activitys-added`, "skill-on-filter");

  const btnDelete = document.createElement("button");
  btnDelete.id = "item"
  btnDelete.dataset.key = id;
  btnDelete.classList.add("card-btn-delete")
  btnDelete.innerText ="X"

  const titleElement = document.createElement("h3");
  titleElement.classList.add("card-title");
  titleElement.innerHTML = title;

  const descriptionElement = document.createElement("p");
  descriptionElement.innerHTML = description;

  const imageElement = document.createElement("img");
  imageElement.src = imgUrl;

  card.appendChild(titleElement);
  card.appendChild(btnDelete);
  card.appendChild(imageElement);
  card.appendChild(descriptionElement);
  return card;
}

function allInstanceHTML(newRepo) {
  const content = document.getElementById("contain-activitys-added");
  content.innerHTML = "";
  const listActivitys = newRepo.getAllActivities();
  const htmlElements = listActivitys.map((activit) => {
    const { title, description, imgUrl, id } = activit;

    const instActivity = new activity(title, description, imgUrl, id);
    return passHtml(instActivity);
  });
  htmlElements.forEach((iternacion) => {
    content.appendChild(iternacion);
  });
}
function handler() {
  const titleInput = document.getElementById("input-title").value;
  const descriptionInput = document.getElementById("input-description").value;
  const imgUrlInput = document.getElementById("input-url").value;
  if (!titleInput || !descriptionInput || !imgUrlInput) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  function esURL(imgUrl) {
    // Expresión regular para verificar una URL
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(imgUrl);
  }

  if (!esURL(imgUrlInput)) {
    alert("La URL no válida");
    return;
  }
  const newActivity = new activity(titleInput, descriptionInput, imgUrlInput);
  newRepo.createActivity(newActivity);
  document.getElementById("form").reset();
  allInstanceHTML(newRepo);
}

const addButton = document.getElementById("button-create");
addButton.addEventListener("click", handler);

function handlerDelete(event) {
  const id = event.target.dataset.key;
  
  if(newRepo.deleteActivity(id)){
    allInstanceHTML(newRepo);
    return;
  }
}
/**
 * SOLO FUNCIONA PRECIONANDO EL DIV ID = ITEM
 * no pude hacer que se elimine si se preciona en cualquier elemento dentro del id.
 */
document.addEventListener("click", function (event) {
  if (event.target.id.startsWith("item")) {
    handlerDelete(event);
  }
});
module.exports = {activity, repository};