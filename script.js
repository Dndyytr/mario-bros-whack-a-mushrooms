const pipa = document.querySelectorAll(".pipa");
const jamur = document.querySelectorAll(".jamur");
const skor = document.querySelector("#skor");
const waktu = document.querySelector("#waktu");
const coin = document.querySelector("#coin");
const mJalan = document.querySelector("#jalan");
const gameOver = document.querySelector("#kalah");
const imgCoin = document.createElement("img");
const content = document.querySelector(".content");
const container = document.querySelector(".container");
const tingkat = document.querySelector("#opsi-tingkat");
const jreng = document.querySelector("#jreng");

const wadahX = document.querySelector(".overlay");
const x = document.createElement("span");
x.innerHTML = "✖";
x.classList.add("x");

let pipaSebelumnya;
let selesai;
let hitungSkor;
let waktuJalan;
let difficulty = "easy"; // Default level

const achievements = {
  score10: false,
  score20: false,
  score30: false,
  score10Rewarded: false,
  score20Rewarded: false,
  score30Rewarded: false,
};

function achiv() {
  const capai = document.querySelector("#pencapaian");
  const acip = document.querySelector("#achievements");
  const btn = document.createElement("span");
  btn.innerHTML = "✖";
  btn.classList.add("btn");
  acip.appendChild(btn);
  capai.classList.add("aktip");
  document.querySelector(".btn").addEventListener("click", () => {
    acip.removeChild(btn);
    capai.classList.remove("aktip");
  });
}

function hadiah() {
  const selamat = document.querySelector(".hadiah");
  const box = document.querySelector(".wadah-hadiah");
  const angka = document.querySelector(".angka");
  const close = document.createElement("span");
  close.innerHTML = "✖";
  close.classList.add("close");
  if (hitungSkor >= 10 && !achievements.score10Rewarded) {
    achievements.score10Rewarded = true;
    selamat.classList.add("aktip");
    box.classList.add("aktip");
    angka.innerHTML = "10";
    box.appendChild(close);
    jreng.play();
    document.querySelector(".close").addEventListener("click", () => {
      selamat.classList.remove("aktip");
      box.classList.remove("aktip");
      if (close.parentNode === box) {
        box.removeChild(close);
      }
      jreng.pause();
      jreng.currentTime = 0;
    });
  }
  if (hitungSkor >= 20 && !achievements.score20Rewarded) {
    achievements.score20Rewarded = true;
    selamat.classList.add("aktip");
    box.classList.add("aktip");
    angka.innerHTML = "20";
    box.appendChild(close);
    jreng.play();
    document.querySelector(".close").addEventListener("click", () => {
      selamat.classList.remove("aktip");
      box.classList.remove("aktip");
      if (close.parentNode === box) {
        box.removeChild(close);
      }
      jreng.pause();
      jreng.currentTime = 0;
    });
  }
  if (hitungSkor >= 30 && !achievements.score30Rewarded) {
    achievements.score30Rewarded = true;
    selamat.classList.add("aktip");
    box.classList.add("aktip");
    angka.innerHTML = "30";
    box.appendChild(close);
    jreng.play();
    document.querySelector(".close").addEventListener("click", () => {
      selamat.classList.remove("aktip");
      box.classList.remove("aktip");
      if (close.parentNode === box) {
        box.removeChild(close);
      }
      jreng.pause();
      jreng.currentTime = 0;
    });
  }
}

tingkat.addEventListener("change", (event) => {
  difficulty = event.target.value;
});

function randompipa(pipa) {
  const p = Math.floor(Math.random() * pipa.length);
  const pRandom = pipa[p];
  if (pRandom == pipaSebelumnya) {
    randompipa(pipa);
  }
  pipaSebelumnya = pRandom;
  return pRandom;
}

function randomWaktu(min, max) {
  switch (difficulty) {
    case "easy":
      return Math.round(Math.random() * (max - min) + min);
    case "medium":
      return Math.round(Math.random() * (max - min) + min - 200);
    case "hard":
      return Math.round(Math.random() * (max - min) + min - 400);
    default:
      return Math.round(Math.random() * (max - min) + min);
  }
}

function munculJamur() {
  const pRandom = randompipa(pipa);
  const wRandom = randomWaktu(400, 1000);
  pRandom.classList.add("muncul");

  setTimeout(() => {
    pRandom.classList.remove("muncul");
    if (!selesai) {
      munculJamur();
    }
    if (waktuJalan == 0) {
      pRandom.classList.remove("muncul");
    }
  }, wRandom);
}

function kalah() {
  wadahX.appendChild(x);
  const over = document.querySelector(".gameover");
  const tSpan = document.querySelector(".x");
  over.classList.add("aktip");
  tSpan.addEventListener("click", () => {
    gameOver.pause();
    gameOver.currentTime = 0;
    over.classList.remove("aktip");
    wadahX.removeChild(x);
    hadiah();
  });
}
function mulai() {
  if (tingkat.value == "awal") {
    alert("Pilih Tingkat Terlebih Dahulu!");
    return;
  }
  tingkat.disabled = true;
  mJalan.play();
  document.getElementById("mulai").disabled = true;
  document.getElementById("acipmen").disabled = true;
  waktuJalan = 25;
  container.classList.add("aktip");
  waktu.innerHTML = waktuJalan;
  jalann = setInterval(() => {
    waktuJalan--;
    waktu.innerHTML = waktuJalan;
    if (waktuJalan == 0) {
      clearInterval(jalann);
      mJalan.pause();
      mJalan.currentTime = 0;
      gameOver.play();
      kalah();
      waktu.removeAttribute("style");
      container.classList.remove("aktip");
      tingkat.disabled = false;
    } else if (waktuJalan < 6) {
      waktu.style.color = "red";
      waktu.style.textShadow = "0 0 5px white";
    }
  }, 1000);
  selesai = false;
  hitungSkor = 0;
  skor.innerHTML = 0;
  munculJamur();
  setTimeout(() => {
    document.getElementById("mulai").disabled = false;
    document.getElementById("acipmen").disabled = false;
    selesai = true;
  }, 25000);
}

function pukul() {
  hitungSkor++;
  this.parentNode.classList.remove("muncul");
  this.style.pointerEvents = "none";
  coin.play();
  skor.innerHTML = hitungSkor;
  imgCoin.src = "img/coin.gif";
  imgCoin.id = "coin";
  this.parentNode.appendChild(imgCoin);

  if (hitungSkor >= 10 && !achievements.score10) {
    achievements.score10 = true;
    const achievement10 = document.getElementById("achievement-10");
    const status10 = achievement10.querySelector(".status");
    const bintang = document.createElement("span");
    bintang.innerHTML = " ★";
    bintang.classList.add("btg");

    if (status10) {
      status10.innerHTML = `Unlocked <i class="fa-solid fa-unlock"></i>`;
      achievement10.appendChild(bintang);
    }
  }

  if (hitungSkor >= 20 && !achievements.score20) {
    achievements.score20 = true;
    const achievement20 = document.getElementById("achievement-20");
    const status20 = achievement20.querySelector(".status");
    const bintang = document.createElement("span");
    bintang.innerHTML = " ★★";
    bintang.classList.add("btg");

    if (status20) {
      status20.innerHTML = `Unlocked <i class="fa-solid fa-unlock"></i>`;
      achievement20.appendChild(bintang);
    }
  }

  if (hitungSkor >= 30 && !achievements.score30) {
    achievements.score30 = true;
    const achievement30 = document.getElementById("achievement-30");
    const status30 = achievement30.querySelector(".status");
    const bintang = document.createElement("span");
    bintang.innerHTML = " ★★★";
    bintang.classList.add("btg");

    if (status30) {
      status30.innerHTML = `Unlocked <i class="fa-solid fa-unlock"></i>`;
      achievement30.appendChild(bintang);
    }
  }

  setTimeout(() => {
    coin.pause();
    coin.currentTime = 0;
    this.style.pointerEvents = "auto";
    if (imgCoin.parentNode === this.parentNode) {
      this.parentNode.removeChild(imgCoin);
    }
  }, 700);
}

jamur.forEach((j) => {
  j.addEventListener("click", pukul);
});
