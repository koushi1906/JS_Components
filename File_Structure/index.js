document.addEventListener("DOMContentLoaded", () => {
  let apiRecords = [
    {
      id: 1,
      title: "Folder 1",
      type: "folder",
      children: [
        { id: 2, title: "index.html", type: "file", children: [] },
        { id: 3, title: "index.js", type: "file", children: [] },
      ],
    },
    {
      id: 4,
      title: "Folder 2",
      type: "folder",
      children: [
        {
          id: 5,
          title: "styles.css",
          type: "file",
          children: [],
        },
      ],
    },
    {
      id: 6,
      title: "Folder 3",
      type: "folder",
      children: [
        {
          id: 7,
          title: "Sub Folder 1",
          type: "folder",
          children: [{ id: 8, title: "file.js", type: "file", children: [] }],
        },
      ],
    },
    {
      id: 8,
      title: "readme.txt",
      type: "file",
      children: [],
    },
  ];
  let parentContainer = document.getElementById("file-container");
  let fragment = document.createDocumentFragment();

  function renderRecords(record) {
    if (record["type"] === "file") {
      let container = document.createElement("li");
      container.setAttribute("tabIndex", 0);
      container.className = "file";
      container.innerText = record["title"];

      return container;
    } else if (record["type"] === "folder") {
      let parentContainer = document.createElement("ul");
      parentContainer.setAttribute("aria-expanded", "true");
      parentContainer.tabIndex = 0;
      parentContainer.innerText = record["title"];
      parentContainer.className = "folder";
      if (record["children"].length > 0) {
        for (let list of record["children"]) {
          parentContainer.append(renderRecords(list));
        }
      }
      return parentContainer;
    }
  }

  for (let item of apiRecords) {
    fragment.append(renderRecords(item));
  }
  parentContainer.append(fragment);

  parentContainer.addEventListener("click", (e) => {
    handleClick(e);
  });
  parentContainer.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === "") {
      handleClick(e);
    }
  });

  function handleClick(e) {
    if (e.target.classList.contains("folder")) {
      e.target.setAttribute(
        "aria-expanded",
        e.target.ariaExpanded === "true" ? "false" : "true"
      );
      let children = e.target.children;
      for (let i = 0; i < e.target.children.length; i++) {
        children[i].classList.toggle("hide");
        children[i].setAttribute(
          "aria-hidden",
          children[i].classList.contains("hide") ? "true" : "false"
        );
      }
    }
  }
});
