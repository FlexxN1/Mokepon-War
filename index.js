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

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
    
    asignarAtaques(ataques){
        this.ataques = ataques;
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

app.post("/mokepon/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = players.findIndex((player) => playerId === player.id);

    if (jugadorIndex >= 0) {
        players[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = players.filter((player) => playerId !== player.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:playerId/ataques", (req, res) => {
    const playerId = req.params.playerId || "";
    const ataques = req.body.ataques || "";

    const jugadorIndex = players.findIndex((player) => playerId === player.id);

    if (jugadorIndex >= 0) {
        players[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

app.get("/mokepon/:playerId/ataques", (req, res) => {
    const playerId = req.params.playerId || "";
    const player = players.find((player) => player.id === playerId)
    res.send({
        ataques: player.ataques || []
    });
})

app.listen(8080, () => {
    console.log("Run server")
});