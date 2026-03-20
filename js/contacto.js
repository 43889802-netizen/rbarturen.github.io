import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCoAsO3NaglYwz2BWKLFxjo1XDbmh34vFs",
  authDomain: "azkabar-web.firebaseapp.com",
  projectId: "azkabar-web",
  storageBucket: "azkabar-web.firebasestorage.app",
  messagingSenderId: "647830654519",
  appId: "1:647830654519:web:da1946338da7bf694279b2"
};

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FORM
const form = document.getElementById("form-contacto");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;
  const mensaje = document.getElementById("mensaje").value;

  try {
    await addDoc(collection(db, "contactos"), {
      nombre,
      correo,
      telefono,
      mensaje,
      fecha: new Date()
    });

    document.getElementById("mensaje-envio").innerText = "Mensaje enviado correctamente ✅";
    form.reset();

  } catch (error) {
    console.error(error);
    document.getElementById("mensaje-envio").innerText = "Error al enviar ❌";
  }
});