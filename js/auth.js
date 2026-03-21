// IMportamos funciones del SDK de firebase(Software Development Kit - herramientas)

import { initializeApp //enlaza nuestra pagina web con firebase

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, // activa el modulo authentication
  signInWithPopup,  // Abre el popup de google(pestaña emergente para inciiar sesion)
  GoogleAuthProvider,  // define que se usará la cuenta de google para el login
  onAuthStateChanged, //Detecta si el usuario está logeado
  signOut  //Cierra sesión
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";





// Configuracion (Especificamos los datos requeridos para conectarnos a nuestro proyecto de firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCoAsO3NaglYwz2BWKLFxjo1XDbmh34vFs", //firebase sabrá que app hace la peticion
  authDomain: "azkabar-web.firebaseapp.com", //Dominio donde se realizará la autenticacion
  projectId: "azkabar-web", //nombre del proyecto
  storageBucket: "azkabar-web.firebasestorage.app", 
  messagingSenderId: "647830654519",
  appId: "1:647830654519:web:da1946338da7bf694279b2" //identificador de app
};

// Inicializar
//“Crea un objeto que representa mi aplicación conectada al proyecto azkabar-web en Firebase”
const app = initializeApp(firebaseConfig);  
//“Obtenemos el módulo de autenticación asociado a ESTA app”
const auth = getAuth(app);
//creamos el objeto proveedor de autenticacion con google
const provider = new GoogleAuthProvider();

// CONTENEDOR busca un emelento en el html
const authContainer = document.getElementById("auth-container");

// LOGIN
function login() {
  signInWithPopup(auth, provider) //funcion de firebase que abre el popup
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