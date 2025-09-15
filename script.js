const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

let editIndex = -1; // Para saber si estamos editando

// ---------------- LOGIN ----------------
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    mostrarActividadesAdmin();
  } else {
    document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos";
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
  const archivo = document.getElementById("actividad-archivo").files[0];

  if (!nombre) {
    alert("Por favor escribe un nombre.");
    return;
  }

  let actividades = JSON.parse(localStorage.getItem("actividades")) || [];

  if (editIndex === -1) {
    // Nueva actividad
    if (!archivo) {
      alert("Por favor selecciona un archivo PDF.");
      return;
    }

    const actividad = { 
      nombre, 
      archivo: archivo.name,
      url: "pdfs/" + archivo.name 
    };
    actividades.push(actividad);
    alert("Actividad agregada correctamente");
  } else {
    // Editar actividad existente
    actividades[editIndex].nombre = nombre;

    if (archivo) {
      actividades[editIndex].archivo = archivo.name;
      actividades[editIndex].url = "pdfs/" + archivo.name;
    }

    alert("Actividad actualizada correctamente");
    editIndex = -1; // Salimos del modo edición
    document.querySelector("#admin-form h3").textContent = "Agregar Nueva Actividad";
    document.querySelector("#admin-form button").textContent = "Guardar";
  }

  localStorage.setItem("actividades", JSON.stringify(actividades));

  document.getElementById("actividad-nombre").value = "";
  document.getElementById("actividad-archivo").value = "";

  mostrarActividadesAdmin();
}

// ---------------- EDITAR ACTIVIDAD ----------------
function editarActividad(index) {
  let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  const act = actividades[index];

  document.getElementById("actividad-nombre").value = act.nombre;
  document.getElementById("actividad-archivo").value = "";

  editIndex = index;

  // Cambiamos el texto del formulario para indicar modo edición
  document.querySelector("#admin-form h3").textContent = "Editar Actividad";
  document.querySelector("#admin-form button").textContent = "Actualizar";
}

// ---------------- MOSTRAR EN PORTAFOLIO ----------------
function mostrarActividades() {
  const contenedor = document.getElementById("cards-container");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  let actividades = JSON.parse(localStorage.getItem("actividades")) || [];

  actividades.forEach((act) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${act.nombre}</h4>
      <button class="btn-ver" onclick="verPDF('${act.archivo}')">Ver</button>
      <button class="btn-descargar" onclick="descargarPDF('${act.archivo}')">Descargar</button>
    `;

    contenedor.appendChild(card);
  });
}

// ---------------- MOSTRAR EN ADMIN ----------------
function mostrarActividadesAdmin() {
  const contenedor = document.getElementById("admin-cards-container");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  let actividades = JSON.parse(localStorage.getItem("actividades")) || [];

  actividades.forEach((act, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${act.nombre}</h4>
      <button class="btn-ver" onclick="verPDF('${act.archivo}')">Ver</button>
      <button class="btn-descargar" onclick="descargarPDF('${act.archivo}')">Descargar</button>
      <button class="btn-editar" onclick="editarActividad(${index})">Editar</button>
      <button class="btn-eliminar" onclick="eliminarActividad(${index})">Eliminar</button>
    `;

    contenedor.appendChild(card);
  });
}

// ---------------- ELIMINAR ACTIVIDAD ----------------
function eliminarActividad(index) {
  let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  actividades.splice(index, 1);
  localStorage.setItem("actividades", JSON.stringify(actividades));
  mostrarActividadesAdmin();
}

// ---------------- VER PDF ----------------
function verPDF(nombreArchivo) {
  window.open("pdfs/" + nombreArchivo, "_blank");
}

// ---------------- DESCARGAR PDF ----------------
function descargarPDF(nombreArchivo) {
  const link = document.createElement("a");
  link.href = "pdfs/" + nombreArchivo;
  link.download = nombreArchivo;
  link.click();
}
