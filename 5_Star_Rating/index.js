document.addEventListener("DOMContentLoaded", () => {
  const parentContainer = document.getElementById("stars-container");
  const textContainer = document.getElementById("rating-text");
  let fragment = document.createDocumentFragment();
  let currentRating = 0;
  let totalStars = 5;

  function renderStars(stars) {
    for (let i = 0; i < stars; i++) {
      let starButton = document.createElement("button");
      starButton.className = "star";
      starButton.setAttribute('role', "button")
      starButton.setAttribute("aria-label", `Rate ${i + 1} star of ${stars}`);
      starButton.setAttribute("data-id", i + 1);
      starButton.innerText = "star";

      fragment.appendChild(starButton);
    }
    parentContainer.appendChild(fragment);
    addEventListener(parentContainer);
    changeDisplayRating(0);
  }

  function addEventListener(element) {
    element.addEventListener("click", (e) => {
      if (e.target.classList.contains("star")) {
        currentRating = parseInt(e.target.dataset.id);
        fillStars(currentRating);
        changeDisplayRating(currentRating);
      }
    });

    element.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("star")) {
          let tempRating = parseInt(e.target.dataset.id);
          fillStars(tempRating);
        }
      });

      element.addEventListener("mouseout", (e) => {
        if (e.target.classList.contains("star")) {
          fillStars(currentRating);
        }
      });
  }

  function fillStars(count) {
    let allStars = parentContainer.children;
    for (let i = 0; i < allStars.length; i++) {
      if (i < count) allStars[i].classList.add("active");
      else allStars[i].classList.remove("active");
    }
  }

  function changeDisplayRating(activeStars) {
    textContainer.innerText = `your rating is ${activeStars}`;
  }

  renderStars(totalStars);
});
