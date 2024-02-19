// recupero el elemento cuyo id es parrafo2
let segundoParrafo = document.getElementById("parrafo2");
console.log(segundoParrafo);

// recupero el elemento cuya etiqueta es title
let titulo = document.getElementsByTagName("title");
console.log(titulo);

// recupero el primer elemento section del fichero
let seccionUno = document.querySelector("section");
console.log(seccionUno);

// recupero todos los elementos que tenga las clase parrafo_cuerpo
let parrafosCuerpos = document.getElementsByClassName("parrafo_cuerpo");
console.log(parrafosCuerpos);

// recupero el elemento con ID apellidos
let apellidos = document.getElementById("apellidos");
console.log(apellidos);

// es la misma que la anterior por eso pongo 2
let seccionUno2 = document.querySelector("section");
console.log(seccionUno2);

// recupero todas las secciones y muestro solo la última aunque todasSecciones[-1] debería funcionar pero en este caso al parecer no  
let todasSecciones = document.querySelectorAll("section");
console.log(todasSecciones[todasSecciones.length - 1]);

// recupero todos los párrafos
let todosParrafos = document.querySelectorAll("p");
console.log(todosParrafos);
