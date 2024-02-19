let seccion = document.querySelector("section");
let articulo = document.querySelector("article");
let parrafo = document.querySelector("p");
let enlace = document.querySelector("a");

let ul = document.createElement("ul");

let todo = document.querySelectorAll("*");

for (let elemento of todo) {
    elemento.addEventListener("click", (evento) => {
        let li = document.createElement("li");
        li.innerHTML = "estoy en la fase de subida (burbujeo) " + evento.currentTarget.tagName + " y el evento fue lanzado por " + evento.target.tagName;
        ul.appendChild(li);
    });
    elemento.addEventListener("click", (evento) => {
        let li = document.createElement("li");
        li.innerHTML = "Estoy en la fase de captura " + evento.currentTarget.tagName + " y el evento fue lanzado por " + evento.target.tagName;
        ul.appendChild(li);
    }, {capture:true, once:true});
}
let contenido = document.getElementById("contenido");
let h2 = document.querySelector("h2");
h2.innerHTML = "Explicación del bubbling y el capture" 
contenido.appendChild(ul);
