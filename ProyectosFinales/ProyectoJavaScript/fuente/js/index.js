// variable globales

let usuarios;
let productos;
let limite = 0;

cargarUsuarios().then(data => {
    usuarios = data;
});

    
//! EVENTOS
document.getElementById("sct-iniRegis").addEventListener("click", (evento) => {
    switch (evento.target.id) {
        case 'iniciar':
            let usuario = document.getElementById("inputCorreo").value;
            let contra = document.getElementById("inputContra").value;
            let encontrado = comprobarUsuarios(usuarios, usuario, contra);
            if (encontrado) {
                document.getElementById("sct-iniRegis").classList.add("hidden");
                document.getElementById("principal").classList.remove("hidden");
                document.getElementById("principal").classList.add("flex", "flex-col", "m-4", "justify-center", "item");
                cargarProductos().then(data => {
                    productos = data;
                });
                console.log(productos);
                let seleccionado = document.querySelector("select");
                seleccionado.addEventListener('change', (evento) => {
                    let opcionSeleccionada = seleccionado.options[seleccionado.selectedIndex]; 
                    if (opcionSeleccionada.value == "tabla") {
                        const tabla = document.createElement("table");
                            
                    } else {
                        const ul = document.createElement("ul");
                        productos.forEach(producto => {
                            let li1 = document.createElement("li");
                            let li2 = li1.cloneNode();
                            let li3 = li1.cloneNode();
                            let img = document.createElement("img");
                            img.src = `${producto.image}`;
                            img.classList.add("w-96");
                            li1.appendChild(document.createTextNode(`${producto.title}`));
                            li2.appendChild(img);
                            li3.appendChild(document.createTextNode(`${producto.price}`));
                            ul.appendChild(li1);
                            ul.appendChild(li2);
                            ul.appendChild(li3);
                        });

                    }
                });
            }
            break;
        case 'btn-registrarse':
            document.getElementById("iniciarSesion").classList.add("hidden");
            let regis = document.getElementById("registrarse");
            regis.classList.remove("hidden");
            break;
        case 'btn-registrarse2':
            let cadena = "";
            let nombre = document.getElementById("nombre");
            let apellidos = document.getElementById("apellidos");
            let correo = document.getElementById("correo");
            let telefono = document.getElementById("telefono");
            let dni = document.getElementById("dni");
            let edad = document.getElementById("23");
            if (nombre.classList.contains("border-green-500") && apellidos.classList.contains("border-green-500") && correo.classList.contains("border-green-500") && telefono.classList.contains("border-green-500") && dni.classList.contains("border-green-500") && edad.classList.contains("border-green-500")) {

                if (localStorage.getItem(`${correo.value}`) == null) {
                    [nombre, apellidos, correo, telefono, dni, edad].forEach(element => {
                        cadena += element.value;
                    });
                    localStorage.setItem(`${correo.value}`, cadena);
                    alert("El usuario se ha registrado correctamente.\n Ususario: correo\nContraseña: dni");
                } else {
                    alert("Ese usuario ya existe.")
                }
            } else {
                alert("Lo sentimos algún valor no es correcto");
            }
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
            let boton = document.getElementById("btn-registrarse2");
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

async function cargarProductos() {
    limite += 5;
    if (limite < 20) {
        let url = `https://fakestoreapi.com/products?limit=${limite}`;
        const respuesta = await fetch(url);
        const arrPr = await respuesta.json();
        return arrPr;
    }
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
        return true;
    } else {
        alert("El usuario no está registrado");
        return false;
    }
}

function comprobarInput(expresion, valor_input, hermano) {
    if (expresion.test(valor_input.value)) {
        if (valor_input.classList.contains("border-black")) {
            valor_input.classList.add("border-green-500");
            valor_input.classList.remove("border-black");
        }

        if (valor_input.classList.contains("border-red-500")) {
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