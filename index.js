// EmailJS settings (the public key is meant to be used in the browser)
const EMAILJS_SERVICE_ID = "portfolio_gmail";
const EMAILJS_TEMPLATE_ID = "portfolio_contact";
const EMAILJS_PUBLIC_KEY = "p41sjmAxdwdhp2euh";

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function isEmailSetUp() {
  return (
    typeof emailjs !== "undefined" &&
    !EMAILJS_SERVICE_ID.startsWith("YOUR_") &&
    !EMAILJS_TEMPLATE_ID.startsWith("YOUR_") &&
    !EMAILJS_PUBLIC_KEY.startsWith("YOUR_")
  );
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");

  if (!isEmailSetUp()) {
    alert(
      "Sorry, my contact form isn't connected yet. Please reach out to me on LinkedIn (linkedin.com/in/beau-sterling) instead."
    );
    return;
  }

  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, event.target, EMAILJS_PUBLIC_KEY)
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please reach out to me on LinkedIn (linkedin.com/in/beau-sterling) instead."
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}
