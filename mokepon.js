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

let playerId = null;
let enemigoId = null;
let mokepones = [];
let mokeponesEnemigos = [];
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
mapaBackground.src = "./assets/mokemap.png";

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if(anchoDelMapa > anchoMaximoDelMapa){
  anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.width = 40;
    this.height = 40;
    this.x = aleatorio(0, mapa.width - this.width);
    this.y = aleatorio(0, mapa.height - this.height);
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
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png");
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png");
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png");

const HIPODOGE_ATAQUES = [
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
]
const CAPIPEPO_ATAQUES = [
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "💧", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-tierra" }
]
const RATIGUEYA_ATAQUES = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES);
capipepo.ataques.push(...CAPIPEPO_ATAQUES);
ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

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

  unirseAljuego();
}

function unirseAljuego(){
  fetch("http://localhost:8080/join")
    .then(function (res){
      console.log(res);
      if(res.ok){
        res.text()
          .then(function (response){
            console.log(response)
            playerId = response
          })
      }
    });
};

function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota");
    return
  }
  sectionSeleccionarMascota.style.display = "none";
  selecionarMokepon(mascotaJugador);

  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = "flex";
  iniciarMapa();
}

function selecionarMokepon(mascotaJugador){
  fetch(`http://localhost:8080/mokepon/${playerId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })
};

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
      if(ataqueJugador.length === 5){
        enviarAtaques();
      }
    })
  });
} 

function enviarAtaques(){
  fetch(`http://localhost:8080/mokepon/${playerId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ataques: ataqueJugador
    })
  });

  intervalo = setInterval(obtenerAtaques, 50)
};

function obtenerAtaques(){
  fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res) {
      if(res.ok){
        res.json()
          .then(function ({ ataques }){
            if(ataques.length === 5){
              ataqueEnemigo = ataques
              combate()
            }
          })
      }
    });
};

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
  clearInterval(intervalo);

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
    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)
    
mokeponesEnemigos.forEach(function (mokepon)
        {
            if(mokepon != undefined){
                mokepon.pintarMokepon()
                revisarColision(mokepon)
            }
        })
}

function enviarPosicion(x, y){
  fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
  .then(function (res){
    if(res.ok){
      res.json()
        .then(function ({ enemigos }){
          console.log(enemigos);
          mokeponesEnemigos = enemigos.map(function (enemigo)
                {
                    let mokeponEnemigo = null
                    if(enemigo.mokepon != undefined)
                    {
                        const mokeponNombre = enemigo.mokepon.nombre 
                        switch (mokeponNombre)
                        {
                        case "Hipodoge":
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                                break
                            case "Capipepo":
                                mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                                break
                            case "Ratigueya":
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                                break
                            default:
                                break
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                    }
                        return mokeponEnemigo
                })
      });
    };
  });
};
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

  enemigoId = enemigo.id;
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none"
  seleccionarMascotaEnemigo(enemigo);

}

window.addEventListener("load", iniciarJuego);