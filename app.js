let calcBtn = document.querySelector(".calculator__btn");
let a = document.querySelector(".calculator__input-a");
let b = document.querySelector(".calculator__input-b");
let c = document.querySelector(".calculator__input-c");
let valDelta = document.querySelector(".val-del");
let valX1 = document.querySelector(".val-x1");
let valX2 = document.querySelector(".val-x2");

function init() {
  document.querySelectorAll(".val").forEach((item) => {
    item.textContent = "0";
  });
}

window.addEventListener("load", init);

class FuncaoQuadratica {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  calcDelta = () => {
    
    let delta = Math.pow(this.b, 2) - 4 * (this.a * this.c);

    if (delta < 0) {
      return error();
    }

    return delta;
  };

  calcXValues = () => {

    let x1 = (-this.b + Math.sqrt(this.calcDelta())) / (2 * this.a)
    let x2 = (-this.b - Math.sqrt(this.calcDelta())) / (2 * this.a)
    
    if(x1 % 1 !== 0) { x1 = x1.toFixed(3) }
    if(x2 % 1 !== 0) { x2 = x2.toFixed(3) }

    return [x1, x2];
  };
}

calcBtn.addEventListener("click", () => {
  if (a.value === "" || b.value === "" || c.value === "") {
    return showWarn();
  }

  document.querySelector(".calculator__res").classList.add("animation1");
  document.querySelector(".copy").classList.add("animation2");
  document.querySelector(".val-a").textContent = a.value;
  document.querySelector(".val-b").textContent = b.value;
  document.querySelector(".val-c").textContent = c.value;

  const result = new FuncaoQuadratica(a.value, b.value, c.value);

  document.querySelectorAll(".calculator__input").forEach((input) => {
    input.value = "";
  });

  valDelta.textContent = result.calcDelta();

  valX1.textContent = result.calcXValues()[0];
  valX2.textContent = result.calcXValues()[1];
});

function showWarn() {
  document.querySelector(".invalid").style.display = "block";
}

function error() {
  document.querySelector(".error").style.display = "block";

  valDelta.textContent = '0'
  valX1.textContent = '0'
  valX2.textContent = '0'

  setTimeout(function () {
    document.querySelector(".error").style.display = "none";
  }, 5000);
}
document.querySelector(".btn-close").addEventListener("click", () => {
  document.querySelector(".invalid").style.display = "none";
  a.focus();
});
