let slide = document.getElementById("id-slide");
const tabIm = ["im1.png", "im2.png", "chelou.jpg", "coffe.png", "chess.png"];
let idIm = 0
const lenTabIm = tabIm.length;

const random = () => {
    let nb = Math.floor(Math.random() * lenTabIm);
    if (nb === idIm) {      //pour ne pas avoir 2 fois la meme slide d'affilé
        (nb === lenTabIm-1) ? nb-- : nb++;    //si nb === lenTabIm nb-- sinon nb++ pour pas sortir du tableau
    }
    return (nb);
}

const nextSlide = () => {
    if (idIm < lenTabIm-1){
        idIm++;
        slide.src= tabIm[idIm]; 
    }
}
const prevSlide = () => {
    if (idIm > 0){
        idIm--;
        slide.src= tabIm[idIm]; 
    }
}
const randomSlide = () => {
    idIm = random();
        slide.src= tabIm[idIm]; 
}