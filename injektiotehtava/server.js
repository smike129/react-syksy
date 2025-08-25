const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const { initializeDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database on startup
initializeDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: 'injektiotehtava-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/xss1', (req, res) => {
    res.render('xss1', { message: '' });
});

app.post('/xss1', (req, res) => {
    const nimi = req.body.nimi || '';
    const message = nimi ? `Hei, ${nimi}!` : '';
    res.render('xss1', { message });
});

app.get('/xss2', (req, res) => {
    const { connectDB: yhdista } = require('./config/database');
    const db = yhdista();

    const hakusql = "SELECT * FROM viestit";
    db.all(hakusql, [], (err, results) => {
        db.close();
        if (err) {
            console.error('Virhe haettaessa viestejä:', err);
            res.render('xss2', { viestit: results || [], error: 'Virhe haettaessa viestejä.' });
        } else {
            res.render('xss2', { viestit: results || [], error: null });
        }
    });
});

app.post('/xss2', (req, res) => {
    const { connectDB: yhdista } = require('./config/database');
    const db = yhdista();

    const nimi = req.body.nimi || '';
    const viesti = req.body.viesti || '';

    if (nimi && viesti) {
        const lisayssql = "INSERT INTO viestit (nimi, viesti) VALUES (?, ?)";
        db.run(lisayssql, [nimi, viesti], function(err) {
            if (err) {
                console.error('Virhe lisätessä viestiä:', err);
                db.close();
                res.render('xss2', { viestit: [], error: 'Viestin lisääminen epäonnistui.' });
            } else {
                // Fetch all messages after insert
                const hakusql = "SELECT * FROM viestit";
                db.all(hakusql, [], (err, results) => {
                    db.close();
                    if (err) {
                        res.render('xss2', { viestit: [], error: 'Virhe haettaessa viestejä.' });
                    } else {
                        res.render('xss2', { viestit: results || [], error: null });
                    }
                });
            }
        });
    } else {
        db.close();
        res.render('xss2', { viestit: [], error: 'Anna nimesi ja viestisi.' });
    }
});

app.get('/sql1', (req, res) => {
    res.render('sql1', { user: null, error: null });
});

app.post('/sql1', (req, res) => {
    const { connectDB: yhdista } = require('./config/database');
    const db = yhdista();

    const tunnus = req.body.tunnus || '';
    const salasana = req.body.salasana || '';

    if (tunnus) {
        // Intentionally vulnerable SQL query (for educational purposes)
        const hakusql = `SELECT * FROM kayttajat WHERE tunnus = '${tunnus}' AND salasana = '${salasana}'`;
    
        db.all(hakusql, [], (err, results) => {
            db.close();
            if (err) {
                console.error('Virhe kirjautumisessa:', err);
                res.render('sql1', { user: null, error: 'Virhe kirjautumisessa.' });
            } else if (results && results.length > 0) {
                const user = results[0];
                res.render('sql1', {
                    user: results, 
                    error: null
                });
            } else {
                res.render('sql1', { user: null, error: null });
            }
        });
    } else {
        db.close();
        res.render('sql1', { user: null, error: null });
    }
});

app.get('/sql2', (req, res) => {
    res.render('sql2', { message: null, error: null });
});

app.post('/sql2', (req, res) => {
    const { connectDB: yhdista } = require('./config/database');
    const db = yhdista();

    const tunnus = req.body.tunnus || '';
    const salasana = req.body.salasana || '';

    if (tunnus) {
        // Intentionally vulnerable SQL query (for educational purposes)
        const hakusql = `SELECT * FROM kayttajat WHERE tunnus = '${tunnus}' AND salasana = '${salasana}'`;

        db.all(hakusql, [], (err, results) => {
            db.close();
            if (err) {
                console.error('Virhe kirjautumisessa:', err);
                res.render('sql2', { message: null, error: 'Virhe kirjautumisessa.' });
            } else if (results && results.length > 0) {
                const user = results[0];
                if (user.yllapitaja == 1) {
                    res.render('sql2', { message: 'Olet kirjautunut ylläpitäjänä.', error: null });
                } else {
                    res.render('sql2', { message: null, error: null });
                }
            } else {
                res.render('sql2', { message: null, error: null });
            }
        });
    } else {
        db.close();
        res.render('sql2', { message: null, error: null });
    }
});

app.get('/sql3', (req, res) => {
    res.render('sql3', { message: null, error: null });
});

app.post('/sql3', (req, res) => {
    const { connectDB: yhdista } = require('./config/database');
    const db = yhdista();

    const nimi = req.body.nimi || '';
    const viesti = req.body.viesti || '';

    if (nimi) {
        // Add test event first
        const tapahtumasql = "INSERT INTO tapahtumat (aikaleima, kuvaus) VALUES (datetime('now'), 'testitapahtuma')";
        db.run(tapahtumasql, (err) => {
            if (err) {
                console.error('Virhe lisätessä testitapahtumaa:', err);
            }

            // Intentionally vulnerable multi-query (for educational purposes)
            const sql = `INSERT INTO viestit (nimi, viesti) VALUES ('${nimi}', '${viesti}')`;
            db.exec(sql, (err) => {
                if (err) {
                    console.error('Virhe lisätessä viestiä:', err);
                    db.close();
                    res.render('sql3', { message: null, error: 'Virhe lisätessä viestiä.' });
                } else {
                    // Check if tapahtumat table is empty
                    const hakusql = "SELECT * FROM tapahtumat";
                    db.all(hakusql, [], (err, results) => {
                        db.close();
                        if (err) {
                            console.error('Virhe tarkistettaessa tapahtumia:', err);
                            res.render('sql3', { message: null, error: 'Virhe tarkistettaessa tapahtumia.' });
                        } else if (results && results.length === 0) {
                            res.render('sql3', { message: 'Tapahtumat-taulu tyhjennetty.', error: null });
                        } else {
                            res.render('sql3', { message: null, error: 'Tapahtumat-taulun tyhjentäminen epäonnistui.' });
                        }
                    });
                }
            });
        });
    } else {
        db.close();
        res.render('sql3', { message: null, error: null });
    }
});

app.get('/helper', (req, res) => {
    const { connectDB: yhdista } = require('./config/database');
    const db = yhdista();

    const hakusql = "SELECT * FROM tapahtumat ORDER BY aikaleima DESC";
    db.all(hakusql, [], (err, results) => {
        db.close();
        if (err) {
            console.error('Virhe haettaessa tapahtumia:', err);
            res.render('helper', { tapahtumat: [], error: 'Virhe haettaessa tapahtumia.' });
        } else {
            res.render('helper', { tapahtumat: results || [], error: null });
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Palvelin käynnistetty portissa ${PORT}`);
    console.log(`Avaa selain osoitteessa: http://localhost:${PORT}`);
});
