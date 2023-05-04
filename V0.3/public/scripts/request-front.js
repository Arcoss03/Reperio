//variables globales
let tabId = [];
let tabChoice = 0;
let image = document.getElementById("imm-slide");

function load() {
  console.log("fonction load");
  getIdTab(function (data) {
    console.log(data); // on utilise ici la réponse AJAX retournée
    tabId = data;
  });

  like.addEventListener("click", function () {
    document.getElementById("imm-slide");
    console.log(tabId[tabChoice].photo);
    image.setAttribute("src", `../uploads/${tabId[tabChoice].photo}`);
    tabChoice++;
  });
}

function getIdTab(callback) {
  msg = "SELECT user_id, photo FROM `users`";
  $.ajax({
    type: "POST",
    url: "hello",
    data: { message: msg },
    success: function (response) {
      callback(response); // appel de la fonction de rappel avec la réponse en paramètre
    },
    error: function () {
      console.log("Erreur lors de la requête AJAX");
    },
  });
}

load();
