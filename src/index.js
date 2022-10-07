const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
sectionReiniciar.style.display = "none";
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa")
const controls = document.querySelectorAll('.button-control')

let mokepones = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botones = [];
let ataqueJugador = [];
let botonTierra;
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "../assets/mokemap.png";

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon(){
      lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.height,
        this.width
    )
  }
}
let hipodoge = new Mokepon("Hipodoge", "../assets/mokepons_mokepon_hipodoge_attack.png", 5, "../assets/hipodoge.png");
let capipepo = new Mokepon("Capipepo", "../assets/mokepons_mokepon_capipepo_attack.png", 5, "../assets/capipepo.png");
let ratigueya = new Mokepon("Ratigueya", "../assets/mokepons_mokepon_ratigueya_attack.png", 5, "../assets/ratigueya.png");

let hipodogeEnemigo = new Mokepon("Hipodoge", "../assets/mokepons_mokepon_hipodoge_attack.png", 5, "../assets/hipodoge.png", 80, 120);
let capipepoEnemigo = new Mokepon("Capipepo", "../assets/mokepons_mokepon_capipepo_attack.png", 5, "../assets/capipepo.png", 150, 95);
let ratigueyaEnemigo = new Mokepon("Ratigueya", "../assets/mokepons_mokepon_ratigueya_attack.png", 5, "../assets/ratigueya.png", 200, 190);

hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);
hipodogeEnemigo.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);
capipepo.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);
capipepoEnemigo.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);
ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
);
ratigueyaEnemigo.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
);
mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

  mokepones.forEach(mokepon => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
  });
  
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}
function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
    sectionSeleccionarMascota.style.display = "none";
    //sectionSeleccionarAtaque.style.display = "flex";
    sectionVerMapa.style.display = "flex";
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
    sectionSeleccionarMascota.style.display = "none";
    //sectionSeleccionarAtaque.style.display = "flex";
    sectionVerMapa.style.display = "flex";
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
    sectionSeleccionarMascota.style.display = "none";
    //sectionSeleccionarAtaque.style.display = "flex";
    sectionVerMapa.style.display = "flex";
  } else {
    alert("Selecciona una mascota");
  }
  extraerAtaques(mascotaJugador);
  iniciarMapa();
}
function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".BAtaque");

}
function secuenciaAtaque(){
  botones.forEach((boton) =>{
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥"){
        ataqueJugador.push("FUEGO");
        console.log(ataqueJugador);
        boton.style.backgroundColor = "#112f58"
        boton.disabled = true;
      }else if(e.target.textContent === "💧"){
        ataqueJugador.push("AGUA");
        console.log(ataqueJugador);
        boton.style.backgroundColor = "#112f58"
        boton.disabled = true;
      }else{
        ataqueJugador.push("TIERRA");
        console.log(ataqueJugador);
        boton.style.backgroundColor = "#112f58"
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo()
    })
  });
} 

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1);
  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO")
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA")
  } else {
    ataqueEnemigo.push("TIERRA")
  }
  iniciarPelea()
}

function iniciarPelea(){
  if (ataqueJugador.length === 5) {
    combate();
  }
};

function indexAmbosOponentes(jugador, enemigo){
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

  for (let index = 0; index < ataqueJugador.length; index++) {
      if (ataqueJugador[index] === ataqueEnemigo[index]){
         indexAmbosOponentes(index, index)
         crearMensaje("EMPATE");
      }else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO" 
          || ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA" 
          || ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA"){
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      }else {
        indexAmbosOponentes(index, index)
        crearMensaje("PERDISTE")
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
      }
  }
 
  revisarVictorias();
}
function revisarVictorias() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("Esto fue un Empate!!");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICIDADES! Ganaste");
  }else{
    crearMensajeFinal("Lo siento, perdiste :C")
  }
}
function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");
  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}
function reiniciarJuego() {
  location.reload();
}
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
      mapaBackground,
      0,
      0,
      mapa.width,
      mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon();
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();

    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
      revisarColision(hipodogeEnemigo)
      revisarColision(capipepoEnemigo)
      revisarColision(ratigueyaEnemigo)

    }
}

//FORMA MAS PRO XD
/*controls.forEach((control) => {
  control.addEventListener("click", () => moverCapipepo(control.id));
});

function moverCapipepo(direction){
  switch(direction){
    case "up":
      capipepo.velocidadY = - 5;
      break;
    case "left":
      capipepo.velocidadX = - 5;
      break;
    case 'down':
      capipepo.velocidadY = + 5;
      break;
    case 'right':
      capipepo.velocidadX = - 5;
      break;
  }
  pintarPersonaje()
};*/
function moveUp(){
  mascotaJugadorObjeto.velocidadY = - 5;
}
function moveLeft(){
  mascotaJugadorObjeto.velocidadX = - 5;
}
function moveRight(){
  mascotaJugadorObjeto.velocidadX = 5;
}
function moveDown(){
  mascotaJugadorObjeto.velocidadY = 5;
}
function detenerMovimiento(){
  mascotaJugadorObjeto.velocidadY = 0
  mascotaJugadorObjeto.velocidadX = 0
}
function sePresionoUnaTecla(event){
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown": 
        moveDown();
      break;
    case "ArrowLeft": 
        moveLeft();
      break;
    case "ArrowRight":
        moveRight();
      break;
    default:
      break;
  }
};
function iniciarMapa(){
  mapa.width = 500
  mapa.height = 350
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
  intervalo = setInterval(pintarCanvas, 50);
  
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
      if (mascotaJugador === mokepones[i].nombre) {
        return mokepones[i]
    }
  }
};

function revisarColision(enemigo){
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.height
  const derechaEnemigo = enemigo.x + enemigo.width
  const izquierdaEnemigo = enemigo.x

  const arribaMascota = mascotaJugadorObjeto.y
  const abajoMascota = mascotaJugadorObjeto.y + enemigo.height
  const derechaMascota = mascotaJugadorObjeto.x + enemigo.width
  const izquierdaMascota = mascotaJugadorObjeto.x


  if(
    abajoMascota < arribaEnemigo || 
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ){
    return
  }

  detenerMovimiento();
  clearInterval(intervalo)
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none"
  seleccionarMascotaEnemigo(enemigo);

}

window.addEventListener("load", iniciarJuego);
