function agregarAlCarrito(nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({
        id: Date.now(),
        nombre: nombre,
        precio: parseFloat(precio),
        imagen: imagen
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✅ Se agregó al carrito correctamente");
}

function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    if (!lista) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = "<li>Tu carrito está vacío.</li>";
    } else {
        carrito.forEach(producto => {
            let li = document.createElement("li");
            li.className = "item-carrito";
            li.innerHTML = `
                <img src="${producto.imagen}" width="50" style="border-radius: 5px;">
                <div style="flex-grow: 1; margin-left: 20px;">
                    <strong>${producto.nombre}</strong><br>
                    S/ ${producto.precio.toFixed(2)}
                </div>
                <button onclick="eliminarDelCarrito(${producto.id})" class="btn-quitar">Quitar</button>
            `;
            lista.appendChild(li);
            total += producto.precio;
        });
    }
    if (totalElemento) totalElemento.textContent = "Total: S/ " + total.toFixed(2);
}

/* =========================================
   ACCIONES DEL CARRITO
   ========================================= */
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function vaciarCarrito() {
    if (confirm("¿Deseas vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        renderizarCarrito();
    }
}

function irAPagar() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) return alert("El carrito está vacío.");
    window.location.href = "PAGO.HTML";
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);