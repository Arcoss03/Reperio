---

auteurs:
FRIN Arthur
BRETON Alexis
CHARPIGNON Nicolas
Kerviche Clément

---

projet annuel:
Reperio est une app web qui vise mettre en relation des candidats et des entreprises pour qu'elles puissent collaborer

---

features:
un slider pour liker ou non des candidats
un login
un register
affichage de la liste des match

---

comment faire fonctioner l'app:
Nous n'avons pas pu mettre l'app en service car
-manque de compétence en réseau
-cout d'hebergement/nom de domaine

## 1:

il faut inclure la base de donnée (fichier sql dans le dossier base data-base)
sur une data-base (sois serveur soit en local exemple avec phpmyadmin)

## 2:

il faut modifier dans V0.1/config/db.js les information de connexion la base de donné par les votres: nom de la db, url, user, mot de passe et port sur lequel tourne la db

exemple:
-->

const connection = mysql.createConnection({
host: "localhost",
user: "root",
port: "8889",
password: "root",
database: "db-reperio-v1",
});

---

## 3:

il faut enssuite lancer le serveur en allans avec un terminal dans V0.1 et lancer la commande npm start

l'adresse de l'app sera affichée dans le terminal

## piste d'erreur:

erreur de port, si votre port ou celui de la base de donné est déja utilisé

## tips:

le dossier Bank-photo met a disposition des images de CV et fiches de poste

pour acceder a l'admin aller a l'url /admin
les mots de passe de l'admin et l'utilisateur sont admin admin

des entreprises et candidats sont déja dans la base de donné
tous les mots de passe sont identiques --> test (ils sont enssuite hachés part le serveur et le hachage est stoké en db)
