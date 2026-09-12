const db = require('../db');

exports.getAll = (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getOne = (req, res) => {
    db.get("SELECT * FROM songs WHERE songId = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

exports.create = (req, res) => {
    const { songName, songReleaseYear, albumId } = req.body;

    db.run(
        "INSERT INTO songs (songName, songReleaseYear, albumId) VALUES (?, ?, ?)",
        [songName, songReleaseYear, albumId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
};


exports.update = (req, res) => {
    const { songName, songReleaseYear, albumId } = req.body;

    db.run(
        "UPDATE songs SET songName=?, songReleaseYear=?, albumId=? WHERE songId=?",
        [songName, songReleaseYear, albumId, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

exports.remove = (req, res) => {
    db.run("DELETE FROM songs WHERE songId=?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
};