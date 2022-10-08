const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json())

const players = [];

class Player {
    constructor(id){
        this.id = id;
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre;
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`;
    const player = new Player(id)

    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(id)
});

app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || "";
    const nombre = req.body.mokepon || "";
    const mokepon = new Mokepon(nombre);
    
    const jugadorIndex = players.findIndex((player) => playerId === player.id);
    if(jugadorIndex >= 0){
        players[jugadorIndex].asignarMokepon(mokepon);
    }

    console.log(players);
    console.log(playerId)
    res.end()
});

app.listen(8080, () => {
    console.log("Servidor funcionando")
});