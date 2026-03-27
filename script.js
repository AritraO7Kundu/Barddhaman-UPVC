/* ================= Nav Bar ================= */

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

});


/* ================= HERO AUTO SLIDER ================= */

const slides = document.querySelectorAll(".hero-slider img");
let heroIndex = 0;

if (slides.length > 0) {
  setInterval(() => {

    slides[heroIndex].classList.remove("active");

    heroIndex = (heroIndex + 1) % slides.length;

    slides[heroIndex].classList.add("active");

  }, 7000);
}


/* ================= MOBILE NAV TOGGLE ================= */

const toggle2 = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle2 && nav) {
  toggle2.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}


/* ================= COUNTER ANIMATION ================= */

const counters = document.querySelectorAll(".counter");

function startCounter() {
  counters.forEach(counter => {

    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
      const increment = target / 60;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count) + "+";
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + "+";
      }
    };

    counter.innerText = "0+";
    update();
  });
}


/* ================= OBSERVER ================= */

let started = false;

const aboutSection = document.querySelector(".about-section");

if (aboutSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        startCounter();
        started = true;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(aboutSection);
}


/* ================= SERVICES SLIDER ================= */

/* ================= SERVICES SLIDER ================= */

const section = document.querySelector(".services-stack");
const cardsService = document.querySelectorAll(".stack-card");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let current = 0;
let autoSlide;

if (section && cardsService.length > 0) {

  /* ================= UPDATE CARDS ================= */
  function updateCardsService() {
    cardsService.forEach((card, i) => {
      card.classList.remove("active", "left", "right");

      if (i === current) {
        card.classList.add("active");
      } 
      else if (i === (current - 1 + cardsService.length) % cardsService.length) {
        card.classList.add("left");
      } 
      else if (i === (current + 1) % cardsService.length) {
        card.classList.add("right");
      }
    });
  }

  /* ================= NEXT / PREV ================= */
  function nextSlide() {
    current = (current + 1) % cardsService.length;
    updateCardsService();
  }

  function prevSlide() {
    current = (current - 1 + cardsService.length) % cardsService.length;
    updateCardsService();
  }

  /* ================= BUTTON CONTROLS ================= */
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAuto();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAuto();
    });
  }

  /* ================= AUTO SLIDE ================= */
  function startAuto() {
    autoSlide = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  function stopAuto() {
    clearInterval(autoSlide);
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  /* ================= 🔥 SWIPE SUPPORT ================= */
  let startX = 0;
  let endX = 0;

  section.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAuto(); // pause auto on touch
  });

  section.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;

    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(); // swipe left
      } else {
        prevSlide(); // swipe right
      }
    }

    startAuto(); // resume auto
  });

  /* ================= INIT ================= */
  updateCardsService();
  startAuto();
}


/* ================= PORTFOLIO ================= */

const btn = document.getElementById("changePortfolio");

if (btn) {

  let toggled = false;

  const set1 = [
    "Assets/Portfolio/img01.jpg",
    "Assets/Portfolio/img02.jpg",
    "Assets/Portfolio/img03.jpg",
    "Assets/Portfolio/img04.jpg"
  ];

  const set2 = [
    "Assets/Portfolio/img05.jpg",
    "Assets/Portfolio/img06.jpg",
    "Assets/Portfolio/img07.jpg",
    "Assets/Portfolio/img08.jpg"
  ];

  btn.addEventListener("click", () => {

    const images = [
      document.getElementById("img1"),
      document.getElementById("img2"),
      document.getElementById("img3"),
      document.getElementById("img4")
    ];

    images.forEach((img, i) => {
      if (!img) return;

      img.style.opacity = 0;

      setTimeout(() => {
        img.src = (!toggled ? set2[i] : set1[i]);
        img.style.opacity = 1;
      }, 200);
    });

    btn.innerText = toggled ? "See More" : "Show Less";
    toggled = !toggled;
  });

}





/* ================= TESTIMONIAL ================= */

const cards = document.querySelectorAll(".test-card");

let index = 0;

function updateSlider() {
  cards.forEach((card, i) => {
    card.classList.remove("active", "left", "right", "hidden");

    if (i === index) {
      card.classList.add("active");
    } 
    else if (i === (index - 1 + cards.length) % cards.length) {
      card.classList.add("left");
    } 
    else if (i === (index + 1) % cards.length) {
      card.classList.add("right");
    } 
    else {
      card.classList.add("hidden");
    }
  });
}

/* AUTO SLIDE */
setInterval(() => {
  index = (index + 1) % cards.length;
  updateSlider();
}, 2500);

/* INIT */
updateSlider();


const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  item.addEventListener("click", () => {

    // CALL BUTTON
    if (item.classList.contains("call-item")) {
      window.location.href = "tel:9932449360";
      return;
    }

    const isActive = item.classList.contains("active");

    // CLOSE ALL
    faqItems.forEach(i => i.classList.remove("active"));

    // OPEN CURRENT
    if (!isActive) {
      item.classList.add("active");
    }

  });

});


/* ================= DISCORD FORM ================= */

const form = document.getElementById("quoteForm");
const successPopup = document.getElementById("successPopup");
const closeSuccess = document.getElementById("closeSuccess");
const quotePopup = document.getElementById("quotePopup");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const message = form.message.value;

    const webhookURL = "https://discord.com/api/webhooks/1485551585668104273/clXUP132jyVHANNNFt4gG4Be3qnSA6dsrkLJWnjZR0QuDRvyfaAo67pqx-F20JEewnKt";

    const payload = {
      content: "📩 New Quote Request",
      embeds: [
        {
          title: "New Form Submission",
          color: 0xA77B55,
          fields: [
            { name: "👤 Name", value: name || "N/A", inline: true },
            { name: "📞 Phone", value: phone || "N/A", inline: true },
            { name: "📧 Email", value: email || "N/A" },
            { name: "💬 Message", value: message || "N/A" }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // 🔄 Reset form
      form.reset();

      // ❌ Close form popup
      quotePopup.style.display = "none";

      // ✅ Show success popup
      successPopup.classList.add("active");

    } catch (error) {
      console.error(error);
    }
  });
}

/* CLOSE SUCCESS POPUP */
closeSuccess.addEventListener("click", () => {
  successPopup.classList.remove("active");
});




document.getElementById("quoteBtn").addEventListener("click", async () => {

  const name = document.getElementById("q-name").value;
  const email = document.getElementById("q-email").value;
  const subject = document.getElementById("q-subject").value;
  const message = document.getElementById("q-message").value;

  if (!name || !email || !subject || !message) {
  status.innerText = "⚠ Please fill all fields";
  status.style.color = "red";
  return;
}

  const btn = document.getElementById("quoteBtn");
  const status = document.getElementById("quote-status");

  btn.innerText = "Sending...";
  btn.disabled = true;

  const webhook = "https://discord.com/api/webhooks/1485551585668104273/clXUP132jyVHANNNFt4gG4Be3qnSA6dsrkLJWnjZR0QuDRvyfaAo67pqx-F20JEewnKt";

  try {
    await fetch(webhook, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        content: `📩 New Quote\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
      })
    });

    btn.innerText = "Sent ✔";
    status.innerText = "Message sent!";
    status.style.color = "green";

    setTimeout(() => {
      btn.innerText = "Send Message";
      btn.disabled = false;
      status.innerText = "";

      document.getElementById("q-name").value = "";
      document.getElementById("q-email").value = "";
      document.getElementById("q-subject").value = "";
      document.getElementById("q-message").value = "";

    }, 2000);

  } catch {
    btn.innerText = "Error ❌";
    btn.disabled = false;
  }
  

});

// SELECT ELEMENTS
const fabContainer = document.getElementById("fabContainer");
const fabToggle = document.getElementById("fabToggle");
const heroSection = document.getElementById("hero");

// TOGGLE OPEN/CLOSE
fabToggle.addEventListener("click", () => {
  fabContainer.classList.toggle("active");
});

// SHOW AFTER HERO
window.addEventListener("scroll", () => {
  const rect = heroSection.getBoundingClientRect();

  if (rect.bottom <= 0) {
    fabContainer.classList.add("show");
  } else {
    fabContainer.classList.remove("show");
    fabContainer.classList.remove("active"); // auto close
  }
});



