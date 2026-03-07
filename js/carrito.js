function agregarAlCarrito(nombre, precio, imagen) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        imagen: imagen
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("🛒 Carrito");
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
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.margin = "10px 0";
            li.style.borderBottom = "1px solid #ddd";
            li.style.padding = "10px";

            li.innerHTML = `
                <img src="${producto.imagen}" width="50">
                <div style="flex-grow: 1; margin-left: 20px;">
                    <strong>${producto.nombre}</strong><br>
                    S/ ${producto.precio}
                </div>
                <button onclick="eliminarDelCarrito(${producto.id})" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer;">
                    Quitar
                </button>
            `;
            lista.appendChild(li);
            total += producto.precio;
        });
    }
    totalElemento.textContent = "Total: S/ " + total;
}


function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(); 
}


function vaciarCarrito() {
    if(confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        renderizarCarrito();
    }
}


function irAPagar() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        
        window.location.href = "PAGO.HTML"; 
    }
}


document.addEventListener("DOMContentLoaded", renderizarCarrito);