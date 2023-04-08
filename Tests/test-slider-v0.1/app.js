
let slide1 = document.getElementById("id-slide1");
let slide2 = document.getElementById("id-slide2");
let tabSlide = [slide1, slide2];
let idIm = 0;
let alternate = 0;

const tabIm = [
    "../bankPhoto/im1.png",
    "../bankPhoto/im2.png", 
    "../bankPhoto/chelou.jpg", 
    "../bankPhoto/coffe.png", 
    "../bankPhoto/chess.png",
    "../bankPhoto/immm.jpg",
    "../bankPhoto/esgi.png",
    "../bankPhoto/zevent.png",

];
const lenTabIm = tabIm.length;

//***************************************************************************************** */

//fonction random qui retoune un nombre random qui n'est pas le idIm déja utilisé
const random = () => {
    let nb = Math.floor(Math.random() * lenTabIm);
    if (nb === idIm) {      //pour ne pas avoir 2 fois la meme slide d'affilé
        (nb === lenTabIm-1) ? nb-- : nb++;    //si nb === lenTabIm nb-- sinon nb++ pour pas sortir du tableau
    }
    return (nb);
}


// fonction qui sert a monter ou non la slide et alterner la variable alternate pour désigné la slide1 ou 2
const alternateSlide = () => {
    tabSlide[alternate].style.display = "block";
    tabSlide[(alternate+1)%2].style.display = "none";  //(alternate+1)%2 ser a designé 1 si alternate == 0 et 0 si ===1
    alternate = (alternate+1)%2;
}

// fonction qui sert a passer a la photo suivante (random)
const randomSlide = () => {
    idIm = random();
    tabSlide[(alternate+1)%2].src = tabIm[idIm];
    alternateSlide();
}

//**************************************************************************************** */

// j'appel une fois random slide pour chargé la deuxieme slide aléatoirement
randomSlide();