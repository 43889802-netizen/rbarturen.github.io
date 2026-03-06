function agregarAlCarrito(nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        imagen: imagen
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("🛒 Producto agregado al carrito");
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.filter(producto => producto.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload(); 
}