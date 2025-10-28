const ADMIN_USER = "leonardo";
const ADMIN_PASS = "cotera2004";
let editIndex = -1; // Para saber si estamos editando

// ---------------- LISTA BASE DE ACTIVIDADES ----------------
// Estas son las iniciales, luego se mezclan con lo que guardes en localStorage
const baseActividades = [
  {
    nombre: "Semana 01",
    archivo: "CoteraArrietaLeonardo_Fundamentos_de_un_proyecto_final.pdf"
  },
  {
    nombre: "Semana 02",
    archivo: "PROYECTO DE APLICACIÓN PROFESIONAL_20250919_195046_0000.pdf"
  },
  {
    nombre: "Semana 02 TAP",
    archivo: "Coopac Dac_Proyecto Final.pdf"
  },
  {
    nombre: "Semana 03",
    archivo: "Sistema_Evaluacion_Proyectos_Investigacion_ Version_02 (1).pdf"
  }
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
    alert(
      "Debes escribir un nombre y el nombre exacto del PDF subido en /pdfs/"
    );
    return;
  }

  const actividad = { nombre, archivo };
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

// ---------------- MOSTRAR EN PORTAFOLIO (CON ICONOS PDF) ----------------
function mostrarActividades() {
  const contenedor = document.getElementById("cards-container");
  if (!contenedor) return;
  
  let actividades = getActividades();
  
  if (actividades.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-actividades">
        <i class="fas fa-file-pdf"></i>
        <h3>No hay actividades aún</h3>
        <p>Agrega tus primeras actividades desde el panel de administración.</p>
      </div>
    `;
    return;
  }
  
  contenedor.innerHTML = "";
  actividades.forEach((act, index) => {
    const card = document.createElement("div");
    card.className = "actividad-card";
    card.innerHTML = `
      <i class="fas fa-file-pdf pdf-icon"></i>
      <h3><i class="fas fa-calendar-week"></i> ${act.nombre}</h3>
      <p>Actividad de proyecto de aplicación profesional</p>
      <div class="actividad-acciones">
        <a href="pdfs/${act.archivo}" target="_blank" class="accion-btn ver-btn">
          <i class="fas fa-eye"></i> Ver
        </a>
        <a href="pdfs/${act.archivo}" download class="accion-btn descargar-btn">
          <i class="fas fa-download"></i> Descargar
        </a>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// ---------------- MOSTRAR EN ADMIN (CON ICONOS PDF) ----------------
function mostrarActividadesAdmin() {
  const contenedor = document.getElementById("admin-cards-container");
  if (!contenedor) return;
  
  let actividades = getActividades();
  
  if (actividades.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-actividades">
        <i class="fas fa-file-pdf"></i>
        <h3>No hay actividades aún</h3>
        <p>Comienza agregando una nueva actividad.</p>
      </div>
    `;
    return;
  }
  
  contenedor.innerHTML = "";
  actividades.forEach((act, index) => {
    const card = document.createElement("div");
    card.className = "actividad-card";
    card.innerHTML = `
      <i class="fas fa-file-pdf pdf-icon"></i>
      <h3><i class="fas fa-calendar-week"></i> ${act.nombre}</h3>
      <p>Actividad de proyecto de aplicación profesional</p>
      <div class="actividad-acciones">
        <a href="pdfs/${act.archivo}" target="_blank" class="accion-btn ver-btn">
          <i class="fas fa-eye"></i> Ver
        </a>
        <a href="pdfs/${act.archivo}" download class="accion-btn descargar-btn">
          <i class="fas fa-download"></i> Descargar
        </a>
        ${
          index >= baseActividades.length
            ? `<button class="btn-eliminar" onclick="eliminarActividad(${index - baseActividades.length})">Eliminar</button>`
            : ""
        }
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// ---------------- CARGAR ----------------
window.onload = () => {
  // Verificar si estamos en la página de portafolio
  if (document.getElementById("cards-container")) {
    mostrarActividades();
  }
  
  // Verificar si estamos en la página de administración
  if (document.getElementById("admin-cards-container")) {
    mostrarActividadesAdmin();
  }
};


