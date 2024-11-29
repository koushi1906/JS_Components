document.addEventListener("DOMContentLoaded", () => {
  let btn = document.getElementById("like-button");
  let isBtnLiked = false;
  btn.addEventListener("click", (e) => {
    return new Promise((res, rej) => {
      if (isBtnLiked) {
        btn.classList.remove("liked");
        btn.innerText = "Like";
        isBtnLiked = false;
        btn.setAttribute("aria-label", "Like this Post");
        res();
        return;
      }
      btn.disabled = true;
      btn.setAttribute("aria-label", "Liking the post");
      setTimeout(() => {
        btn.disabled = false;
        btn.innerText = "Liked";
        btn.classList.add("liked");
        btn.setAttribute("aria-label", "Unlike this Post");
        isBtnLiked = true;
        res();
      }, 5000);
    });
  });
});
