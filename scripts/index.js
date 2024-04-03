class activity {
    constructor(title, description, url, id) {
      this.title = title;
      this.description = description;
      this.url = url;
      this.id = id;
    }
  }
  class repository_activity {
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
    get_activity(id) {
      const activity = this.activities.find((activity) => activity.id === id);
      return activity ? activity : false;
    }
    delete_activity(id) {
      const index = this.activities.findIndex((activity) => activity.id == id);
      if (index !== -1) {
        this.activities.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
let repository = new repository_activity();

function passHtml(newactivity) {
  const { title, description, url, id } = newactivity;
  const card = document.createElement("div");

  card.dataset.key = id;
  card.id = "item";
  card.classList.add("item-skills", `item-activitys-added`, "skill-on-filter");
  const titleElement = document.createElement("h3");
  titleElement.innerHTML = title;
  //title.id="activity-h1";
  const descriptionElement = document.createElement("p");
  //descriptionElement.classList.add("activity-p");
  descriptionElement.innerHTML = description;
  const imageElement = document.createElement("img");
  //imageElement.id ="activity-img";
  imageElement.src = url;

  card.appendChild(titleElement);
  card.appendChild(imageElement);
  card.appendChild(descriptionElement);
  return card;
}

function allInstanceHTML(repository) {
  const content = document.getElementById("contain-activitys-added");
  content.innerHTML = "";
  const listActivitys = repository.getAllActivities();
  const htmlElements = listActivitys.map((activit) => {
    const { title, description, url, id } = activit;

    const instActivity = new activity(title, description, url, id);
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

  function esURL(url) {
    // Expresión regular para verificar una URL
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  }

  if (!esURL(imgUrlInput)) {
    alert("La URL no válida");
    return;
  }
  const newActivity = new activity(titleInput, descriptionInput, imgUrlInput);
  repository.createActivity(newActivity);
  document.getElementById("form").reset();
  allInstanceHTML(repository);
}

const addButton = document.getElementById("button-create");
addButton.addEventListener("click", handler);

function handlerDelete(event) {
  const id = event.target.dataset.key;
  repository.delete_activity(id);
  allInstanceHTML(repository);
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
