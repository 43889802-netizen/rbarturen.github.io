/* =========================================
   1. AGREGAR PRODUCTOS AL CARRITO
   ========================================= */
function agregarAlCarrito(nombre, precio, imagen) {
    // Obtenemos el carrito de LocalStorage o creamos uno vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Agregamos el producto con un ID único para poder borrarlo después
    carrito.push({
        id: Date.now(), 
        nombre: nombre,
        precio: parseFloat(precio),
        imagen: imagen
    });
    
    // Guardamos en LocalStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✅ Se agregó al carrito correctamente");
}

/* =========================================
   2. MOSTRAR PRODUCTOS EN LA PÁGINA DEL CARRITO
   ========================================= */
function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    
    if (!lista) return; // Si no estamos en la página del carrito, salimos

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;
    lista.innerHTML = ""; // Limpiar antes de renderizar

    if (carrito.length === 0) {
        lista.innerHTML = "<li>Tu carrito está vacío.</li>";
    } else {
        carrito.forEach(producto => {
            let li = document.createElement("li");
            li.className = "item-carrito"; // Usamos la clase definida en el CSS
            
            li.innerHTML = `
                <img src="${producto.imagen}" width="50" style="border-radius: 5px;">
                <div style="flex-grow: 1; margin-left: 20px;">
                    <strong>${producto.nombre}</strong><br>
                    S/ ${producto.precio.toFixed(2)}
                </div>
                <button onclick="eliminarDelCarrito(${producto.id})" class="btn-quitar">
                    Quitar
                </button>
            `;
            lista.appendChild(li);
            total += producto.precio;
        });
    }
    
    // Actualizamos el total en pantalla con 2 decimales
    if (totalElemento) {
        totalElemento.textContent = "Total: S/ " + total.toFixed(2);
    }
}

/* =========================================
   3. FUNCIONES DE LOS BOTONES (VACIAR Y QUITAR)
   ========================================= */
// Función para el botón "Quitar" de un solo producto
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para el botón "Vaciar carrito"
function vaciarCarrito() {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        renderizarCarrito(); // Actualiza la vista para que salga vacío
    }
}

/* =========================================
   4. REDIRECCIÓN AL PAGO
   ========================================= */
// Función para el botón "Continuar al pago"
function irAPagar() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
        return;
    }
    
    // Redirige al archivo de pago (Asegúrate que el nombre coincida: PAGO.HTML)
    window.location.href = "PAGO.HTML"; 
}

/* =========================================
   5. INICIALIZACIÓN
   ========================================= */
// Ejecuta el renderizado apenas cargue la página
document.addEventListener("DOMContentLoaded", renderizarCarrito);