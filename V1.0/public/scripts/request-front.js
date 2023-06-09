//variables globales
let tabId = [];
let image = document.getElementById("imm-slide");

function load() {
  console.log("fonction load");
  // initialisation de tabId
  updateTabId(function (data) {
    console.log(data);
    tabId = data;
    if (tabId.length === 0) {
      image.setAttribute("src", "../img/no_result.gif");
    } else {
      image.setAttribute("src", `../uploads/${tabId[0].photo}`);
    }
  });

  //bouton like
  likeButton.addEventListener("click", function () {
    console.log(tabId[0].photo);
    isLiked();

    tabId = supprimerElement(tabId);
    if (tabId.length === 0) {
      updateTabId(function (data) {
        console.log(data);
        tabId = data;
        if (tabId.length > 0) {
          image.setAttribute("src", `../uploads/${tabId[0].photo}`);
        } else {
          image.setAttribute("src", "../img/no_result.gif");
        }
      });
    } else {
      image.setAttribute("src", `../uploads/${tabId[0].photo}`);
    }
    console.log(tabId);
  });
  //bouton dislike
  dislikeButton.addEventListener("click", function () {
    console.log(tabId[0].photo);
    isDisliked();

    tabId = supprimerElement(tabId);
    if (tabId.length === 0) {
      updateTabId(function (data) {
        console.log(data);
        tabId = data;
        if (tabId.length > 0) {
          image.setAttribute("src", `../uploads/${tabId[0].photo}`);
        } else {
          image.setAttribute("src", "../img/no_result.gif");
        }
      });
    } else {
      image.setAttribute("src", `../uploads/${tabId[0].photo}`);
    }
    console.log(tabId);
  });
}

function supprimerElement(tab) {
  //on supr l'élement 0 de la liste
  tab.splice(0, 1);
  return tab;
}
// fonction pour mettre à jour tabId
function updateTabId(callback) {
  $.ajax({
    type: "POST",
    url: "/request/getidtab",
    data: { message: "LISTE_ID" },
    success: function (response) {
      callback(response); // appel de la fonction de rappel avec la réponse en paramètre
    },
    error: function () {
      console.log("Erreur lors de la requête AJAX");
    },
  });
}

function isLiked() {
  $.ajax({
    type: "POST",
    url: "/request/like",
    data: { message: "IS_LIKED", other_id: tabId[0].other_id },
    success: function (response) {
      console.log(response); //confirmation de truc liké
    },
    error: function () {
      console.log("Erreur lors de la requête AJAX");
    },
  });
}

function isDisliked() {
  $.ajax({
    type: "POST",
    url: "/request/dislike",
    data: { message: "IS_DISLIKED", other_id: tabId[0].other_id },
    success: function (response) {
      console.log(response); //confirmation de message disliké
    },
    error: function () {
      console.log("Erreur lors de la requête AJAX");
    },
  });
}

load();
