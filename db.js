const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/app.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected");

    
        db.run("PRAGMA foreign_keys = ON");


        const fs = require('fs');
        const path = require('path');

        const sql = fs.readFileSync(path.join(__dirname, 'model.sql')).toString();
        db.exec(sql);
    }
});


module.exports = db;