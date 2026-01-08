Jour 1 - Hello JS Que la force soit avec toi …

- Job 00

Créez sur github un répertoire nommé “runtrack3”. Dans ce répertoire, créez un dossier “jour01”, partagez le avec deepthoughtlaplateforme. Pour chaque job, créez un dossier “jobXX” où XX est le numéro du job. N’oubliez pas d’envoyer vos modiﬁcations dès qu’un job est avancé ou terminé et mettez des commentaires explicites lors de vos commits.

- Job 01

Créez un ﬁchier index.php contenant les balises html de base (doctype, html, head, body). Dans la balise head, ajoutez une ligne de code javascript permettant d’aﬃcher une popup qui contient le texte “Hello Javascript!”.

(fenêtre popup):
"
Cette page indique

Hello Javascript !
(bouton [OK])
"

- Job 02

Récupérez une copie de votre ﬁchier index.php.
Créez un ﬁchier script.js.
Modiﬁez vos ﬁchiers de sorte à ce que l’aﬃchage de la popup se fasse maintenant dans le ﬁchier script.js.

- Job 03

Récupérez une copie de vos ﬁchiers index.php et script.js.
Modiﬁer l’aﬃchage de sorte à ce que le message ne soit plus écrit dans une popup mais dans la console web. Assurez-vous que tout est bien fonctionnel.

(dans console)
"
Hello Javascript ! index.html : 9

> "

- Job 04

Maintenant que vous savez comment inclure du javascript et que vous maitrisez la console web, vous allez pouvoir explorer davantage la syntaxe, la grammaire et le lexique du langage javascript.

Pour l’ensemble des exercices suivants, vous devez rendre un ﬁchier script.js contenant le rendu de l’exercice et un ﬁchier index.php qui l’inclut.

Déclarez une fonction “bissextile” qui prend en paramètre une variable “année”. Si l’année est bissextile, la fonction retourne true, sinon elle retourne false.

- Job 05

Créez une fonction “aﬃcherjourssemaines”. Cette fonction ne prend pas de paramètre. Créez un tableau de strings “jourssemaines” qui contient l’ensemble des jours de la semaine, du Lundi au Dimanche. Ensuite à l’aide d’une boucle for (for!) aﬃchez un par un ces jours:

(dans console)

"
Lundi
Mardi
Mercredi
Jeudi
Vendredi
Samedi
Dimanche

> "

- Job 06

Créez une fonction ﬁzzbuzz qui ne prend pas de paramètre. Dans cette fonction, aﬃchez dans la console web les nombres de 1 à 151. Remplacez certains nombres par un mot selon les conditions suivantes :
● Si le nombre est un multiple de 3, aﬃchez “Fizz”.
● Si le nombre est un multiple de 5, aﬃchez “Buzz”.
● Si le nombre est un multiple de 3 et de 5, aﬃchez “FizzBuzz”.

- Job 07

Créez une fonction “jourtravaille” qui prend en paramètre une date au format Date. Si la date correspond à un jour férié de l’année 2020, la fonction aﬃche “Le $jour $mois $année est un jour férié”. Si elle correspond à un samedi ou un dimanche, alors le message aﬃché est “Non, $jour $mois $année est un week-end”, sinon aﬃcher “Oui, $jour $mois $année est un jour travaillé”.

$jour correspond au numéro du jour, $mois au mois et $année à l’année.
Les jours fériés sont référencés sur
https://demarchesadministratives.fr/actualites/calendrier-des-jours-feries-2019-2020-2021

Exemple :
(dans console)

"
Le samedi 1 janvier 2022 est un jour férié index.html : 20
Oui, jeudi 9 juin 2022 est un jour férié index.html : 26
Non, samedi 25 juin 2022 est un week-end index.html : 23
"

- Job 08

Créez une fonction “sommenombrespremiers” qui prend en paramètres deux variables. Si ces deux variables sont des nombres premiers, alors la fonction retourne leur somme. Sinon, la fonction retourne false.

- Job 09

Créez une fonction “tri” qui prend en paramètres un tableau de nombres nommé “numbers” et une variable “order” qui contient “asc” ou “desc”. A l’aide de la fonction sort() d’un algorithme développé par vos soins, cette fonction doit trier le tableau dans l’ordre ascendant ou décroissant, selon le paramètre passé, puis retourner le tableau.

Rendu

Le projet est à rendre sur https://github.com/prenom-nom/runtrack3. Dossiers “jourXX” -> “jobXX”. Fichiers nommés index.php et script.js
Pensez à donner les droits sur le répertoire à deepthoughtlaplateforme !

Compétences visées

● Utiliser la console
● Créer des fonctions en javascript
● Utiliser les boucles en javascript
● Algorithmie

https://calendrier.api.gouv.fr/jours-feries/metropole/${anne}.json
