const db = require('../db');

exports.getAll = (req, res) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getOne = (req, res) => {
    db.get("SELECT * FROM artists WHERE artistId = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

exports.create = (req, res) => {
    const { artistName, artistGenre, monthlyListeners } = req.body;

    db.run(
        "INSERT INTO artists (artistName, artistGenre, monthlyListeners) VALUES (?, ?, ?)",
        [artistName, artistGenre, monthlyListeners],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const { artistName, artistGenre, monthlyListeners } = req.body;

    db.run(
        "UPDATE artists SET artistName=?, artistGenre=?, monthlyListeners=? WHERE artistId=?",
        [artistName, artistGenre, monthlyListeners, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

exports.remove = (req, res) => {
    db.run("DELETE FROM artists WHERE artistId=?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
};