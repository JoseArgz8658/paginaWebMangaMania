import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjyeLCCkU0rr-0ywqaLX8uuYynu8Rm1yU",
  authDomain: "mangamania-proyect.firebaseapp.com",
  projectId: "mangamania-proyect",
  storageBucket: "mangamania-proyect.firebasestorage.app",
  messagingSenderId: "515105163385",
  appId: "1:515105163385:web:af51993421a29126fa2ca8",
  measurementId: "G-L9S5EEW5Y0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const formLogin = document.getElementById('formLogin');
const emailInput = document.getElementById('emaillog');
const passwordInput = document.getElementById('passwordlog');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('cerrar');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert('Tu correo no ha sido verificado. Por favor revisa tu bandeja de entrada.');
        return;
      }

      console.log('Usuario iniciado sesión:', user);
      window.location.href = '/FrontEnd/index.html';
    })
    .catch((error) => {
      console.error(error.code, error.message);
      alert('Hubo un error al iniciar sesión: ' + error.message);
    });
});

logoutButton.addEventListener('click', (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      console.log('Usuario cerró sesión');
      window.location.href = '/FrontEnd/HTML/Pages/InicioSesion.html';
    })
    .catch((error) => {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión: ' + error.message);
    });
});