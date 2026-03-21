// Cargar productos en el carrito
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
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.padding = "10px";
            li.style.borderBottom = "1px solid #ddd";

            li.innerHTML = `
                <img src="${producto.imagen}" width="50" style="border-radius: 5px;">
                <div style="flex-grow: 1; margin-left: 15px;">
                    <strong>${producto.nombre}</strong><br>
                    S/ ${producto.precio.toFixed(2)}
                </div>
                <button onclick="eliminarDelCarrito(${producto.id})" 
                        style="background: #ff4d4d; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer;">
                    Quitar
                </button>
            `;
            lista.appendChild(li);
            total += producto.precio;
        });
    }
    
    if (totalElemento) totalElemento.textContent = "Total: S/ " + total.toFixed(2);
}

// Botón Vaciar Carrito
function vaciarCarrito() {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        renderizarCarrito();
    }
}

// Botón Ir a Pagar
function irAPagar() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    window.location.href = "PAGO.HTML"; 
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);