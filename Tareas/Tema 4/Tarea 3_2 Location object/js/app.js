//! 1. Abre una nueva ventana con una URL aleatoria. Cambia su URL una vez abierta.
document.getElementById("abrirUrl").addEventListener("click", (evento) => {
    let url = "https://www.google.es";
    location.href = url;
});

//! 2. Recarga esta URL utilizando el contenido en caché.
document.getElementById("recargar").addEventListener("click", (evento) => {
    location.reload(location.href);
});

//! 3. Imprime información sobre la URL: protocolo, nombre de host, host y puerto.
console.log("Protocolo: " + location.protocol);
console.log("Nombre del host: " + location.hostname);
console.log("Host: " + location.host);
console.log("Puerto: " + location.port);