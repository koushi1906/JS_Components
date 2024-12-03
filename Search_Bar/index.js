document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const listContainer = document.getElementById("search-list");
  let fragment = document.createDocumentFragment();
  let errorText = document.getElementById("no-results-message");

  let apiResponse = [
    { id: 1, title: "Apple" },
    { id: 2, title: "Banana" },
    { id: 3, title: "Cherry" },
    { id: 4, title: "Mango" },
    { id: 5, title: "Watermelon" },
    { id: 6, title: "Orange" },
    { id: 7, title: "Strawberry" },
    { id: 8, title: "Blueberry" },
    { id: 9, title: "Guava" },
    { id: 10, title: "Lychee" },
    { id: 11, title: "Pineapple" },
  ];

  const handleInput = (input) => {
    errorText.classList.add("hide");
    let query = input.trim().toLowerCase();
    if (query === "") {
      errorText.classList.add("hide");
      return renderListItems([]);
    }
    let filteredList = apiResponse.filter((item) => {
      return item["title"].toLowerCase().indexOf(query) !== -1;
    });
    renderListItems(filteredList.slice(0, 5));
  };

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }

  const debouncedFn = debounce(handleInput, 1000);

  function renderListItems(items) {
    let children = listContainer.children;
    while (children.length) {
      listContainer.removeChild(children[0]);
    }
    if (!items.length) errorText.classList.remove("hide");
    items.forEach((item) => {
      let itemContainer = document.createElement("li");
      itemContainer.className = "list-item";
      itemContainer.innerText = item["title"];
      itemContainer.tabIndex = 0;

      fragment.append(itemContainer);
    });
    listContainer.append(fragment);
  }

  form.addEventListener("input", (e) => {
    debouncedFn(e.target.value);
  });

  listContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("list-item")) {
      let input = e.target.innerText;
      form.querySelector("#search-input").value = input;
      handleInput(input);
    }
  });
});
