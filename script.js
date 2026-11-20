
const flowers = Array.from(document.querySelectorAll(".flower"));
const touchPrompt = document.querySelector(".touch-prompt");
const greeting = document.querySelector(".greeting");
const touchedFlowers = new Set();
let plantHasGrown = false;
let promptIsHiding = false;

flowers.forEach((flower) => {
  const bloom = () => {
    if (!plantHasGrown || flower.classList.contains("is-bloomed")) {
      return;
    }

    flower.classList.add("is-bloomed");
    flower.setAttribute("aria-pressed", "true");
    touchedFlowers.add(flower);

    if (touchedFlowers.size === flowers.length) {
      promptIsHiding = true;
      touchPrompt.classList.remove("is-visible");
      touchPrompt.classList.add("is-hiding");
      touchPrompt.setAttribute("aria-hidden", "true");
    }
  };

  flower.addEventListener("click", bloom);
  flower.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      bloom();
    }
  });
});

document.querySelector(".long-g--6 > .grow-ans:last-child").addEventListener("animationend", (event) => {
  if (event.animationName !== "grow-ans") {
    return;
  }

  plantHasGrown = true;
  flowers.forEach((flower) => flower.setAttribute("aria-disabled", "false"));
  touchPrompt.removeAttribute("aria-hidden");
  requestAnimationFrame(() => touchPrompt.classList.add("is-visible"));
});

touchPrompt.addEventListener("transitionend", (event) => {
  if (event.target !== touchPrompt || event.propertyName !== "opacity" || !promptIsHiding) {
    return;
  }

  greeting.removeAttribute("aria-hidden");
  requestAnimationFrame(() => greeting.classList.add("is-visible"));
});

onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };