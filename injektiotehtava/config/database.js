const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function connectDB() {
    const dbPath = path.join(__dirname, '..', 'database', 'injection.db');
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Yhteyden muodostaminen epäonnistui: ' + err.message);
            return;
        }
        console.log('Tietokantayhteys muodostettu.');
    });

    return db;
}

// Initialize database with tables and sample data
function initializeDB() {
    const db = connectDB();

    // Create tables
    db.serialize(() => {
        // Users table
        db.run(`DROP TABLE IF EXISTS kayttajat`);
        db.run(`CREATE TABLE IF NOT EXISTS kayttajat (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tunnus TEXT NOT NULL,
            salasana TEXT NOT NULL,
            sahkoposti TEXT NOT NULL,
            yllapitaja INTEGER NOT NULL
        )`);

        // Events table
        db.run(`DROP TABLE IF EXISTS tapahtumat`);
        db.run(`CREATE TABLE IF NOT EXISTS tapahtumat (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            aikaleima DATETIME NOT NULL,
            kuvaus TEXT NOT NULL
        )`);

        // Messages table
        db.run(`DROP TABLE IF EXISTS viestit`);
        db.run(`CREATE TABLE IF NOT EXISTS viestit (
            nimi TEXT NOT NULL,
            viesti TEXT NOT NULL
        )`);

        // Insert sample data
        db.run(`INSERT OR IGNORE INTO kayttajat (tunnus, salasana, sahkoposti, yllapitaja) VALUES 
            ('hakkeri', 'hack123', 'hakkeri@hacknet.com', 0),
            ('timo', 'timo345', 'timo@sposti.fi', 0),
            ('admin', 'adminqwerty', 'admin@sposti.fi', 1),
            ('sara', 'sara123', 'sara@sposti.fi', 0)`);

        db.run(`INSERT OR IGNORE INTO tapahtumat (aikaleima, kuvaus) VALUES 
            ('2025-08-10', 'Käyttäjä timo kirjautui sisään.'),
            ('2023-08-09', 'Käyttäjä admin kirjautui sisään.')`);
    });

    return db;
}

module.exports = { connectDB, initializeDB };