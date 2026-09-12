PRAGMA foreign_keys = ON; 
CREATE TABLE IF NOT EXISTS artists (
    artistId INTEGER PRIMARY KEY AUTOINCREMENT, 
    artistName TEXT NOT NULL, 
    artistGenre TEXT NOT NULL, 
    monthlyListeners INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS albums (
    albumId INTEGER PRIMARY KEY AUTOINCREMENT, 
    albumName TEXT NOT NULL, 
    releaseYear INTEGER NOT NULL, 
    listens INTEGER NOT NULL, 
    artistId INTEGER NOT NULL,
    FOREIGN KEY (artistId) REFERENCES artists(artistId) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS songs (
    songId INTEGER PRIMARY KEY AUTOINCREMENT, 
    songName TEXT NOT NULL, 
    songReleaseYear INTEGER NOT NULL, 
    albumId INTEGER NOT NULL,
    FOREIGN KEY (albumId) REFERENCES albums(albumId) ON DELETE CASCADE
); 
INSERT OR IGNORE INTO artists (artistName, artistGenre, monthlyListeners)
VALUES 
('Gorillaz', 'AltRock', 40600000),
('Deftones', 'Rock', 17800000);

INSERT OR IGNORE INTO albums (albumName, releaseYear, listens, artistId)
VALUES
('Diamond eyes', 2010, 693000000, 1),
('The Mountain', 2026, 170000000, 1),
('Skinty Fia', 2022, 659000, 2),
('Romance', 2025, 7680000, 2),
('In Utero', 1993, 15000000, 2);

INSERT OR IGNORE INTO songs (songName, songReleaseYear, albumId)
VALUES
('DARE', 2005, 2),
('Demon Days', 2005, 2),
('Risk', 2010, 1),
('Beauty School', 2010, 1),
('Change', 2000, 1),
('Dumb', 1993, 5),
('Drain You', 1991, 5),
('Heart-Shaped box', 1993, 5),
('I Love You', 2022, 4),
('Favourite', 2025, 4);

 