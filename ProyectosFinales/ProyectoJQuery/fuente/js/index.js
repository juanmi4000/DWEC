//! Cuando cargue la página
$(() => {
    let pagina = 1;
    let arrayGeneral = [];
    let cargando = false;
    let ordRaza = 2;
    let ordCiudad = 2;
    let ordOrigen = 2;
    let ordPelaje = 2;
    let ordPatron = 2;
    cargarDatos(pagina).then(gatos => {
        gatos.forEach((gato) => {
            arrayGeneral.push(gato);
        });
        crearTabla(arrayGeneral);
        crearLista(arrayGeneral);
    });

    $(window).on("scroll", function(){
        //! $(window).scrollTop() --> Devuelve la cantidad de píxeles que el documento actualmente está desplazado verticalmente desde la parte superior
        //! $(window).height() --> Devuelve la altura de la ventana del navegador en píxeles
        //! $(document).height() --> Devuelve la altura total del documento, incluyendo el contenido visible y el contenido que está fuera de la vita y necesita ser desplazado para ser visto
        if(pagina <= 4 && !cargando && $(window).scrollTop() + $(window).height() >= $(document).height() - 10){
            cargando = true;
            pagina++;
            cargarDatos(pagina).then((gatos) => {
                gatos.forEach((gato) => {
                    arrayGeneral.push(gato);
                });
                crearTabla(arrayGeneral);
                crearLista(arrayGeneral);
                cargando = false;
            });   
        }
    });

    $("#selectPrincipal").on("change", (evento) => {
        switch ($("#selectPrincipal").val()) {
            case 'tabla':
                $("#mostrarLista").addClass("hidden");
                $("#mostrarTabla").removeClass("hidden");
                break;
            case 'lista':
                $("#mostrarLista").removeClass("hidden");
                $("#mostrarTabla").addClass("hidden");
                break;
        }
    });

    $("#selectSecundario").on("change", (evento) => {
        switch ($("#selectSecundario").val()) {
            case 'raza':
                ordRaza++;
                if (ordRaza % 2 == 0) {
                    crearLista(ordenarAsc(arrayGeneral, 'breed'));
                } else {
                    crearLista(ordenarDes(arrayGeneral, 'breed'));
                }
                break;
            case 'ciudad':
                ordCiudad++;
                if (ordCiudad % 2 == 0) {
                    crearLista(ordenarAsc(arrayGeneral, 'country'));
                } else {
                    crearLista(ordenarDes(arrayGeneral, 'country'));
                }
                break;
            case 'origen':
                ordOrigen++;
                if (ordOrigen % 2 == 0) {
                    crearLista(ordenarAsc(arrayGeneral, 'origin'));
                } else {
                    crearLista(ordenarDes(arrayGeneral, 'origin'));
                }
                break;
            case 'pelaje':
                ordPelaje++;
                if (ordPelaje % 2 == 0) {
                    crearLista(ordenarAsc(arrayGeneral, 'coat'));
                } else {
                    crearLista(ordenarDes(arrayGeneral, 'coat'));
                }
                break;
            case 'patron':
                ordPatron++;
                if (ordPatron % 2 == 0) {
                    crearLista(ordenarAsc(arrayGeneral, 'pattern'));
                } else {
                    crearLista(ordenarDes(arrayGeneral, 'pattern'));
                }
                break;
        }
    });

    $("main").on("click", (evento) => {
        switch (evento.target.id) {
            case 'cerrar':  
                $("#mostrarContenido").removeClass("hidden");
                $("#mostrarInfo").addClass("hidden");
                break;
            case 'ordenarRaza':
                ordRaza++;
                if (ordRaza % 2 == 0) {
                    crearTabla(ordenarAsc(arrayGeneral, 'breed'));
                } else {
                    crearTabla(ordenarDes(arrayGeneral, 'breed'));
                }
                break;
            case 'ordenarCiudad':
                ordCiudad++;
                if (ordCiudad % 2 == 0) {
                    crearTabla(ordenarAsc(arrayGeneral, 'country'));
                } else {
                    crearTabla(ordenarDes(arrayGeneral, 'country'));
                }
                break;
            case 'ordenarOrigen':
                ordOrigen++;
                if (ordOrigen % 2 == 0) {
                    crearTabla(ordenarAsc(arrayGeneral, 'origin'));
                } else {
                    crearTabla(ordenarDes(arrayGeneral, 'origin'));
                }
                break;
            case 'ordenarPelaje':
                ordPelaje++;
                if (ordPelaje % 2 == 0) {
                    crearTabla(ordenarAsc(arrayGeneral, 'coat'));
                } else {
                    crearTabla(ordenarDes(arrayGeneral, 'coat'));
                }
                break;
            case 'ordenarPatron':
                ordPatron++;
                if (ordPatron % 2 == 0) {
                    crearTabla(ordenarAsc(arrayGeneral, 'pattern'));
                } else {
                    crearTabla(ordenarDes(arrayGeneral, 'pattern'));
                }
                break;
        }
    });
});

async function cargarDatos(pagina) {
    let urlCatFact = `https://catfact.ninja/breeds?page=${pagina}`;
    let datos = await $.get(urlCatFact);
    return datos.data;
}

async function cargarDatosGato(raza) {
    let urlTheCat = `https://api.thecatapi.com/v1/breeds/search?q=${raza}`;
    let datos = await $.get(urlTheCat);
    return datos;
}

async function cargarDatosImagen(id){
    let urlImage = `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`;
    let datos = await $.get(urlImage);
    return datos;
}

function crearTabla(gatos) {
    const ojoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>`;
    const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg>`;
    const flechaAbajo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>`;
    const meGustaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>`;
    const noGustaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.80777 1.3934L21.1925 19.7782L19.7783 21.1924L16.0316 17.4454L12 21.485L3.52154 12.993C1.48186 10.7094 1.49309 7.24014 3.55524 4.96959L1.39355 2.80762L2.80777 1.3934ZM4.98009 11.6232L12 18.6543L14.6176 16.0314L4.97206 6.38623C3.67816 7.88265 3.67138 10.121 4.98009 11.6232ZM20.2428 4.75736C22.5054 7.02472 22.5831 10.637 20.4788 12.993L18.8442 14.629L17.4302 13.215L19.0202 11.6232C20.3937 10.0467 20.3191 7.66525 18.8271 6.1701C17.3281 4.66794 14.9078 4.60702 13.3371 6.01688L12.0021 7.21524L10.6662 6.01781C10.3163 5.70415 9.92487 5.46325 9.51117 5.29473L7.2604 3.04551C8.92926 2.83935 10.6682 3.33369 12.0011 4.52853C14.3502 2.42 17.9802 2.49 20.2428 4.75736Z"></path></svg>`;
    let tabla = $("<table>");
    let tr = $("<tr>");
    let i = 0;
    let orden = ["ordenarRaza", "ordenarCiudad","ordenarOrigen","ordenarPelaje","ordenarPatron"];
    let cabecera = ["Raza", "Ciudad", "Origen", "Pelaje", "Patrón","Opciones", "Ver información"];
    cabecera.forEach(elemento => {
        let th = $("<th>");
        th.text(elemento);
        insertarClases(th, "text-center");
        let span = $("<span>");
        span.html(flechaAbajo);
        insertarClases(span, "w-5","mx-1", "inline-block");
        if (i < cabecera.length) {
            th.attr("id", orden[i]); 
        }
        th.append(span);
        insertarClases(tr, "cursor-pointer"); 
        tr.append(th);
        i++;
    });
    tabla.append(tr);
    gatos.forEach((gato) => {        
        let tr2 = $("<tr>");
        let tdRaza = $("<td>");
        let tdCiudad = $("<td>");
        let tdOrigen = $("<td>");
        let tdPelaje = $("<td>");
        let tdPatron = $("<td>");
        let tdVerInfo = $("<td>");
        let tdOpciones = $("<td>");
        let spanFav = $("<span>");
        let spanGusta = $("<span>");
        let spanNoGusta = $("<span>");
        spanFav.addClass("fav");
        spanFav.html(favSvg + "<p>0</p>");
        insertarClases(spanFav, "w-7", "block", "cursor-pointer", "my-5", "text-center", "mx-auto");
        spanGusta.addClass("me-gusta");
        spanGusta.html(meGustaSvg + "<p>0</p>"); 
        insertarClases(spanGusta, "w-7", "block", "cursor-pointer", "my-5", "text-center", "mx-auto");
        spanNoGusta.addClass("no-me-gusta");
        spanNoGusta.html(noGustaSvg + "<p>0</p>");
        insertarClases(spanNoGusta, "w-7", "block", "cursor-pointer", "my-5", "text-center", "mx-auto");
        insertarClases(tdRaza, "text-center")
        tdRaza.text(gato.breed);
        insertarClases(tdCiudad, "text-center")
        tdCiudad.text(gato.country);
        insertarClases(tdOrigen, "text-center", "w-96");
        tdOrigen.text(gato.origin);
        insertarClases(tdPelaje, "text-center");
        tdPelaje.text(gato.coat);
        insertarClases(tdPatron, "text-center");
        tdPatron.text(gato.pattern);
        insertarClases(tdOpciones, "flex", "flex-col", "justify-center", "m-auto");
        tdOpciones.append(spanFav);
        tdOpciones.append(spanGusta);
        tdOpciones.append(spanNoGusta);
        tdVerInfo.append(`
            <span class='mostrar-info w-7 block cursor-pointer my-5 mx-auto text-center'>
                ${ojoSvg}
                <p class='hidden'>${gato.breed}</p>
            </span>
        `);
        tr2.append(tdRaza);
        tr2.append(tdCiudad);
        tr2.append(tdOrigen);
        tr2.append(tdPelaje);
        tr2.append(tdPatron);
        tr2.append(tdOpciones);
        tr2.append(tdVerInfo);
        insertarClases(tr2, "border-y", "hover:bg-blue-200", "transition", "ease-in", "duration-500");
        tabla.append(tr2);
    });
    insertarClases(tabla, "mx-5")
    let articulo = $("#mostrarTabla");
    articulo.html("");
    articulo.append(tabla);
    escuchadorFav();
    escuchadorMeGusta();
    escuchadorNoGusta();
    mostrarInformacionExtra();
}

function crearLista(gatos) {
    const ojoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>`;
    const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg>`;
    const meGustaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>`;
    const noGustaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.80777 1.3934L21.1925 19.7782L19.7783 21.1924L16.0316 17.4454L12 21.485L3.52154 12.993C1.48186 10.7094 1.49309 7.24014 3.55524 4.96959L1.39355 2.80762L2.80777 1.3934ZM4.98009 11.6232L12 18.6543L14.6176 16.0314L4.97206 6.38623C3.67816 7.88265 3.67138 10.121 4.98009 11.6232ZM20.2428 4.75736C22.5054 7.02472 22.5831 10.637 20.4788 12.993L18.8442 14.629L17.4302 13.215L19.0202 11.6232C20.3937 10.0467 20.3191 7.66525 18.8271 6.1701C17.3281 4.66794 14.9078 4.60702 13.3371 6.01688L12.0021 7.21524L10.6662 6.01781C10.3163 5.70415 9.92487 5.46325 9.51117 5.29473L7.2604 3.04551C8.92926 2.83935 10.6682 3.33369 12.0011 4.52853C14.3502 2.42 17.9802 2.49 20.2428 4.75736Z"></path></svg>`;
    const ul = $("<ul>");
    insertarClases(ul, "flex", "flex-wrap", "flex-1");
    gatos.forEach((gato) => {
        let li = $("<li>");
        insertarClases(li, "w-96", "border-b");
        li.append(`<p class='${gato.breed}'><strong>Raza: </strong>${gato.breed}</p>`);
        li.append(`<p><strong>Ciudad: </strong>${gato.country}</p>`);
        li.append(`<p><strong>Origen: </strong>${gato.origin}</p>`);
        li.append(`<p><strong>Pelaje: </strong>${gato.coat}</p>`);
        li.append(`<p><strong>Patrón: </strong>${gato.pattern}</p>`);
        li.append(`
            <div class='flex justify-evenly items-center mx-2'>
                <span class='fav w-7 block cursor-pointer my-5 text-center'>
                    ${favSvg}
                    <p>0</p>
                </span>
                <span class='me-gusta w-7 block cursor-pointer my-5 text-center'>
                    ${meGustaSvg}
                    <p>0</p>
                </span>
                <span class='no-me-gusta w-7 block cursor-pointer my-5 text-center'>
                    ${noGustaSvg}
                    <p>0</p>
                </span>
            </div>
        `);
        li.append(`
            <span class='mostrar-info w-7 block cursor-pointer my-5 mx-auto text-center'>
                ${ojoSvg}
                <p class='hidden'>${gato.breed}</p>
            </span>
        `);
        ul.append(li);
    });
    insertarClases(ul, "mx-7", "flex", "flex-wrap", "gap-5", "text-center", "flex-1", "basis-80", "justify-center");
    let div = $("#LisUl");
    div.html("");
    div.html(ul);
    escuchadorFav();
    escuchadorMeGusta();
    escuchadorNoGusta();
    mostrarInformacionExtra(); 
}

function insertarClases(elemento, ...clases) {
    clases.forEach((clase) => {
        elemento.addClass(clase);
    });
}

function escuchadorFav() {
    let spanFav = $(".fav");
    spanFav.each(function() {
        let parrafo = $(this).find("p:first");
        $(this).on("click", (evento) => {
            let valor = parseInt(parrafo.text());
            valor += 1;
            parrafo.text(`${valor}`);
        });
    });
}

function escuchadorMeGusta() {
    let spanMeGusta = $(".me-gusta");
    spanMeGusta.each(function() {
        let parrafo = $(this).find("p:first");
        $(this).on("click", (evento) => {
            let valor = parseInt(parrafo.text());
            valor += 1;
            parrafo.text(`${valor}`);
        });
    });
}

function escuchadorNoGusta() {
    let spanNoMeGusta = $(".no-me-gusta");
    spanNoMeGusta.each(function() {
        let parrafo = $(this).find("p:first");
        $(this).on("click", (evento) => {
            let valor = parseInt(parrafo.text());
            valor += 1;
            parrafo.text(`${valor}`);
        });
    });
}


function mostrarInformacionExtra() {
    let mostrarInfo = $(".mostrar-info");
    mostrarInfo.each(function() {
        $(this).on("click", (evento) => { 
            $("#mostrarContenido").addClass("hidden");
            $("#mostrarInfo").removeClass("hidden");
            let id = $(this).find("p:first").text();
            cargarDatosGato(id).then(datos => {
                if (datos.length != 0) {
                    $("#info-no-encontrada").addClass("hidden");
                    $("#info-encontrada").removeClass("hidden");
                    $("#nombre").text("");
                    $("#nombre").text(datos[0].name);
                    $("#tiempoVida").text("");
                    $("#tiempoVida").text(datos[0].life_span + " years");
                    $("#descripcion").text("");
                    $("#descripcion").text(datos[0].description);
                    $("#imagen").html("");
                    cargarDatosImagen(datos[0].id).then((imagen) => {
                        let img = $("<img>");
                        img.attr("src", imagen[0].url);
                        insertarClases(img, "rounded-3xl", "my-4");
                        $("#imagen").append(img);
                    });
                    cargarDatosImagen(datos[0].id).then((imagen) => {
                        let img = $("<img>");
                        img.attr("src", imagen[0].url);
                        insertarClases(img, "rounded-3xl", "my-4");
                        $("#imagen").append(img);
                    });
                    cargarDatosImagen(datos[0].id).then((imagen) => {
                        let img = $("<img>");
                        img.attr("src", imagen[0].url);
                        insertarClases(img, "rounded-3xl", "my-4");
                        $("#imagen").append(img);
                    });
                } else {
                    $("#info-no-encontrada").removeClass("hidden");
                    $("#info-encontrada").addClass("hidden");
                }
            }).catch((error) => {
                console.log(error);
            });
        });
    });
}


function ordenarAsc(gatos, propiedad) {
    let gatosOrdenados = gatos.sort((a, b) => {
        if (a[propiedad] < b[propiedad]) {
            return -1;
        }
        if (a[propiedad] > b[propiedad]) {
            return 1;
        }
        return 0;
    });
    return gatosOrdenados;
}

function ordenarDes(gatos, propiedad) {
    let gatosOrdenados = gatos.sort((a, b) => {
        if (a[propiedad] > b[propiedad]) {
            return -1;
        }
        if (a[propiedad] < b[propiedad]) {
            return 1;
        }
        return 0;
    });
    return gatosOrdenados;
}
