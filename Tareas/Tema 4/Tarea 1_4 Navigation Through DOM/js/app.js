//! Incluir una nueva clase en el elemento padre de la imagen del gato.
let nodoPadreGato = document.getElementById("gato").parentNode;
nodoPadreGato.classList.add("insertar");

//! Incluir una nueva clase en cualquier hijo de la sección con ID "animales".
// inserto una clase, en uno de los elementos hijos
/* function insertarClaseAnimales(nuevaClase, elementoHijo) {
    let animales = document.getElementById("animales");
    let hijosAnimales = animales.children;
    for (let i = 0; i < hijosAnimales.length; i++) {
        if (hijosAnimales[i].tagName.toLowerCase() == elementoHijo.toLowerCase()) {
            hijosAnimales[i].classList.add(nuevaClase);
            console.log("Se ha insertado correntamente");
        }
    }
}

insertarClaseAnimales("nuevaClaseFuncion", "article"); */

// cambiar la nueva clase a todos los hijos
let animales = document.getElementById("animales");
let hijosAnimales = animales.children;
for (let i = 0; i < hijosAnimales.length; i++) {
    hijosAnimales[i].classList.add("nuevaClase");
}

//! Enumerar todos los hijos del formulario.
let formulario = document.querySelector("form");
let hijosFormulario = formulario.children;
for (let i = 0; i < hijosFormulario.length; i++) {
    hijosFormulario[i].classList.add("hijo-" + (i + 1));
}


//! Cambiar el texto del primer y del último elemento de la lista de compras.
let listaCompra = document.getElementById("listaCompra");
//? cuidado porque con firstChild y lastChild cuentan también espacios en blanco (#text) para que solo se escoja los elementos y se ignoren los espacios en blanco hay que usar firstElementChild y lastElementChild
listaCompra.firstElementChild.textContent = "Cambio el texto al primer hijo de la lista";
listaCompra.lastElementChild.textContent = "Cambio el texto al último hijo de la lista";


//! Cambiar el texto de la primer etiqueta del formulario.
let primeraEtiqueta = document.querySelector("form > label");
primeraEtiqueta.textContent = "Nombre cambiado";

//! Mostrar en la consola el tipo del nodo padre de la imagen del perro.
let nodoPadre = document.getElementById("perro");
console.log("El tipo es: " + nodoPadre.tagName.toLowerCase());

//! Mostrar en la consola el tipo del hermano anterior del artículo donde está el gato.
let articuloGato = document.getElementById("gato");
if (articuloGato.previousElementSibling != null) {
    console.log("El tipo es: " + articuloGato.previousElementSibling.tagName);
} else{
    console.log("No tiene un elemento hermano anterior");
}