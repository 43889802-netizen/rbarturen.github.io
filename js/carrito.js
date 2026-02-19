function agregarAlCarrito(nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({
        nombre: nombre,
        precio: precio,
        imagen: imagen
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("🛒 Producto agregado al carrito");
}

