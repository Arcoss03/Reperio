const prenomInput = document.getElementById('prenom');
const nomInput = document.getElementById('nom');
const slideCheckbox = document.getElementById('slide');

function updatePlaceholders() {
    if (slideCheckbox.checked) {
        prenomInput.placeholder = 'Nom de l\'entreprise';
        nomInput.placeholder = 'Liste des domaines';
    } else {
        prenomInput.placeholder = 'Prénom';
        nomInput.placeholder = 'Nom';
    }
}

slideCheckbox.addEventListener('change', updatePlaceholders);
updatePlaceholders();



