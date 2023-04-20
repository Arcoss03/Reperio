
const prenomInput = document.getElementById('prenom');
const nomInput = document.getElementById('nom');
const switchCheckbox = document.getElementById('switch');
const selectuser = document.getElementById('selectuser');

function updatePlaceholders() {
    if (switchCheckbox.checked) {
        prenomInput.placeholder = 'Nom de l\'entreprise';
        nomInput.placeholder = 'Liste des domaines';
        selectuser.innerHTML = 'Entreprise';
    } else {
        prenomInput.placeholder = 'Prénom';
        nomInput.placeholder = 'Nom';
        selectuser.innerHTML = 'Candidat';
    }
}


selectuser.addEventListener('click', function(){
    if (selectuser.textContent == 'Candidat'){
        selectuser.innerHTML = 'Entreprise';
        slideCheckbox.checked = 1;
        switchCheckbox.checked = 1;
    } else {
        selectuser.innerHTML = 'Candidat';
        slideCheckbox.checked = 0;
        switchCheckbox.checked = 0;
    }
})

switchCheckbox.addEventListener('change', updatePlaceholders);
updatePlaceholders();




