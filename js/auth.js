// IMPORTS DESDE CDN (clave)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// TU CONFIG (el que ya tienes)
const firebaseConfig = {
  apiKey: "AIzaSyCoAsO3NaglYwz2BWKLFxjo1XDbmh34vFs",
  authDomain: "azkabar-web.firebaseapp.com",
  projectId: "azkabar-web",
  storageBucket: "azkabar-web.firebasestorage.app",
  messagingSenderId: "647830654519",
  appId: "1:647830654519:web:da1946338da7bf694279b2"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// CONTENEDOR
const authContainer = document.getElementById("auth-container");

// LOGIN
function login() {
  signInWithPopup(auth, provider)
    .catch(error => console.error(error));
}

// LOGOUT
function logout() {
  signOut(auth);
}

// ESTADO DE SESIÓN
onAuthStateChanged(auth, (user) => {
  if (user) {
    authContainer.innerHTML = `
    <div class="user-menu">
        <button id="btn-user">👤 Bienvenido ${user.displayName}</button>
        <div id="dropdown-menu" class="dropdown hidden">
        <button id="btn-logout">Cerrar sesión</button>
        </div>
    </div>
    `;

    const btnUser = document.getElementById("btn-user");
    const dropdown = document.getElementById("dropdown-menu");
    const btnLogout = document.getElementById("btn-logout");

    // Mostrar / ocultar menú
    btnUser.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
    });

    // Logout
    btnLogout.addEventListener("click", logout);

    // Cerrar si haces click fuera
    document.addEventListener("click", (e) => {
    if (!btnUser.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
    });

  } else {
    authContainer.innerHTML = `
      <button id="btn-login">Iniciar sesión</button>
    `;

    document.getElementById("btn-login").addEventListener("click", login);
  }
});