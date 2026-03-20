// Inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Elementos HTML
const authContainer = document.getElementById("auth-container");

// LOGIN
function login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Logeado:", result.user.displayName);
        })
        .catch((error) => {
            console.error(error);
        });
}

// LOGOUT
function logout() {
    signOut(auth);
}

// CAMBIO DINÁMICO DEL BOTÓN
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.innerHTML = `
            <button id="btn-user">Bienvenido ${user.displayName}</button>
            <button id="btn-logout">Salir</button>
        `;

        document.getElementById("btn-logout").addEventListener("click", logout);

    } else {
        authContainer.innerHTML = `
            <button id="btn-login">Iniciar sesión</button>
        `;

        document.getElementById("btn-login").addEventListener("click", login);
    }
});