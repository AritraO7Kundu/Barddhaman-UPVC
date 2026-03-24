document.addEventListener("DOMContentLoaded", () => {

  const openBtn = document.getElementById("openPopup");
  const popup = document.getElementById("quotePopup");
  const closeBtn = document.getElementById("closePopup");

  if (!openBtn || !popup || !closeBtn) {
    console.log("Popup elements not found ❌");
    return;
  }

  /* OPEN */
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("active");
  });

  /* CLOSE */
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  /* CLICK OUTSIDE */
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });

});

