// recupero la tabla con el id age-table
let aux = document.getElementById("age-table");
console.log(aux);

// utilizando la variable aux recupero solo los label
let aux2 = aux.querySelectorAll("label");
console.log(aux2, aux2.length);

// recupero el td con id age-list
let aux3 = document.getElementById("age-list");
console.log(aux3);

// recupero el elemento cuyo nombre es search-person
let aux4 = document.getElementsByName("search-person");
console.log(aux4);


let aux5 = aux4[0].querySelector("input");   
console.log(aux5);


let aux6 = aux4[0].querySelectorAll("input");
console.log(aux6[aux6.length - 1]);