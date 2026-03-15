function cepillarDientes() {
    console.log("1. Cepillando los dientes .... (entra y sale de la pila rapido)");
}

function bañarse() {
    cepillarDientes(); //se apila encima de bañarse
    console.log("2. cuerpo limpio (bañarse termina ahora)");
}

function empezarDia() {
    bañarse(); //se apila encima de empezarDia
    console.log("3. listo para trabajar (pila vacia )");
}

empezarDia(); //se apila empezarDia

/*const botonProyectos = document.getElementById("ver-proyectos");
function mostrarProyectos() {
    const proyectosSection = document.getElementById("proyectos");
    proyectosSection.scrollIntoView({ behavior: "smooth" });
}*/
//botonProyectos.addEventListener("click", mostrarProyectos);

// Cambiar tema - FORMA SIMPLE CAMBIO DE TEMA
/*const botonTema = document.getElementById("btn-tema");
const cuerpoPagina = document.body;
function alternarTema() {
    if(cuerpoPagina.style.backgroundColor === "black") {
        cuerpoPagina.style.backgroundColor = "white";
        cuerpoPagina.style.color = "black"; //cambio del texto a negro
    }else{
        //si NO ES negro, lo cambiamos a tema negro
        cuerpoPagina.style.backgroundColor = "black";
        cuerpoPagina.style.color = "white"; //cambio del texto a blanco
    }
   
}*/
//botonTema.addEventListener("click", alternarTema);

//ejemplo
/*const botonCambiarTema = document.querySelector("#btn-color");

    // Paso 2: Escuchar el clic
    botonTema.addEventListener("click", () => {

        // Paso 3: Acción (modificar el DOM)
        document.body.style.backgroundColor = "midnightblue";

    });
*/
// ejemplo: alerta al hacer clic de un proyecto

/*const todasLasTarjetas = document.querySelectorAll(".proyecto-card");
 
todasLasTarjetas.forEach(tarjeta => {
    tarjeta.addEventListener("click", function() {
        const nombreProyecto = tarjeta.querySelector("h3").innerText;
        alert("Haz hecho clic en el proyecto: " + nombreProyecto);
    });
});*/

///variables: let (que puede cambiar)  - const (es fijo que no cambia)*/
const nombreDev = "Pedro Roda"; // fijo  no cambia
//let proyectosCompletados = 4; // puede aumentar o disminuir  o variar en el tiempo  dependiendo del scope

// tipos primitivos
let esInstructor = true; // boolean
let edad = 34;  //number
let saludo = "Hola soy Pedro Roda";//string

// tipos de datos complejos
let habilidades = ["JavaScript", "HTML", "CSS"];
let experiencia = {
    años: 10,
    empresas: ["Google", "Facebook", "Amazon"]
};

const proyectoNuevo = {
    nombre: "Portafolio Personal",
    descripcion: "Un sitio web para mostrar mis proyectos y habilidades.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    completado: false
};


//entender la visibilidad de las variables y la memoria de las funciones
//visibilidad de las variables

function crearContadorDeProyectos(inicial) {
    let contador = inicial; //variable privada gracias al closure

    return {
        incrementar: function () {
            contador++;
            return `Ahora tienes ${contador} proyectos.`;
        },
        obtenerTotal: () => contador //funcion flecha para obtener el valor actual del contador
    };
}

const miContador = crearContadorDeProyectos(4);
console.log(miContador.incrementar()); // Ahora tienes 5 proyectos.
console.log(miContador.contador); // undefined, no se puede acceder directamente al contador


// otro ejemplo 
function crearRastreador() {
    //local/function scope: solo vive aqui dentro de la funcion
    let conteo = 0; //variable privada, no accesible desde fuera
    return function () { //closure que mantiene acceso a conteo
        conteo++;
        return ` has intentado ver los proyectos ${conteo}`;
    };
}

const rastrearclick = crearRastreador();
console.log(rastrearclick()); // has intentado ver los proyectos 1
console.log(rastrearclick()); // has intentado ver los proyectos 2  

// mutaciones  

const misProyectos = [
    { nombre: "E-commerce", techs: ["React", "Node.js"] },
    { nombre: "Blog Personal", techs: ["Gatsby", "GraphQL"] },
    { nombre: "App de Tareas", techs: ["Vue", "Gatsby"] }
];
//usamoremos reduce para contar ocurrencias de cada tecnología en los proyectos
const stackStats = misProyectos
    .flatMap(p => p.techs) //extraemos todas las techs en un solo array
    .reduce((acc, tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
        return acc;
    }, {});
console.log(stackStats); // { React: 1, 'Node.js': 1, Gatsby: 2, GraphQL: 1, Vue: 1 }

// filter(): creamos un nuevo array con proyectos que usan React
const proyectosReact = misProyectos.filter(p => p.techs.includes("React"));

//map(): creamos un nuevo array con solo los nombres de los proyectos
const nombresProyectos = misProyectos.map(p => p.nombre);

// ejemplo de carga de portafolio  con fetch() y async/await

async function cargarProyectos() {
    try {
        const response = await fetch("https://api.github.com/users/KeylaUsnayo/repos");
        if (!response.ok) {
            throw new Error("Error al cargar los proyectos   ");
        }
        const proyectos = await response.json();
        const contenedorProyectos = document.getElementById("contenedor-proyectos");
        contenedorProyectos.innerHTML = ""; //limpiar el contenedor antes de agregar nuevos proyectos
        proyectos.forEach(proyecto => {
            contenedorProyectos.innerHTML += `
                <div class="proyecto-card">
                    <h3 class="proyecto-titulo">${proyecto.name}</h3>
                    <p class="proyecto-desc">
                    ${proyecto.description || "Proyecto disponible en mi repositorio de GitHub"}
                    </p>
                    <center><a href="${proyecto.html_url}" target="_blank" class="btn-proyecto">
                    Ver proyecto </a></center>
                </div>
                    `;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

cargarProyectos();

/// modularidad
// controlador de interfaz

const botonAlternar = document.querySelector("#btn-tema");

const UI = {
    cuerpo: document.body,

    alternarColor: function () {
        const esOscuro = this.cuerpo.style.backgroundColor === "black";
        this.cuerpo.style.backgroundColor = esOscuro ? "white" : "black";
        this.cuerpo.style.color = esOscuro ? "black" : "white";
    },
    irAseccion: function (id) {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }

};
botonAlternar.addEventListener("click", () => UI.alternarColor());

// delegacion  de  eventos: un solo listener para todo el contenedor de proyectos
const contenedor = document.querySelector(".contenedor-catalogos");

/*contenedor.addEventListener("click", function (evento) {
    // .target el elemento que fue clikeado .closest busca el padre mas cercano que coincida con el selector dado
    const tarjeta = evento.target.closest(".catalogo-card");
    if (tarjeta) {
        const titulo = tarjeta.querySelector(".catalogo-titulo").innerText;
        alert("Haz hecho clic en un catalogo: " + titulo);
    }

});*/

//moviento de foto
const foto = document.getElementById("foto-perfil");

foto.addEventListener("mouseenter", () => {
    foto.style.transform = "scale(1.15)";
});

foto.addEventListener("mouseleave", () => {
    foto.style.transform = "scale(1)";
});


//para el nav bar scroll
const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));
        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

//ocultar texto
const botonesVerMas = document.querySelectorAll(".ver-mas");

botonesVerMas.forEach(boton => {
    boton.addEventListener("click", () => {
        const textoExtra = boton.previousElementSibling;
        if(textoExtra.style.display === "inline"){
            textoExtra.style.display = "none";
            boton.textContent = "Ver más";
        } else {
            textoExtra.style.display = "inline";
            boton.textContent = "Ver menos";
        }

    });

});

