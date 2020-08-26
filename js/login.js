//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});

var boton = document.getElementById("bot");
var input = document.getElementById("inputPassword");

boton.addEventListener("click", mostrarContraseña);

function mostrarContraseña() {
    if (input.type == "password") {
        input.type = "text";
        boton.src = "img/ocultar.jpg";
    } else {
        input.type = "password";
        boton.src = "img/mostrar.jpg";
    }
};


var usuario = document.getElementById("inputUsuario");
var correo = document.getElementById("inputEmail");
var contra = document.getElementById("inputPassword");
var errorUsuario = document.getElementById("demo");
var errorCorreo = document.getElementById("demo1");
var errorContraseña = document.getElementById("demo2");

function validarForm() {

    var mensajeError = [];

    errorUsuario.innerHTML = "";
    errorCorreo.innerHTML = "";
    errorContraseña.innerHTML = "";

    mensajeError["Usuario"] = usuario.value === null || usuario.value === "";
    mensajeError["Correo"] = correo.value === null || correo.value === "";
    mensajeError["Contraseña"] = contra.value === null || contra.value === "";
    mensajeError["CantCaract"] = contra.value.length <= 6;

    if (mensajeError["Usuario"]) {
        errorUsuario.innerHTML = "Ingresa un nombre de usuario";
        usuario.style.borderColor = "red";
    } else {
        usuario.style.borderColor = "green";
    }

    if (mensajeError["Correo"]) {
        errorCorreo.innerHTML = "Ingresa el correo";
        correo.style.borderColor = "red";
    } else {
        correo.style.borderColor = "green";
    }

    if (mensajeError["Contraseña"]) {
        errorContraseña.innerHTML = "Ingresa la contraseña";
        contra.style.borderColor = "red";
    } else {
        if (mensajeError["CantCaract"]) {
            errorContraseña.innerHTML = "La contraseña debe tener mas de 6 caracteres";
            contra.style.borderColor = "red";
        } else {
            contra.style.borderColor = "green";
        }
    }


    return !mensajeError["Usuario"] && !mensajeError["Correo"] && !mensajeError["Contraseña"] && !mensajeError["CantCaract"];

};

/*function usuario() {

    var usuario2 = document.getElementById("inputUsuario").value;

    var miStorange = window.sessionStorage;
    miStorange.setItem("keyUsuario", usuario2);


    document.getElementById("user").innerHTML = miStorange.getItem("keyUsuario")
        //alert(miStorange.getItem("keyUsuario"))
};*/