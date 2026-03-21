// Agregar producto al almacenamiento local
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

// Dibujar los productos en la lista del carrito
function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    if (!lista) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;
    lista.innerHTML = "";

    carrito.forEach(producto => {
        let li = document.createElement("li");
        li.className = "item-carrito";
        li.innerHTML = `
            <img src="${producto.imagen}" width="50">
            <div style="flex-grow: 1; margin-left: 20px;">
                <strong>${producto.nombre}</strong><br>
                S/ ${producto.precio.toFixed(2)}
            </div>
            <button onclick="eliminarDelCarrito(${producto.id})" class="btn-quitar">Quitar</button>
        `;
        lista.appendChild(li);
        total += producto.precio;
    });

    if (totalElemento) totalElemento.textContent = "Total: S/ " + total.toFixed(2);
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);