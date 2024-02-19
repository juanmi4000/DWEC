//! Crear un botón que, al presionarlo, cambie su color de fondo y elimine su eventlistener.
let botonCambiaColor = document.getElementById("botonFondo");
botonCambiaColor.addEventListener("click", cambiaColor);

function cambiaColor(evento){
    botonCambiaColor.style.backgroundColor = "#000";
    botonCambiaColor.style.color = "#fff"; 
    botonCambiaColor.removeEventListener("click", cambiaColor);
}

//! Crear tres botones como grupo y asignarles un event listener utilizando un objeto:
//!     - El primero debe ocultar/mostrar un texto debajo de sí mismo.
//!     - El segundo debe mostrar una ventana con cualquier texto.
//!     - El tercero debe mostrar en la consola un texto aleatorio.
document.getElementById("tresBotones").addEventListener("click", (evento) => {
    switch (evento.target.id) {
        case 'boton1':
            document.querySelector("p").classList.toggle("dp-none");
            break;
        case 'boton2':
            alert("Ventana con un texto cualquiera");
            break;
        case 'boton3':
            console.log("Un texto aleatorio");
            break;
    }
});



//! Crear un cuadro con un encabezado, algún texto y un botón que cierre el cuadro.
document.getElementById("crearEncabazado").addEventListener("click", (evento) => {
    let header = document.createElement("header");
    let h3 = document.createElement("h3");
    h3.textContent = "HEADER";
    header.appendChild(h3);
    let cerrarBoton = document.createElement("button");
    cerrarBoton.textContent = "Cerrar cabecera";
    header.appendChild(cerrarBoton);
    cerrarBoton.addEventListener("click", elimarCabecera);
    document.body.insertAdjacentElement("afterbegin", header);
    document.getElementById("crearEncabazado").classList.add("dp-none");

    function elimarCabecera(evento){
        document.querySelector("header").remove();
        document.getElementById("crearEncabazado").classList.remove("dp-none");
        
    }
});
