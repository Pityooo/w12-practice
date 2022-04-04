const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// statikus mappa kiszolgálás -> mindent elérhetővé teszek, ami a public mappán belül van
app.use('/public', express.static(`${__dirname}/../frontend/public`));

app.get('/', (req, res, next) => {
    // szerver oldali console.log-ok mindig a terminalban, és nem a böngészőben jelennek meg
    //console.log('Request received');

    // Küldünk(.send()) egy szöeget válaszként(res)
    //res.send('Thank you for your request! This is our response')

    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get('/kismacska', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
});

app.get('/something', (req, res, next) => {
    // szerver oldali console.log-ok mindig a terminalban, és nem a böngészőben jelennek meg
    console.log('Request received for something endpoint');

    // Küldünk(.send()) egy szöeget válaszként(res)
    res.send('Thank you for your request! This is our response for something endpoint');
});

app.get('/api/v1/users', (req, res, next) => {
    // szerver oldali console.log-ok mindig a terminalban, és nem a böngészőben jelennek meg
    console.log('Request received for users endpoint');

    res.sendFile(path.join(`${__dirname}/../frontend/users.json`));

    // Küldünk(.send()) egy szöveget válaszban(res)
    /* res.send('Thank you for your request! This is our response for something endpoint') */

    // [object, Object] hiba, ha nincs stringify-olva
    //res.send(JSON.stringify(users));
});

app.get('/api/v1/users/active',(req, res, next) => {
    fs.readFile('../frontend/users.json', (error, data) => {
        // ha hiba történik
        if (error) {
            // adja vissza a hibát
            res.send(`Hiba történt: ${error}`);
        // máskülönben
        } else {
            // létrehozunk egy változót, amiben az adatot parse-oljuk
            const users = JSON.parse(data);
            // visszaküldjük az aktív státusszal rendelkező user-eket
            res.send(users.filter(user => user.status === "active"))
        }
    })
});

app.get('/api/v1/users/passive',(req, res, next) => {
    fs.readFile('../frontend/users.json', (error, data) => {
        // ha hiba történik
        if (error) {
            // adja vissza a hibát
            res.send(`Hiba történt: ${error}`);
        // máskülönben
        } else {
            // létrehozunk egy változót, amiben az adatot parse-oljuk
            const users = JSON.parse(data);
            // visszaküldjük a passzív státusszal rendelkező user-eket
            res.send(users.filter(user => user.status === "passive"))
        }
    })
});

const port = 9000;
app.listen(port, () => {
    console.log(`Server is listening on http://127.0.0.1:${port}`)
});

