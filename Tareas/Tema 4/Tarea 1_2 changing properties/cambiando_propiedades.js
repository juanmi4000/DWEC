function modificar() {
    //! Degradar la equiqueta h1 a una h2
    let h1 = document.getElementById("titulo1");
    let h2 = document.createElement("h2");
    h2.id = "mih2";
    let padre = document.getElementsByTagName("header")[0];
    h2.innerHTML = h1.innerHTML;
    padre.replaceChild(h2, h1);

    //! Reemplazar solo el contenido de la etiqueta h2 con un nuevo texto
    let myh2 = document.getElementById("mih2");
    myh2.innerHTML = "Pepito Grillo es verde";

    //! Modificar la fuente y las propiedades alt de la primera imagen
    let imagen = document.querySelector("img:first-of-type");
    imagen.alt = "Un gatito lindo pero modificado el alt";

    //! Reemplazar el texto de cualquier etiqueta p con "Hola, soy un párrafo"
    let parrafos = document.querySelectorAll("p");
    parrafos.forEach(elemento => {
        elemento.innerHTML = "Hola, soy un párrafo";
    });

    //! Modificar el texto de la segunda imagen --> no ha salido
    let imagen2 = document.querySelector("img:nth-child(2)");
    imagen2.alt = "Un lindo perrito pero modificado";

    //! Asignar una propiedad no estándar al body llamada info-fecha y asignar la fecha de hoy
    document.body.info_fecha = new Date();

    //! Modificar el texto alternativo de la primera imagen
    /* let imagen = document.getElementsByTagName("img:first-of-type");
    imagen.alt = "Un gatito lindo pero modificado el alt por segunda vez"; */

    //! Mostrar en la consola todas las propiedades de la primera imagen
    /* let imagen = document.querySelector("img:first-of-type"); */
    let propiedadesImagen1 = imagen.getAttributeNames();
    console.log(propiedadesImagen1);

    //! Cambiar la propiedad "size" de la última imagen (después de verificar que exista) 
    let ultimaImagen = document.querySelector("img:last-of-type");
    if (!ultimaImagen.hasAttribute("size")) {
        ultimaImagen.size = "50px"
    }

    //! Agregar un id="ultima_imagen" a la última imagen
    ultimaImagen.id = "ultima_imagen";

    //! Agregar un atributo tipo="parrafo" a todas las etiquetas p
/*     let parrafos = document.querySelectorAll("p"); */
    parrafos.forEach(elemento => {
        elemento.tipo = "parrafo";
    });

    //! Agregar un texto a cada elemento de la lista (debe ser escalable)
    let lista = document.getElementById("lista");
    lista.childNodes.forEach((elemento, texto = "hola") => {
        if (elemento.nodeType == "li") {
            elemento.textContent += texto;
        }
    });

    //! Agregar un párrafo después del último elemento con un texto que cuente el número de elementos en la lista
    let parr = document.createElement("p");
    parr.innerHTML = "La lista tiene un total de elementos: " + lista.childNodes.length;
    document.body.insertAdjacentElement("beforeend", parr);


    //! Agregar un párrafo, al final del documento, que contenga cuántas clases tiene el último párrafo del primer artículo y sus nombres
    let parrafoContador = document.createElement("p");
    let ultimoParrafo = document.querySelector("p:last-of-type");
    parrafoContador.id = "parrafo_contador";
    document.body.insertAdjacentElement("beforeend", parrafoContador);

    //! Agregar dos clases al párrafo anterior: "clase1" y "clase2"
    parrafoContador.classList.add("clase1", "clase2");


    //! Eliminar la última clase creada
    parrafoContador.classList.remove(parrafoContador.classList.length - 1);

    //! Agregar un atributo booleano a la primera imagen
    imagen[0].toggleAttribute("hidden");


}

