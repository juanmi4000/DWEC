let usuarios;

cargarUsuarios().then(data => {
  usuarios = data;
});

let form = document.getElementById("formInicio");
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
});

document.getElementById("iniciar").addEventListener("click", () => {
    let usuario = document.getElementById("inputCorreo").value;
    let contra = document.getElementById("inputContra").value;
    comprobarUsuarios(usuarios, usuario, contra);
});

/* FUNCIONES */
async function cargarUsuarios() {
    let url = "https://fakestoreapi.com/users";
    const respuesta = await fetch(url);
    const arrUs = await respuesta.json();
    return arrUs;
}

function comprobarUsuarios(usuarios, usuario, contra) {
    let encontrado = false;
    usuarios.forEach(user => {
        if (user.email == usuario && user.password == contra) {
            document.cookie = `id=${user.id}`;
            encontrado = true;
        }
    });

    if (encontrado) {
        console.log("estoy en el if" );
        location.href = "./html/inicio.html";
    } else {
        let parrafo = document.getElementById("error");
        parrafo.textContent = "El usuario no está registrado";
        document.querySelector("a").insertAdjacentElement("afterend", parrafo);
    }
}


/* let usuarios = cargarUsuarios();

cargarUsuarios().then(data => {
    usuarios = data;
})

let form = document.getElementById("formInicio");
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
});

document.getElementById("iniciar").addEventListener("click", () => {
    let usuario = document.getElementById("inputCorreo").value;
    let contra = document.getElementById("inputContra").value;
    comprobarUsuarios(usuarios, usuario, contra);
});



/* FUNCIONES 
async function cargarUsuarios() {
    let url = "https://fakestoreapi.com/users";
    const usuarios = fetch(url);
    const respuesta = await usuarios; 
    let arrUs = await respuesta.json();
    return arrUs;
}

function comprobarUsuarios(usuarios, usuario, contra) {
    let encontrado = false;
    for (const user in usuarios) {
        if(user.email == usuario && user.password == contra) {
            document.cookie = `id=${user.id}`;
            encontrado = true;
        }
    }

    if (encontrado) {
        location.href = "./html/inicio.html";
    } else {
        let parrafo = document.getElementById("error");
        parrafo.textContent = "El usuario no está registrado";
        document.querySelector("a").insertAdjacentElement("afterend", parrafo);
    }
}  */