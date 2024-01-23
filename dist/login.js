const changeBtnStatus = (id, bgColor, textColor) => {
    document.getElementById(id).style.backgroundColor = bgColor;
    document.getElementById(id).style.color = textColor;
}

document.getElementById("asUser").onclick = () => {
    changeBtnStatus("asUser", "#ff6176", "#ffffff");
    changeBtnStatus("asArtist", "#ffd3da", "black");

    // (status == user)
}

document.getElementById("asArtist").onclick = () => {
    changeBtnStatus("asArtist", "#ff6176", "#ffffff");
    changeBtnStatus("asUser", "#ffd3da", "black");

    // (status == artist)
}