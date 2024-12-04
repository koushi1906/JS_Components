document.addEventListener("DOMContentLoaded", () => {
  const carouselItemsContainer = document.getElementById("carousel-items");
  const actionButtons = document.getElementById("actions");
  const currSlideInfo = document.getElementById("slide-info");
  let fragment = document.createDocumentFragment();
  let responseData = [
    {
      id: 1,
      img: "https://m.media-amazon.com/images/I/81pkxKr5xQL._SX3000_.jpg",
      link: "",
      alt: "Be the holiday hero",
    },
    {
      id: 2,
      img: "https://m.media-amazon.com/images/I/81-6prPMF7L._SX3000_.jpg",
      link: "",
      alt: "Gifts for him under 25",
    },
    {
      id: 3,
      img: "https://m.media-amazon.com/images/I/81UILkRAM2L._SX3000_.jpg",
      link: "",
      alt: "Cross original series",
    },
    {
      id: 4,
      img: "https://m.media-amazon.com/images/I/61ON9VKQtfL._SX3000_.jpg",
      link: "",
      alt: "Amazon one medical",
    },
    {
      id: 5,
      img: "https://m.media-amazon.com/images/I/81kKlwCObjL._SX3000_.jpg",
      link: "",
      alt: "Gifts for teens under 25",
    },
  ];
  let activeSlide = 0;
  let maxSlides = responseData.length - 1;
  let timer;

  function renderItems(dataArray) {
    dataArray.forEach((item) => {
      let slideContainer = document.createElement("div");
      slideContainer.className = "carousel-slide";

      let slideLink = document.createElement("a");
      slideLink.href = item["link"];

      let slideImage = document.createElement("img");
      slideImage.src = item["img"];
      slideImage.loading = "lazy";
      slideImage.alt = item.alt;

      slideLink.append(slideImage);
      slideContainer.append(slideLink);
      fragment.append(slideContainer);
    });

    carouselItemsContainer.append(fragment);
    changeSlideInfo();
  }

  renderItems(responseData);

  actionButtons.addEventListener("click", (e) => {
    clearInterval(timer);
    timer = setInterval(() => {
      increment();
      changeSlide(activeSlide);
    }, 5000);
    if (e.target.id === "previousBtn") {
      decrement();
    } else if (e.target.id === "nextBtn") {
      increment();
    }
    changeSlide(activeSlide);
  });

  function increment() {
    activeSlide = activeSlide < maxSlides ? activeSlide + 1 : 0;
  }

  function decrement() {
    activeSlide = activeSlide > 0 ? activeSlide - 1 : maxSlides;
  }

  function changeSlide(index) {
    const offSet = -index * 100;
    carouselItemsContainer.style.transform = `translateX(${offSet}%)`;
    changeSlideInfo();
  }

  function changeSlideInfo() {
    currSlideInfo.innerText = `Slide ${activeSlide + 1} of ${maxSlides + 1}`;
  }

  function startSlideShow() {
    timer = setInterval(() => {
      increment();
      changeSlide(activeSlide);
    }, 5000);
  }

  startSlideShow();
});

// Improvements
// -> have tabIndex -1 for all the slides and 0 for only the slide active
