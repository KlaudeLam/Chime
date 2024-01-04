document.getElementById("asUser").onclick = () => {
    document.getElementById('asUser').style.backgroundColor = "#ff6176";
    document.getElementById('asUser').style.color = "#ffffff";

    document.getElementById('asArtist').style.backgroundColor = "#ffd3da";
    document.getElementById('asArtist').style.color = "black";
    
    document.getElementById('registerUser').style.display = "block";
    document.getElementById('registerArtist').style.display = "none";
}

document.getElementById("asArtist").onclick = () => {
    document.getElementById('asArtist').style.backgroundColor = "#ff6176";
    document.getElementById('asArtist').style.color = "#ffffff";

    document.getElementById('asUser').style.backgroundColor = "#ffd3da";
    document.getElementById('asUser').style.color = "black";

    document.getElementById('registerUser').style.display = "none";
    document.getElementById('registerArtist').style.display = "block";
}