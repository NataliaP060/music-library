const db = require('../db');


exports.getAll = (req, res) => {
    db.all("SELECT * FROM albums", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


exports.getOne = (req, res) => {
    db.get("SELECT * FROM albums WHERE albumId = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};


exports.create = (req, res) => {
    const { albumName, releaseYear, listens, artistId } = req.body;

    db.run(
        "INSERT INTO albums (albumName, releaseYear, listens, artistId) VALUES (?, ?, ?, ?)",
        [albumName, releaseYear, listens, artistId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const { albumName, releaseYear, listens, artistId } = req.body;

    db.run(
        "UPDATE albums SET albumName=?, releaseYear=?, listens=?, artistId=? WHERE albumId=?",
        [albumName, releaseYear, listens, artistId, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};


exports.remove = (req, res) => {
    db.run("DELETE FROM albums WHERE albumId=?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
};