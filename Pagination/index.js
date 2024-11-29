document.addEventListener("DOMContentLoaded", () => {
  let apiRecords = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
    { id: 4, title: "Item 4" },
    { id: 5, title: "Item 5" },
    { id: 6, title: "Item 6" },
    { id: 7, title: "Item 7" },
    { id: 8, title: "Item 8" },
    { id: 9, title: "Item 9" },
    { id: 10, title: "Item 10" },
    { id: 11, title: "Item 11" },
    { id: 12, title: "Item 12" },
    { id: 13, title: "Item 13" },
    { id: 14, title: "Item 14" },
    { id: 15, title: "Item 15" },
    { id: 16, title: "Item 16" },
    { id: 17, title: "Item 17" },
    { id: 18, title: "Item 18" },
    { id: 19, title: "Item 19" },
    { id: 20, title: "Item 20" },
    { id: 21, title: "Item 21" },
  ];
  let fragment = document.createDocumentFragment();
  let currentPage = 1;
  let itemsPerPage = 5;
  let buttonsContainer = document.getElementById("actions");
  let maxPages = Math.ceil(apiRecords.length / itemsPerPage);
  let prevButton = document.createElement("button");
  let nextButton = document.createElement("button");
  let pageInfo = document.getElementById("page-info");

  function renderRecords(records) {
    let container = document.getElementById("items");
    clearRecords(container);

    for (let i = 0; i < records.length; i++) {
      let item = document.createElement("li");
      item.className = "item";
      item.innerText = records[i].title;
      fragment.append(item);
    }
    container.append(fragment);
    pageInfo.innerText = `you are on page ${currentPage} of ${maxPages}`;
  }

  function renderButtons(count) {
    prevButton.innerText = "Previous";
    prevButton.id = "prev-btn";
    prevButton.setAttribute("aria-role", "button");
    disableButton(prevButton);
    fragment.append(prevButton);

    for (let i = 0; i < count; i++) {
      let pageButton = document.createElement("button");
      pageButton.setAttribute("aria-role", "button");
      pageButton.setAttribute("data-page", i + 1);
      pageButton.innerText = i + 1;

      fragment.append(pageButton);
    }

    nextButton.id = "next-btn";
    nextButton.innerText = "Next";
    nextButton.setAttribute("aria-role", "button");
    nextButton.setAttribute("aria-label", "Go To Next Page");
    fragment.append(nextButton);
    buttonsContainer.append(fragment);
  }

  function clearRecords(parentContainer) {
    let children = parentContainer.children;
    while (children.length) {
      parentContainer.removeChild(children[0]);
    }
  }

  function enableButton(btn) {
    btn.disabled = false;
  }

  function disableButton(btn) {
    btn.disabled = true;
  }

  renderRecords(
    apiRecords.slice(
      itemsPerPage * (currentPage - 1),
      itemsPerPage * currentPage
    )
  );
  renderButtons(maxPages);
  buttonsContainer.addEventListener("click", (e) => {
    if (e.target.id === "prev-btn") {
      currentPage = currentPage > 1 ? currentPage - 1 : 1;
    } else if (e.target.id === "next-btn") {
      currentPage = currentPage < maxPages ? currentPage + 1 : maxPages;
    } else if (e.target.dataset.page) {
      currentPage = parseInt(e.target.dataset.page);
    }
    renderRecords(
      apiRecords.slice(
        itemsPerPage * (currentPage - 1),
        itemsPerPage * currentPage
      )
    );
    currentPage === 1 ? disableButton(prevButton) : enableButton(prevButton);
    currentPage === maxPages
      ? disableButton(nextButton)
      : enableButton(nextButton);
  });
});
