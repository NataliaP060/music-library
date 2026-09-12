async function fetchArtists() {
    const res = await fetch("http://localhost:5000/artists");
    const data = await res.json();

    let table = document.getElementById("artistTable");
    table.innerHTML="";

    data.forEach(artist => {
        table.innerHTML += `
        <tr>
        <td>${artist.artistId}</td>
        <td>${artist.artistName}</td>
        <td>${artist.artistGenre}</td>
        <td>${artist.monthlyListeners}</td>
        <td>
        <button onclick="deleteArtist(${artist.artistId})">Delete</button>
        </td>
        </tr>
        `;
    });
}
//creating 
async function createArtist() {
    const name = document.getElementById("name").value;
    const genre = document.getElementById("genre").value;
    const listeners = document.getElementById("listeners").value;
    
    await fetch("http://localhost:5000/artists", {
        method: "POST", 
        headers: {"Content-type": "application/json"}, 
        body: JSON.stringify({
            artistName: name,
            artistGenre: genre,
             monthlyListeners: listeners
        })
    });
    fetchArtists();
}
//deleting
async function deleteArtist(id) {
    await fetch(`http://localhost:5000/artists/${id}`, {
        method: "DELETE"
    });
    fetchArtists();
}

async function fetchAlbums() {
    const res=await fetch("http://localhost:5000/albums");
    const data=await res.json();

    let table = document.getElementById("albumsTable");
    table.innerHTML="";

    data.forEach(album => {
        table.innerHTML+= `
        <tr>
        <td>${album.albumId}</td>
        <td>${album.albumName}</td>
        <td>${album.releaseYear}</td>
        <td>${album.listens}</td>
        <td>${album.artistId}</td>
        <td>
        <button onclick="deleteAlbum(${album.albumId})">Delete</button>
        </td>
        </tr>
        `;
    });
    
}
async function createAlbum() {
    const name = document.getElementById("albumName").value;
    const releaseYear = document.getElementById("year").value;
    const listens = document.getElementById("listens").value;
    const artistId = document.getElementById("artistId").value;
    
    await fetch("http://localhost:5000/albums", {
        method: "POST", 
        headers: {"Content-type": "application/json"}, 
        body: JSON.stringify({
            albumName: name,
            releaseYear: Number(releaseYear),
            listens: Number(listens),
            artistId: Number(artistId)
        })
    });
    fetchAlbums();
}
//deleting
async function deleteAlbum(id) {
    await fetch(`http://localhost:5000/albums/${id}`, {
        method: "DELETE"
    });
    fetchAlbums();
}
async function fetchSongs() {
    const res=await fetch("http://localhost:5000/songs");
    const data=await res.json();

    let table = document.getElementById("songTable");
    table.innerHTML="";

    data.forEach(song => {
        table.innerHTML+= `
        <tr>
        <td>${song.songId}</td>
        <td>${song.songName}</td>
        <td>${song.songReleaseYear}</td>
        <td>${song.albumId}</td>
        <td>
        <button onclick="deleteSong(${song.songId})">Delete</button>
        </td>
        </tr>
        `;
    });
}
async function createSong() {
    const name = document.getElementById("songName").value;
    const year = document.getElementById("songYear").value;
    const albumId = document.getElementById("albumId").value;
    
    await fetch("http://localhost:5000/songs", {
        method: "POST", 
        headers: {"Content-type": "application/json"}, 
        body: JSON.stringify({
            songName: name,
            songReleaseYear: Number(year),
             albumId: Number(albumId)
        })
    });
    fetchSongs();
}
//deleting
async function deleteSong(id) {
    await fetch(`http://localhost:5000/songs/${id}`, {
        method: "DELETE"
    });
    fetchSongs();
}
window.onload = () => {
    if (document.getElementById("artistTable")) {
        fetchArtists();
    }
      if (document.getElementById("albumsTable")) {
        fetchAlbums(); 
    }
      if (document.getElementById("songTable")) {
        fetchSongs(); // 
    }
};