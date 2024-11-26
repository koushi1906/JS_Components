document.addEventListener("DOMContentLoaded", (e) => {
  const APIResponse = [
    { id: 1, title: "Accordion panel 1", content: "Accordion content 1" },
    { id: 2, title: "Accordion panel 2", content: "Accordion content 2" },
    { id: 3, title: "Accordion panel 3", content: "Accordion content 3" },
  ];
  let fragment = document.createDocumentFragment();
  let activePanel = null;

  let container = document.getElementById("accordion-wrapper");

  function render(data, parentContainer) {
    data.forEach((el) => {
      let accordionContainer = document.createElement("div");
      accordionContainer.id = `accordion-container${el.id}`;

      let panel = document.createElement("button");
      panel.className = "accordion-panel";
      panel.innerText = el.title;
      panel.setAttribute(
        "aria-controls",
        `accordion-content-container${el.id}`
      );
      panel.setAttribute("aria-expanded", "false");

      let contentContainer = document.createElement("div");
      contentContainer.id = `accordion-content-container${el.id}`;
      contentContainer.className = "accordion-content-container";
      contentContainer.classList.add("hide");
      contentContainer.setAttribute("aria-hidden", "true");
      let content = document.createElement("p");
      content.innerText = el.content;

      contentContainer.appendChild(content);

      accordionContainer.appendChild(panel);
      accordionContainer.appendChild(contentContainer);

      fragment.appendChild(accordionContainer);
    });

    parentContainer.appendChild(fragment);
    captureEvents(parentContainer);
  }

  function captureEvents(targetElement) {
    targetElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("accordion-panel")) {
        let target = e.target;
        if (!activePanel) {
          activePanel = target;
          openPanel(activePanel);
        } else if (activePanel === target) {
          closePanel(activePanel);
          activePanel = null;
        } else {
          closePanel(activePanel);
          activePanel = target;
          openPanel(activePanel);
        }
      }
    });
  }

  function openPanel(panel) {
    panel.setAttribute("aria-expanded", "true");
    panel.nextElementSibling.setAttribute("aria-hidden", "false");
    panel.nextElementSibling.classList.remove("hide");
  }

  function closePanel(panel) {
    panel.setAttribute("aria-expanded", "false");
    panel.nextElementSibling.setAttribute("aria-hidden", "true");
    panel.nextElementSibling.classList.add("hide");
  }

  render(APIResponse, container);
});
