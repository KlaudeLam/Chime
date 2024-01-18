let btnPlay = document.getElementsByClassName("btnPlay");
let btnPause = document.getElementsByClassName("btnPause");

for (let j = 0; j < btnPlay.length; j++) {
    btnPlay[j].onclick = () => {
        for (let i = 0; i < btnPlay.length; i++) {
            btnPause[i].style.display = 'block';
            btnPlay[i].style.display = 'none';
        }
    }
}
for (let j = 0; j < btnPlay.length; j++) {
    btnPause[j].onclick = () => {
        for (let i = 0; i < btnPlay.length; i++) {
            btnPause[i].style.display = 'none';
            btnPlay[i].style.display = 'block';
        }
    }
}