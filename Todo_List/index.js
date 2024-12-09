document.addEventListener("DOMContentLoaded", () => {
  let todoForm = document.getElementById("todo-task-form");
  let todoList = document.getElementById("todo-list");
  let todoListData = [
    { id: 1, title: "read the book", completed: false },
    { id: 2, title: "buy dog food", completed: false },
    { id: 3, title: "call my parents", completed: false },
    { id: 4, title: "clean my working place", completed: false },
    { id: 5, title: "kill Bill", completed: false },
  ];

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(todoForm);
    formDataObject = {};

    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    formDataObject["completed"] = false;
    formDataObject["id"] = todoListData.length + 1;

    todoListData.push(formDataObject);
    renderList(todoListData);

    todoForm.reset();
  });

  function renderList(listItems) {
    clearList();
    listItems.forEach((item, index) => {
      let itemContainer = document.createElement("li");
      itemContainer.className = "list-item-container";
      itemContainer.dataset.id = item["id"];

      let checkBox = document.createElement("input");
      checkBox.className = "item-checkbox";
      checkBox.type = "checkbox";
      checkBox.name = "item-status";
      checkBox.value = `item-${index}`;
      checkBox.setAttribute(
        "aria-checked",
        item["completed"] ? "true" : "false"
      );

      let itemTitle = document.createElement("p");
      itemTitle.innerText = item["title"];

      let deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.innerText = "X";
      deleteButton.setAttribute("aria-label", "deleteItem");

      itemContainer.append(checkBox);
      itemContainer.append(itemTitle);
      itemContainer.append(deleteButton);

      todoList.append(itemContainer);
    });
  }

  renderList(todoListData);

  todoList.addEventListener("click", (e) => {
    if (e.target.className === "delete-button") {
      clearList();
      let parent = e.target.parentElement;
      let id = parseInt(parent.dataset.id);

      let filteredData = todoListData.filter((item) => {
        return item.id !== id;
      });

      console.log(filteredData);

      renderList(filteredData);
    } else if (e.target.className === "item-checkbox") {
      let checked = e.target.checked;
      e.target.setAttribute("aria-checked", checked ? "true" : "false");
    }
  });

  function clearList() {
    let elements = todoList.children;

    while (elements.length) {
      todoList.removeChild(elements[0]);
    }
  }
});
