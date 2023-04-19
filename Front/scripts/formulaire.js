const prenomInput = document.getElementById('prenom');
const nomInput = document.getElementById('nom');
const slideCheckbox = document.getElementById('slide');
const selectuser = document.getElementById('selectuser');

function updatePlaceholders() {
    if (slideCheckbox.checked) {
        prenomInput.placeholder = 'Nom de l\'entreprise';
        nomInput.placeholder = 'Liste des domaines';
        selectuser.innerHTML = 'Entreprise';
    } else {
        prenomInput.placeholder = 'Prénom';
        nomInput.placeholder = 'Nom';
        selectuser.innerHTML = 'Candidat';
    }
}

slideCheckbox.addEventListener('change', updatePlaceholders);
updatePlaceholders();



