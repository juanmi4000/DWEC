//! Crea una página web que permita:
//! 1. Abrir una nueva ventana después de haber preguntado previamente al usuario por la URL. Debe tardar 4 segundos en abrirla.
let window_ID;
document.getElementById("abrirURL").addEventListener("click", (evento) => {
    let url = prompt("Introduce la url: ");
    setTimeout(() => {
        window_ID = window.open(url, "_blank", "resizable");
    }, 4000);
});

//! 2. Cambiar el tamaño de la ventana previamente abierta, después de haber preguntado previamente al usuario por el nuevo tamaño.
document.getElementById("cambiarTamano").addEventListener("click", (evento) => {
    let anchura = parseInt(prompt("introduce la anchura: "));
    let altura = parseInt(prompt("Introduce la altura: "));
    window_ID.resizeTo(anchura, altura);
});

//! 3. Cerrar la ventana recién abierta con un botón.
document.getElementById("cerrarVentana").addEventListener("click", (evento) => {
    window_ID.close();
});

//! 4. Abrir nuevamente una nueva ventana y crear una función que pregunte al usuario por un tiempo en segundos. Mostrar el recuento descendente y cuando llegue a 0, cerrar la última ventana abierta.
document.getElementById("abrirVentana").addEventListener("click", (evento) => {
    let url = prompt("Introduce la url: ");
    let tiempo = parseInt(prompt("Introduce los segundos para la ventana: "));
    let window_ID2 = window.open(url, "_blank", "resizable");
    let interval_ID = setInterval((tiempo) => {
        tiempo--;
        document.getElementById("contador").textContent = `Quedan ${tiempo} para cerrar la ventana`
        if (tiempo <= 0) {
            window_ID2.close();
            clearInterval(interval_ID);
        }
    }, 1000, tiempo);
});