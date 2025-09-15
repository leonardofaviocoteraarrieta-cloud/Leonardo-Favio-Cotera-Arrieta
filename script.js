const ADMIN_USER = "leonardo";
const ADMIN_PASS = "cotera2004";

let editIndex = -1; // Para saber si estamos editando

// ---------------- LISTA BASE DE ACTIVIDADES ----------------
// Estas son las iniciales, luego se mezclan con lo que guardes en localStorage
const baseActividades = [
  { nombre: "Semana 01", archivo: "CoteraArrietaLeonardo_Fundamentos_de_un_proyecto_final.pdf" }
];

// ---------------- OBTENER ACTIVIDADES ----------------
function getActividades() {
  let guardadas = JSON.parse(localStorage.getItem("actividades")) || [];
  return [...baseActividades, ...guardadas];
}

// ---------------- GUARDAR NUEVA ACTIVIDAD ----------------
function saveActividad(act) {
  let guardadas = JSON.parse(localStorage.getItem("actividades")) || [];
  guardadas.push(act);
  localStorage.setItem("actividades", JSON.stringify(guardadas));
}

// ---------------- LOGIN ----------------
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    mostrarActividadesAdmin();
  } else {
    document.getElementById("login-error").textContent =
      "Usuario o contraseña incorrectos";
  }
}

// ---------------- LOGOUT ----------------
function logout() {
  document.getElementById("login-container").style.display = "block";
  document.getElementById("admin-panel").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// ---------------- AGREGAR ACTIVIDAD ----------------
function agregarActividad() {
  const nombre = document.getElementById("actividad-nombre").value;
  const archivo = document.getElementById("actividad-archivo").value; // solo tomamos el nombre

  if (!nombre || !archivo) {
    alert("Debes escribir un nombre y el nombre exacto del PDF subido en /pdfs/");
    return;
  }

  const actividad = {
    nombre,
    archivo
  };

  saveActividad(actividad);
  alert("Actividad agregada correctamente (recuerda subir el PDF a /pdfs/)");

  document.getElementById("actividad-nombre").value = "";
  document.getElementById("actividad-archivo").value = "";

  mostrarActividadesAdmin();
}

// ---------------- ELIMINAR ACTIVIDAD ----------------
function eliminarActividad(index) {
  let guardadas = JSON.parse(localStorage.getItem("actividades")) || [];
  guardadas.splice(index, 1);
  localStorage.setItem("actividades", JSON.stringify(guardadas));
  mostrarActividadesAdmin();
}

// ---------------- MOSTRAR EN PORTAFOLIO ----------------
function mostrarActividades() {
  const contenedor = document.getElementById("cards-container");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  let actividades = getActividades();

  actividades.forEach((act) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${act.nombre}</h4>
      <a class="btn-ver" href="pdfs/${act.archivo}" target="_blank">Ver</a>
      <a class="btn-descargar" href="pdfs/${act.archivo}" download>Descargar</a>
    `;

    contenedor.appendChild(card);
  });
}

// ---------------- MOSTRAR EN ADMIN ----------------
function mostrarActividadesAdmin() {
  const contenedor = document.getElementById("admin-cards-container");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  let actividades = getActividades();

  actividades.forEach((act, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${act.nombre}</h4>
      <a class="btn-ver" href="pdfs/${act.archivo}" target="_blank">Ver</a>
      <a class="btn-descargar" href="pdfs/${act.archivo}" download>Descargar</a>
      ${
        index >= baseActividades.length
          ? `<button class="btn-eliminar" onclick="eliminarActividad(${index -
              baseActividades.length})">Eliminar</button>`
          : ""
      }
    `;

    contenedor.appendChild(card);
  });
}

// ---------------- CARGAR ----------------
window.onload = () => {
  mostrarActividades();
  mostrarActividadesAdmin();
};
