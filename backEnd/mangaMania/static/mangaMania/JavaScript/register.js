import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Tu configuración de Firebase
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
const db = getFirestore(app);

// Formulario de registro
const formRegister = document.getElementById('formRegister');

formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombrereg').value;
  const apellido = document.getElementById('apellidoreg').value;
  const email = document.getElementById('emailreg').value;
  const password = document.getElementById('passwordreg').value;

  if (!nombre || !apellido || !email || !password) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("El correo electrónico no es válido.");
    return;
  }

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  try {
    // Crear usuario
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos en Firestore usando el UID
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: nombre,
      apellido: apellido,
      email: email,
      suscripcion: false, // o "ninguna"
      fechaRegistro: new Date()
    });

    // Enviar correo de verificación
    await sendEmailVerification(user);
    alert("Registro exitoso. Por favor verifica tu correo electrónico.");
    window.location.href = "/FrontEnd/HTML/Pages/InicioSesion.html";

  } catch (error) {
    console.error("Error en registro:", error);
    alert("Hubo un error: " + error.message);
  }
});
