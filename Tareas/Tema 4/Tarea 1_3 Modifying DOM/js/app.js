//! Crea una estructura temporal para almacenar la estructura creada en el siguiente paso.
let temporal = document.createDocumentFragment(); // <-- crea una estructura temporal

//! Crea una sección con tres hijos: un comentario y dos artículos. Cada uno debe tener un párrafo y un enlace a www.duckduckgo.com.
let seccion = document.createElement("section"); // <-- crea una sección
let comentario = document.createComment("Esto es un comentario");
let articulo1 = document.createElement("article");
// let articulo2 = documento.cloneNode(); --> también se puede hacer así
let articulo2 = document.createElement("article");
let p1 = document.createElement("p");
let p2 = document.createElement("p"); 
let a = document.createElement("a");
a.innerHTML = "duckduckgo";
a.target = "_blank";
a.href = "https://www.duckduckgo.com";
p1.appendChild(a);
p2.appendChild(a.cloneNode(true)); // --> tener cuidado porque si no se le pone true no copia el texto (al parecer es un hijo), solo el elemento
articulo1.appendChild(p1);
articulo2.appendChild(p2);
seccion.appendChild(articulo1);
seccion.appendChild(articulo2);
temporal.appendChild(comentario);
temporal.appendChild(seccion);




//! Adjunta la estructura temporal al DOM real.
document.body.appendChild(temporal);


//! Clona la sección anterior en una nueva.
let seccionNueva = seccion.cloneNode(); 


//! Elimina el contenido insertado en el paso 3.
seccionNueva.remove();

//! Verifica si la estructura temporal existe y está conectada al DOM.
alert(temporal.isConnected);

//! Conecta la estructura temporal al DOM.
document.body.appendChild(temporal);

//! Elimina todos los elementos de la lista marcados como vegetales.
let li = document.querySelectorAll("li");
li.forEach((elemento) => {
    if (elemento.classList.contains("verdura")) {
        elemento.remove();
    }
})

//! Sustituye el párrafo del primer artículo insertado en el paso 7 con el último párrafo del documento.
let parrafoSustituido = document.querySelector("article:first-of-type > p"); 
let parrafoSustituto = document.querySelector("p:last-of-type");
let padre = document.querySelector("article:first-of-type");
padre.replaceChild(parrafoSustituto, parrafoSustituido);

//! Inserta un párrafo después de cualquier imagen con el nombre del archivo.
let p = document.createElement("p");
p.innerHTML = document.title;
document.querySelectorAll("img").forEach((imagen) => {
    imagen.after(p.cloneNode(true));
});

//! Inserta un comentario antes de cualquier imagen.
let todasImagenes = document.querySelectorAll("img");
let comentario2 = document.createComment("Comentario antes de todas las imágenes");
todasImagenes.forEach(((imagen) => {imagen.before(comentario2.cloneNode(true)) }))

//! Inserta un párrafo antes del primer hijo y después del último hijo.
let seccion3 = document.querySelector("section");
let parra = document.createElement("p");
parra.textContent = "Párrafo antes del primer o después del último hijo";
seccion3.children[0].firstChild.before(parra);
seccion3.children[0].lastChild.after(parra);


//! Sustituye todo el contenido del primer artículo insertado en el paso 7.
let parr = document.createElement("p");
parr.innerHTML = "Soy un párrado para sustituir el artículo insertado en el paso 7";
let art = document.querySelector("section:last-of-type > article");
art.innerHTML = "";
art.append(parr);



//! Reemplaza, del contenido de cualquier artículo insertado en el paso 7, solo los párrafos.
let parrafoCambiar = document.createElement("p");
parrafoCambiar.textContent = "Cambio solo los párrafos";
let parrafos = document.querySelectorAll("section:last-of-type p");
parrafos.forEach((elemento) => {
    elemento.outerHTML = parrafoCambiar.outerHTML;
});

//! Inserta un texto descriptivo antes del artículo del gato. --> terminado
document.getElementById("gato").before("Imágen sobre un lingo gatito")


//! Inserta un mensaje agradable sobre los gatos después de su sección. --> terminado
document.querySelector("section:first-of-type").after("Un mensaje agradable después de la sección");

//! Sustituye la lista de compras mixta por dos listas: una para vegetales y otra para frutas.
let lista_compra = document.querySelector("#lista_compra").children;
let verduras = document.createElement("ul");
let frutas = document.createElement("ul"); 
for (let i = 0; i < lista_compra.length; i++) {
    let li = document.createElement("li");
    if (lista_compra[i].classList.contains("verdura")) {
        li.textContent = lista_compra[i].textContent;
        if (lista_compra[i].nextElementSibling != null) {
            if (lista_compra[i].nextElementSibling.tagName == "UL") {
                li.insertAdjacentElement("beforeend", lista_compra[i].nextElementSibling); /* Inserta el elemento antes que de se muestre el elemento */
            }   
        }
        verduras.appendChild(li);
    } else if (lista_compra[i].classList.contains("fruta")) {
        li.textContent = lista_compra[i].textContent;
        if (lista_compra[i].nextElementSibling != null) {
            if (lista_compra[i].nextElementSibling.tagName == "UL") {
                li.insertAdjacentElement("beforeend", lista_compra[i].nextElementSibling);
            }
        }
        frutas.appendChild(li);
    }
}

document.querySelector("#lista_compra").remove();
document.querySelector("#lista").appendChild(verduras);
document.querySelector("#lista").appendChild(frutas);


