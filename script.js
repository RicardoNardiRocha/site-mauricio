/* ================= CAROUSEL + SELEÇÃO ================= */

const carousel = document.querySelector(".card-carousel");
const cards = document.querySelectorAll(".card");
const toggleBtn = document.querySelector(".toggle");
const confirmBtn = document.getElementById("confirmBtn");

let current = 0;
let opened = false;
let selectedLink = null;

function getIndex(i) {
  return (i + cards.length) % cards.length;
}

function updateCarousel() {
  cards.forEach(card => card.className = "card");
  if (!opened) return;

  cards[getIndex(current)].classList.add("active");
  cards[getIndex(current - 1)].classList.add("prev-1");
  cards[getIndex(current - 2)].classList.add("prev-2");
  cards[getIndex(current + 1)].classList.add("next-1");
  cards[getIndex(current + 2)].classList.add("next-2");
}

toggleBtn.addEventListener("click", () => {
  opened = !opened;
  carousel.classList.toggle("closed");

  if (opened) {
    confirmBtn.classList.remove("active");
    confirmBtn.disabled = true;
    selectedLink = null;
  }

  updateCarousel();
});

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (!opened) return;

    current = index;
    updateCarousel();

    cards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    selectedLink = card.dataset.link;

    confirmBtn.classList.add("active");
    confirmBtn.disabled = false;
  });
});

confirmBtn.addEventListener("click", () => {
  if (selectedLink) {
    window.location.href = selectedLink;
  }
});

updateCarousel();


/* ================= FIREBASE ================= */

const firebaseConfig = {
  apiKey: "AIzaSyDYXIisMVxpQA8v9uI8BPMtV5Tcdm7iPZ4",
  authDomain: "contabilx-77490593-12929.firebaseapp.com",
  projectId: "contabilx-77490593-12929",
  storageBucket: "contabilx-77490593-12929.firebasestorage.app",
  messagingSenderId: "738023734424",
  appId: "1:738023734424:web:04c5654d32f50b6663a4ed"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginArea = document.getElementById("loginArea");
const nomeArea = document.getElementById("nomeArea");
const appArea = document.getElementById("appArea");
const mensagem = document.getElementById("mensagem");
const mensagemNome = document.getElementById("mensagemNome");
const bemVindo = document.getElementById("bemVindo");

const welcomeOverlay = document.getElementById("welcomeOverlay");
const welcomeText = document.getElementById("welcomeText");

/* ================= AUTH ================= */

auth.onAuthStateChanged(async user => {
  if (!user) {
    loginArea.style.display = "flex";
    nomeArea.style.display = "none";
    appArea.style.display = "none";
    return;
  }

  const ref = db.collection("usuarios").doc(user.uid);
  const snap = await ref.get();

  if (!snap.exists) {
    loginArea.style.display = "none";
    nomeArea.style.display = "flex";
    appArea.style.display = "none";
  } else {
    const dados = snap.data();

    welcomeText.innerText = `Bem-vindo, ${dados.nome}`;
    welcomeOverlay.classList.remove("hide");

    // Esconde automaticamente após 2,5s
    setTimeout(() => {
      welcomeOverlay.classList.add("hide");
    }, 2500);

    loginArea.style.display = "none";
    nomeArea.style.display = "none";
    appArea.style.display = "flex";
  }
});

/* ================= LOGIN ================= */

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  mensagem.innerText = "Entrando...";

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      mensagem.innerText = "Login realizado!";
    })
    .catch(() => {
      mensagem.innerText = "Email ou senha inválidos";
    });
}


/* ================= SALVAR NOME ================= */

async function salvarNome() {
  const nome = document.getElementById("nomeInput").value;
  const user = auth.currentUser;

  if (!nome || !user) return;

  mensagemNome.innerText = "Salvando...";

  await db.collection("usuarios").doc(user.uid).set({
    nome: nome,
    email: user.email,
    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
  });

  mensagemNome.innerText = "Salvo com sucesso!";
}

/* ================= LOGOUT ================= */

function logout() {
  auth.signOut();
}


const themes = [
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#0F3460"
    },
    {
        background: "#461220",
        color: "#FFFFFF",
        primaryColor: "#E94560"
    },
    {
        background: "#192A51",
        color: "#FFFFFF",
        primaryColor: "#967AA1"
    },
    {
        background: "#F7B267",
        color: "#000000",
        primaryColor: "#F4845F"
    },
    {
        background: "#F4f4f4",
        color: "#000000",
        primaryColor: "#192A51"
    },
    {
        background: "#231F20",
        color: "#FFF",
        primaryColor: "#BB4430"
    }
];

const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--glass-color", theme.glassColor);
};

const displayThemeButtons = () => {
    const btnContainer = document.querySelector(".theme-btn-container");
    themes.forEach((theme) => {
        const div = document.createElement("div");
        div.className = "theme-btn";
        div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
        btnContainer.appendChild(div);
        div.addEventListener("click", () => setTheme(theme));
    });
};

displayThemeButtons();
