// variable globales
let usuarios;
let productos;
let limite = 5;
let carrito = [];
let indice = 1;

cargarUsuarios().then(data => {
    usuarios = data;
});


    
//! EVENTOS
window.onload = ocultarSegunCookies;


window.addEventListener('scroll', function() {
    // innerHeight --> proporciona la altura del área de visualización del navegador. No incluye las barras (desplazamiento y las de herramientas)
    // scrollY --> indica cuánto se ha desplazado verticalmente el usuario
    // offsetHeight --> proporciona la altura total del contenido de la página, incluyendo los elementos invisibles
    // la carga es muy rápida
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        conseguirMasProductos(); 
    }
}); 

document.getElementById("sct-iniRegis").addEventListener("click", (evento) => {
    switch (evento.target.id) {
        case 'iniciar':
            let usuario = document.getElementById("inputCorreo").value;
            let contra = document.getElementById("inputContra").value;
            let encontrado = comprobarUsuarios(usuarios, usuario, contra);
            if (encontrado) {
                //! No me lo hace
                //.open("http://localhost:1234/html/inicio.html");
                // location.href = "http://localhost:1234/html/inicio.html";
                document.getElementById("sct-iniRegis").classList.add("hidden");
                document.getElementById("principal").classList.remove("hidden");
                document.getElementById("principal").classList.add("flex", "flex-col", "m-4", "justify-center", "item");
                cargarProductos(limite).then(datos => {
                    datos = ordenarAsc(datos);
                    crearTabla(datos);
                    let seleccionado = document.querySelector("select");
                    seleccionado.addEventListener('change', (evento) => {
                        let opcionSeleccionada = seleccionado.options[seleccionado.selectedIndex]; 
                        if (opcionSeleccionada.value == "tabla") {
                            crearTabla(datos);
                        } else {
                            crearLista(datos);
                        }
                    });
                    
                }); 
            }
            break;
        case 'btn-registrarse':
            document.getElementById("iniciarSesion").classList.add("hidden");
            let regis = document.getElementById("registrarse");
            regis.classList.remove("hidden");
            break;
        case 'btn-registrarse2':
            let nombre = document.getElementById("nombre");
            let apellidos = document.getElementById("apellidos");
            let correo = document.getElementById("correo");
            let telefono = document.getElementById("telefono");
            let dni = document.getElementById("dni");
            let edad = document.getElementById("edad");
            if (nombre.classList.contains("border-green-500") && apellidos.classList.contains("border-green-500") && correo.classList.contains("border-green-500") && telefono.classList.contains("border-green-500") && dni.classList.contains("border-green-500") && edad.classList.contains("border-green-500")) {

                if (localStorage.getItem(`${correo.value}`) == null) {
                    let usuarioNuevo = {
                        nombre : nombre.value,
                        apellidos : apellidos.value,
                        correo : correo.value,
                        telefono : telefono.value,
                        dni : dni.value,
                        edad : edad.value,
                    }
                    localStorage.setItem(`${correo.value}`, JSON.stringify(usuarioNuevo));
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

document.getElementById("mostrar").addEventListener("click", (evento) => {
    switch (evento.target.id) {
        case 'ordenar':
            cargarProductos(limite).then(datos => {
                if (indice % 2 == 0) {
                    datos = ordenarDes(datos);
                } else {
                    datos = ordenarAsc(datos);
                }
                indice++;
                crearTabla(datos);
                let seleccionado = document.querySelector("select");
                seleccionado.addEventListener('change', (evento) => {
                    let opcionSeleccionada = seleccionado.options[seleccionado.selectedIndex]; 
                    if (opcionSeleccionada.value == "tabla") {
                        crearTabla(datos);
                    } else {
                        crearLista(datos);
                    }
                });
                
            });
            break;
    
        case '':
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
// Función para verificar si existe una cookie de sesión
function comprobarCookies() {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf("id=") == 0) {
            // Si la cookie de sesión existe, el usuario ha iniciado sesión antes
            return true;
        }
    }
    // Si no se encuentra la cookie de sesión, el usuario no ha iniciado sesión antes
    return false;
}

function ocultarSegunCookies() {
    if (comprobarCookies()) {
        let iniRegis = document.getElementById("sct-iniRegis");
        iniRegis.classList.add("hidden");
        let principal = document.getElementById("principal");
        principal.classList.remove("hidden");
        cargarProductos(limite).then(datos => {
            datos = ordenarAsc(datos);
            crearTabla(datos);
            let seleccionado = document.querySelector("select");
            seleccionado.addEventListener('change', (evento) => {
                let opcionSeleccionada = seleccionado.options[seleccionado.selectedIndex]; 
                if (opcionSeleccionada.value == "tabla") {
                    crearTabla(datos);
                } else {
                    crearLista(datos);
                }
            });
        });
    }
}

async function cargarUsuarios() {
    let url = "https://fakestoreapi.com/users";
    const respuesta = await fetch(url);
    const arrUs = await respuesta.json();
    return arrUs;
}


async function conseguirMasProductos() {
    if (limite < 20) {
        limite += 5;
        cargarProductos(limite).then(datos => {
            datos = ordenarAsc(datos);
            crearTabla(datos);
            let seleccionado = document.querySelector("select");
            seleccionado.addEventListener('change', (evento) => {
                let opcionSeleccionada = seleccionado.options[seleccionado.selectedIndex]; 
                if (opcionSeleccionada.value == "tabla") {
                    crearTabla(datos);
                } else {
                    crearLista(datos);
                }
            });
        });
    }
}

async function cargarProductos(limite) {  
    let url = `https://fakestoreapi.com/products?limit=${limite}`;
    const respuesta = await fetch(url);
    const arrPr = await respuesta.json()
    return arrPr;

}

function comprobarUsuarios(usuarios, usuario, contra) {
    let encontrado = false;
    usuarios.forEach(user => {
        if (user.email == usuario && user.password == contra) {
            let expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1); // Añado un día

            let expires = "expires=" + expirationDate.toUTCString();
            document.cookie = `id=${user.id};${expires}:path=/`;
            encontrado = true;
        }
    });

    let usuarioLocal = localStorage.getItem(usuario);

    if (usuarioLocal) {
        let usuarioEncontrado = JSON.parse(usuarioLocal);
        if (usuarioEncontrado.correo == usuario && usuarioEncontrado.dni == contra) {
            let expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1);
            let expires = "expires=" + expirationDate.toUTCString();
            document.cookie = `id=${usuario.correo};${expires}:path=/`;
            encontrado = true;   
        }
    }
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

function crearTabla(productos) {
    const tabla = document.createElement("table");
    let tr = document.createElement("tr");
    ["Ver","Categoría", "Nombre", "Imagen", "Precio", "Opciones"].forEach(elemento => {
        let th = document.createElement("th");
        th.textContent = elemento;
        if (elemento == "Categoría") {
            let flechaArriba = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg>`;
            let flechaAbajo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>`;
            let spam = document.createElement("span");
            if (indice % 2 == 0) {
                spam.innerHTML = flechaAbajo;
            } else {
                spam.innerHTML = flechaArriba;
            }
            
            insertarClases(spam, "w-5", "inline-block");
            th.id = "ordenar";
            th.appendChild(spam);
            insertarClases(th, "cursor-pointer", "flex", "justify-between", "item-center");

        }  
        tr.appendChild(th);
    });
    tabla.appendChild(tr);
    productos.forEach(producto => {
        let ojoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>`;
        let meGustaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>`;
        let noGustaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.80777 1.3934L21.1925 19.7782L19.7783 21.1924L16.0316 17.4454L12 21.485L3.52154 12.993C1.48186 10.7094 1.49309 7.24014 3.55524 4.96959L1.39355 2.80762L2.80777 1.3934ZM4.98009 11.6232L12 18.6543L14.6176 16.0314L4.97206 6.38623C3.67816 7.88265 3.67138 10.121 4.98009 11.6232ZM20.2428 4.75736C22.5054 7.02472 22.5831 10.637 20.4788 12.993L18.8442 14.629L17.4302 13.215L19.0202 11.6232C20.3937 10.0467 20.3191 7.66525 18.8271 6.1701C17.3281 4.66794 14.9078 4.60702 13.3371 6.01688L12.0021 7.21524L10.6662 6.01781C10.3163 5.70415 9.92487 5.46325 9.51117 5.29473L7.2604 3.04551C8.92926 2.83935 10.6682 3.33369 12.0011 4.52853C14.3502 2.42 17.9802 2.49 20.2428 4.75736Z"></path></svg>`;
        let anadirSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>`;
        let tr2 = document.createElement("tr");
        let tdVer = document.createElement("td");
        let tdTitulo = document.createElement("td");
        let tdCategoria = document.createElement("td");
        let tdImagen = document.createElement("td");
        let tdPrecio = document.createElement("td");
        let tdOpciones = document.createElement("td");
        let spanVer = document.createElement("span");
        spanVer.classList.add("ver");
        spanVer.innerHTML = ojoSvg;
        insertarClases(spanVer, "w-7", "cursor-pointer");
        let spanGusta = document.createElement("span");
        spanGusta.onclick = function () {return aumentar(this)};
        spanGusta.classList.add("me-gusta");
        spanGusta.innerHTML = meGustaSvg + "<p>0</p>";
        insertarClases(spanGusta, "w-7", "block", "cursor-pointer", "my-5", "text-center");
        let spanNoGusta = document.createElement("span");
        spanNoGusta.classList.add("no-me-gusta");
        spanNoGusta.innerHTML = noGustaSvg + "<p id='p-noGusta'>0</p>";
        insertarClases(spanNoGusta, "w-7", "block", "cursor-pointer", "my-5", "text-center");
        let spanAnadir = document.createElement("span");
        spanAnadir.innerHTML = anadirSvg;
        insertarClases(spanAnadir, "w-7", "block", "cursor-pointer", "my-5");
        let img = document.createElement("img");
        img.src = producto.image;
        img.classList.add("w-48", "rounded-3xl");
        tdVer.appendChild(spanVer);
        tdTitulo.textContent = producto.title;
        insertarClases(tdTitulo, "text-center");
        tdCategoria.textContent = `${producto.category}`;
        insertarClases(tdCategoria, "text-center");
        tdImagen.appendChild(img);
        tdPrecio.textContent = `${producto.price} €`;
        insertarClases(tdPrecio, "text-center", "w-24");
        tdOpciones.appendChild(spanGusta);
        tdOpciones.appendChild(spanNoGusta);
        tdOpciones.appendChild(spanAnadir);
        tr2.appendChild(tdVer);
        tr2.appendChild(tdCategoria);
        tr2.appendChild(tdTitulo);
        tr2.appendChild(tdImagen);
        tr2.appendChild(tdPrecio);
        tr2.appendChild(tdOpciones);
        tr2.id = `${producto.id}`;
        insertarClases(tr2, "border-y", "hover:bg-blue-200", "transition", "ease-in", "duration-500");
        tabla.appendChild(tr2);
    });
    let articulo = document.getElementById("mostrar");
    articulo.innerHTML = "";
    articulo.appendChild(tabla);
    escuchadorMeGusta();
    escuchadorNoGusta();
    mostrarInformacionExtra();   
}

function crearLista(productos) {
    const ul = document.createElement("ul");
    insertarClases(ul, "flex", "flex-wrap");
    productos.forEach(producto => {
        let articulo = document.getElementById("mostrar");
        articulo.innerHTML = "";
        let li1 = document.createElement("li");
        insertarClases("")
        let li2 = li1.cloneNode();
        let li3 = li1.cloneNode();
        let img = document.createElement("img");
        img.src = producto.image;
        img.classList.add("w-64");
        li1.appendChild(document.createTextNode(producto.title));
        li2.appendChild(img);
        li3.appendChild(document.createTextNode(producto.price));
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        
        articulo.appendChild(ul);
    });
}

function insertarClases(elemento, ...clases) {
    clases.forEach((clase) => {
        elemento.classList.add(clase);
    });
}

function escuchadorMeGusta() {
    let spanMeGusta = document.querySelectorAll(".me-gusta");
    spanMeGusta.forEach((span) => {
        let parrafo = span.querySelector("p");
        span.addEventListener("click", (evento) => {
            let valor = parseInt(parrafo.textContent);
            parrafo.textContent = `${valor + 1}`;
        });
    });
}

function escuchadorNoGusta() {
    let spanNoMeGusta = document.querySelectorAll(".no-me-gusta");
    spanNoMeGusta.forEach((span) => {
        let parrafo = span.querySelector("p");
        span.addEventListener("click", (evento) => {
            let valor = parseInt(parrafo.textContent);
            parrafo.textContent = `${valor + 1}`;
        });
    });
}

function mostrarInformacionExtra() {
    let ver = document.querySelectorAll(".ver");
    ver.forEach((spam) => {
        spam.addEventListener("click", (evento) => {
            let padre = spam.parentNode;
            let abuelo = padre.parentNode;
            cargarProductos(limite).then(datos => {
                let objeto = {};
                datos.forEach(prod => {
                    if (prod.id == abuelo.id) {
                        objeto = prod;                        
                    }
                });
                let mostrarInfo = document.getElementById("mostrarInfo");
                mostrarInfo.classList.remove("hidden");
                mostrarInfo.classList.add("flex", "flex-col", "justify-center", "items-center");
                document.getElementById("mostrar").classList.add("hidden");
                document.getElementById("cerrar").addEventListener("click", (evento) => {
                    document.getElementById("mostrarInfo").classList.add("hidden");
                    document.getElementById("mostrar").classList.remove("hidden");
                    
                })
                let titulo = document.getElementById("titulo");
                titulo.innerHTML = "";
                titulo.textContent = objeto.title;
                let categoria = document.getElementById("categoria");
                categoria.innerHTML = "";
                categoria.textContent = objeto.category;
                let descripcion = document.getElementById("descripcion");
                descripcion.innerHTML = "";
                descripcion.textContent = objeto.description;
                let imagen = document.getElementById("imagen");
                imagen.innerHTML = "";
                let img = document.createElement("img");
                img.src = `${objeto.image}`;
                insertarClases(img, "w-48", "rounded-3xl");
                imagen.appendChild(img);
                let precio = document.getElementById("precio");
                precio.innerHTML = "";
                precio.textContent = `${objeto.price} €`;
            }).catch(error => {
                console.log(error);
            })
        });
    });
}

function ordenarAsc(productos) {
    let productosOrdenados = productos.sort((a, b) => {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    });
    return productosOrdenados;
}

function ordenarDes(productos) {
    let productosOrdenados = productos.sort((a, b) => {
        if (a.category > b.category) {
            return -1;
        }
        if (a.category < b.category) {
            return 1;
        }
        return 0;
    });
    return productosOrdenados;
}