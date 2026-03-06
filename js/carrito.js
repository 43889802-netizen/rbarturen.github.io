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

    // Filtramos para dejar fuera el producto con el id que recibimos
    carrito = carrito.filter(producto => producto.id !== id);

    // Guardamos el nuevo carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Recargamos la lista para que el usuario vea que ya no está
    location.reload(); 
}