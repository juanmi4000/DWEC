let usuarios;

cargarUsuarios().then(data => {
  usuarios = data;
});

document.getElementById("sct-iniRegis").addEventListener("click", (evento) => {
    switch (evento.target.id) {
        case 'iniciar':
            let usuario = document.getElementById("inputCorreo").value;
            let contra = document.getElementById("inputContra").value;
            comprobarUsuarios(usuarios, usuario, contra);
            break;
        case 'btn-registrarse':
            document.getElementById("iniciarSesion").classList.add("hidden");
            let regis = document.getElementById("registrarse");
            regis.classList.remove("hidden");
            break;
    
        default:
            break;
    }
});


document.getElementById("registrarse").addEventListener("change", (evento) => {
    let nombre, apellidos, correo, telefono, dni, edad;
    switch (evento.target.id) {
        case 'nombre':
            let er_nombre = /^[A-Z][a-z]+( [A-Z]+[a-z]+)?/;
            nombre = evento.target;
            apellidos = document.getElementById("apellidos");
            comprobarInput(er_nombre, nombre, apellidos);
            break;
        case 'apellidos':
            let er_apellidos = /^[A-Z][a-z]+( [A-Z][a-z]+)?/;
            apellidos = evento.target;
            correo = document.getElementById("correo");
            comprobarInput(er_apellidos, apellidos, correo);
            break;
        case 'correo':
            let er_correo = /^[a-z][a-z0-9_]{3,}@[a-z]{3,}.[a-z]{2,3}/;
            correo = evento.target;
            telefono = document.getElementById("telefono");
            comprobarInput(er_correo, correo, telefono);
            break;
        case 'telefono':
            let er_telefono = /^(6|9)[0-9]{8}/;
            telefono = evento.target;
            dni = document.getElementById("dni");
            comprobarInput(er_telefono, telefono, dni);
            break;
        case 'dni':
            let er_dni = /[0-9]{8}[A-Z]{1}/;
            dni = evento.target;
            edad = document.getElementById("edad");
            comprobarInput(er_dni, dni, edad);
            break;
        case 'edad':
            let er_edad = /[0-9]{1,2}/;
            edad = evento.target;
            let boton = document.getElementById("btn-registrarse");
            comprobarInput(er_edad, edad, boton);
            break;
    }
});

let formularios = document.querySelectorAll("form");
for (let formu of formularios) {
    formu.addEventListener("submit", (evento) => {
        evento.preventDefault();
    });
}




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
        window.open("./html/inicio.html")
        /* location.href = "./html/inicio.html"; */
    } else {
        let parrafo = document.getElementById("error");
        parrafo.textContent = "El usuario no está registrado";
        document.querySelector("a").insertAdjacentElement("afterend", parrafo);
    }
}

function comprobarInput(expresion, valor_input, hermano) {
    if (expresion.test(valor_input.value)) {
        if (valor_input.classList.contains("border-black")) {
            valor_input.classList.add("border-green-500");
            valor_input.classList.remove("border-black");
        }

        if (valor_input.classList.contains("border-red-500")){
            valor_input.classList.remove("border-red-500");
            valor_input.classList.add("border-green-500");
        }

        hermano.disabled = false;
        console.log(hermano.tagName);
        if (hermano.tagName != "BUTTON") {
            hermano.classList.remove("bg-slate-300", "placeholder:text-slate-700");
        } else {
            hermano.classList.remove("bg-slate-300", "text-slate-700");
            hermano.classList.add("bg-blue-500", "hover:bg-blue-800", "text-white");
        }
        
    } else {
        valor_input.classList.add("border-red-500");
        valor_input.classList.remove("border-black");
    }
}

function registrarse() {

}

function habilitar() {

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