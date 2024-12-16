const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".main__btn");
const incompleteTaskHolder = document.getElementById("incomplete-task");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.className = "item";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "input";

  const label = document.createElement("label");
  label.className = "task";
  label.innerText = taskString;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "input";

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn delete";
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "assets/remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value.trim()) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");

  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

Array.from(incompleteTaskHolder.children).forEach((task) =>
  bindTaskEvents(task, taskCompleted)
);
Array.from(completedTasksHolder.children).forEach((task) =>
  bindTaskEvents(task, taskIncomplete)
);
