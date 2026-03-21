/* =========================================
   1. AGREGAR PRODUCTOS AL CARRITO
   ========================================= */
function agregarAlCarrito(nombre, precio, imagen) {
    // Obtenemos el carrito actual de LocalStorage o creamos uno vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Agregamos el nuevo producto como un objeto
    carrito.push({
        id: Date.now(), // ID único basado en el tiempo
        nombre: nombre,
        precio: parseFloat(precio),
        imagen: imagen
    });
    
    // Guardamos de nuevo en LocalStorage convirtiéndolo a texto
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Mensaje de confirmación (el que cambiamos al inicio)
    alert("✅ Se agregó al carrito correctamente");
}

/* =========================================
   2. MOSTRAR PRODUCTOS EN EL CARRITO
   ========================================= */
function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    
    // Si no estamos en la página del carrito, no hacemos nada
    if (!lista) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;
    lista.innerHTML = ""; // Limpiamos la lista antes de dibujar

    if (carrito.length === 0) {
        lista.innerHTML = "<li>Tu carrito está vacío.</li>";
    } else {
        carrito.forEach(producto => {
            let li = document.createElement("li"); 
            
            // Creamos el contenido del producto
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
            
            // Sumamos al total acumulado
            total += producto.precio;
        });
    }
    
    // Mostramos el total con 2 decimales
    if (totalElemento) {
        totalElemento.textContent = "Total: S/ " + total.toFixed(2);
    }
}

/* =========================================
   3. ELIMINAR Y VACIAR
   ========================================= */
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    // Filtramos para quitar el producto con ese ID
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(); // Recargamos la lista
}

function vaciarCarrito() {
    if(confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
        localStorage.removeItem("carrito");
        renderizarCarrito();
    }
}

/* =========================================
   4. PROCESO DE PAGO
   ========================================= */
function irAPagar() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        // Redirige a la página de pago que creamos
        window.location.href = "PAGO.HTML"; 
    }
}

// Ejecutar automáticamente al cargar cualquier página que tenga este script
document.addEventListener("DOMContentLoaded", renderizarCarrito);