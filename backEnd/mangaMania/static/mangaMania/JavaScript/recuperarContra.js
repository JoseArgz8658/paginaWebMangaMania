import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCjyeLCCkU0rr-0ywqaLX8uuYynu8Rm1yU",
  authDomain: "mangamania-proyect.firebaseapp.com",
  projectId: "mangamania-proyect",
  storageBucket: "mangamania-proyect.firebasestorage.app",
  messagingSenderId: "515105163385",
  appId: "1:515105163385:web:af51993421a29126fa2ca8",
  measurementId: "G-L9S5EEW5Y0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Manejo del formulario de recuperación
const formRecuperar = document.getElementById("formRecuperar");
formRecuperar.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevenir el envío tradicional del formulario

    const email = document.getElementById("emailRecuperar").value;

    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Mostrar mensaje de éxito
                document.getElementById("mensaje").innerHTML = `<div class="alert alert-success">Se ha enviado un enlace de recuperación a tu correo electrónico.</div>`;
            })
            .catch((error) => {
                // Mostrar mensaje de error
                const errorCode = error.code;
                let errorMessage = "Hubo un error al enviar el enlace.";
                if (errorCode === 'auth/user-not-found') {
                    errorMessage = "El correo electrónico no está registrado.";
                }
                document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`;
            });
    } else {
        document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger">Por favor, ingresa tu correo electrónico.</div>`;
    }
});