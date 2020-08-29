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
        boton.src = "img/eye-solid.svg";
    } else {
        input.type = "password";
        boton.src = "img/eye-slash-solid.svg";
    }
};

var usuario2 = document.getElementById("inputUsuario");
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
        usuario.style.backgroundColor = "rgb(255, 190, 190)";
    } else {
        usuario.style.borderColor = "green";
    }

    if (mensajeError["Correo"]) {
        errorCorreo.innerHTML = "Ingresa la dirección del correo";
        correo.style.borderColor = "red";
        correo.style.backgroundColor = "rgb(255, 190, 190)";
    } else {
        correo.style.borderColor = "green";
    }

    if (mensajeError["Contraseña"]) {
        errorContraseña.innerHTML = "Ingresa la contraseña";
        contra.style.borderColor = "red";
        contra.style.backgroundColor = "rgb(255, 190, 190)";
    } else {
        if (mensajeError["CantCaract"]) {
            errorContraseña.innerHTML = "La contraseña debe tener mas de 6 caracteres";
            contra.style.borderColor = "red";
            contra.style.backgroundColor = "rgb(255, 190, 190)";
        } else {
            contra.style.borderColor = "green";
        }
    }


    return !mensajeError["Usuario"] && !mensajeError["Correo"] && !mensajeError["Contraseña"] && !mensajeError["CantCaract"];

};

miStorage = window.sessionStorage;

function mostrarUsuario() {

    var usuario2 = document.getElementById("inputUsuario").value;
    miStorage.setItem("keyUsuario", usuario2);



    //document.getElementById("user1").innerHTML = miStorage.getItem("keyUsuario")
    //document.getElementById("user").innerHTML = miStorange.getItem("keyUsuario")
    //alert(miStorage.getItem("keyUsuario"));
};