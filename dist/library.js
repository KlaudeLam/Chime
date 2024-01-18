const changeBtnStatus = (id, bgColor, textColor) => {
    document.getElementById(id).style.backgroundColor = bgColor;
    document.getElementById(id).style.color = textColor;
}

document.getElementById("btn-your-playlists").onclick = () => {
    changeBtnStatus("btn-your-playlists", "#ff6176", "#ffffff");
    changeBtnStatus("btn-your-episodes", "#ffd3da", "black");
    changeBtnStatus("btn-your-artists", "#ffd3da", "black");

    document.getElementById('your-playlists').style.display = "block";
    document.getElementById('your-episodes').style.display = "none";
    document.getElementById('your-artists').style.display = "none";
}

document.getElementById("btn-your-episodes").onclick = () => {
    changeBtnStatus("btn-your-episodes", "#ff6176", "#ffffff");
    changeBtnStatus("btn-your-playlists", "#ffd3da", "black");
    changeBtnStatus("btn-your-artists", "#ffd3da", "black");

    document.getElementById('your-episodes').style.display = "block";
    document.getElementById('your-playlists').style.display = "none";
    document.getElementById('your-artists').style.display = "none";
}

document.getElementById("btn-your-artists").onclick = () => {
    changeBtnStatus("btn-your-artists", "#ff6176", "#ffffff");
    changeBtnStatus("btn-your-episodes", "#ffd3da", "black");
    changeBtnStatus("btn-your-playlists", "#ffd3da", "black");

    document.getElementById('your-artists').style.display = "block";
    document.getElementById('your-episodes').style.display = "none";
    document.getElementById('your-playlists').style.display = "none";
}