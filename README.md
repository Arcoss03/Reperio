# Reperio

## Auteurs

- Arthur Frin
- Alexis Breton
- Nicolas Charpignon
- Clément Kerviche

## Projet annuel

Reperio est une application web qui vise à connecter des demandeurs d'emploi avec des entreprises pour qu'il puissent facilement collaborer.

## Fonctionnalités

- Un admin pour voir les utilisateurs
- Un slider pour aimer ou ne pas aimer les candidats
- Connexion a l'app
- Inscription
- Affichage de la liste des matchs

## Comment faire fonctionner l'application

Nous n'avons pas pu déployer l'application en raison de :

- Un manque de compétences en réseau
- Les coûts d'hébergement/nom de domaine

### Étape 1 : Inclure la base de données

Vous devez inclure la base de données (fichier SQL dans le dossier "base data-base") sur une base de données (soit sur un serveur, soit en local, par exemple avec PHPMyAdmin).

### Étape 2 : Modifier les informations de connexion

Vous devez modifier les informations de connexion à la base de données dans V0.1/config/db.js pour correspondre à votre base de données : nom de la base de données, URL, utilisateur, mot de passe et port.

Exemple :
```
const connection = mysql.createConnection({
host: "localhost",
user: "root",
port: "8889",
password: "root",
database: "db-reperio-v1",
});
```
### Étape 3 : Lancer le serveur

Après avoir modifié les informations de connexion à la base de données, exécutez le serveur en accédant à V1.0 dans un terminal et en exécutant la commande "npm start". L'adresse de l'application sera affichée dans le terminal.

## Résolution des problèmes

Si le port que vous utilisez est déjà utilisé, une erreur peut se produire.

## Conseils

- Le dossier "Bank-photo" fournit des images de CV et de fiches de poste.
- Pour accéder à la page d'administration, accédez à l'URL /admin.
  utilisateur: "admin"
  mot de passe: "admin"

- Les entreprises et les candidats sont déjà dans la base de données. Tous les mots de passe sont les mêmes:

mot de passe des utilisateurs: "test"

(ils sont ensuite hachés par le serveur et stockés dans la base de données).
