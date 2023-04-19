const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");
const slideCheckbox = document.getElementById("slide");
const selectuser = document.getElementById("selectuser");

function updatePlaceholders() {
  if (slideCheckbox.checked) {
    prenomInput.placeholder = "Nom de l'entreprise";
    nomInput.placeholder = `Domaine d'activité`;
    selectuser.innerHTML = "Entreprise";
  } else {
    prenomInput.placeholder = "Prénom";
    nomInput.placeholder = "Nom";
    selectuser.innerHTML = "Candidat";
  }
}

selectuser.addEventListener("click", function () {
  if (selectuser.textContent == "Candidat") {
    selectuser.innerHTML = "Entreprise";
    slideCheckbox.checked = 1;
  } else {
    selectuser.innerHTML = "Candidat";
    slideCheckbox.checked = 0;
  }
});

slideCheckbox.addEventListener("change", updatePlaceholders);
updatePlaceholders();
