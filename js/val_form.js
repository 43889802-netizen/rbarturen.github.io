/*confirmancion de envio correcto de correo*/
const correo = document.getElementById("correo");

correo.addEventListener("input", function(){

    if(correo.validity.valid){
        /*agrega y quita la clase*/
        correo.classList.remove("error");  
        correo.classList.add("correcto");
    }else{
        correo.classList.remove("correcto");
        correo.classList.add("error");
    }

});

/*confirmancion de enviuo correctro de datos*/
const form = document.getElementById("form-contacto");
const mensaje = document.getElementById("mensaje-envio");

form.addEventListener("submit", function(e){
e.preventDefault();
});

/*animacion al boton de wsp*/
const botonFloat = document.getElementById("whatsapp-float");

window.addEventListener("scroll", function(){
if(window.scrollY > 300){
    botonFloat.style.display = "block";
}else{
    botonFloat.style.display = "none";
}

});