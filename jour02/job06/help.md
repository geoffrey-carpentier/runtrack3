#### 1. Concepts clés vulgarisés : Séquences d'événements, keydown, et classes CSS dynamiques
- **Séquences d'événements** : Ici, le code Konami est une "recette" : chaque touche doit être pressée dans le bon ordre. Si erreur, à recommencer. C'est comme un mot de passe visuel, mais avec le clavier.
-- Pourquoi un array ? C'est une liste ordonnée – facile à vérifier étape par étape.
- **keydown vs keypress** : 'keydown' est comme "le doigt appuie sur la touche" (déclenché à l'appui). 'keypress' est plus pour les caractères. Ici, 'keydown' capture les flèches (ArrowUp, etc.) et lettres (b, a) parfaitement, sans distinction maj/min.
- **Classes CSS dynamiques** : classList.add() ajoute une classe à un élément HTML, comme coller une étiquette. Ça déclenche des styles CSS automatiquement. Ici, '.konami' change le look de la page – comme un mode "super" activé.
#### 2. Pourquoi ces choix de fonctions et méthodes ?
- **Array pour la séquence** : Simple et lisible. Les noms de touches (e.g., 'ArrowUp') sont standards en JS moderne.
- **window.addEventListener('keydown')** : Global pour capturer partout. 'keydown' pour toutes touches, y compris flèches. Pas de preventDefault ici, car on ne bloque pas l'entrée – juste on écoute.
- **Index pour tracking** : Variable compteur pour suivre le progrès. Incrémente si correct, reset si erreur. Efficace et sans complexité.
- **classList.add()** : Méthode moderne pour manipuler classes. Plus propre que element.className += ' konami'. Permet des transitions CSS douces.
Réinitialisation : Après activation, reset l'index pour rejouer. Évite de bloquer après une fois.
- **CSS avec ::before** : Ajoute du contenu dynamique via CSS (pas JS). Fun pour afficher un message sans polluer le HTML.
#### 3. Éléments importants à retenir
- **Ordre et timing** : La séquence doit être exacte et rapide – pas de pause longue, sinon l'index reset. C'est comme un combo dans un jeu.
- **Compatibilité** : e.key est moderne ; anciens navigateurs utilisent e.code ou e.which. Teste sur mobile (peu de claviers physiques).
- **Performance** : Léger, mais évite les séquences trop longues pour ne pas frustrer.
- **Sécurité** : Pas malveillant ici, mais rappelle que capturer les touches peut être invasif – utilise éthiquement.
- **Bonnes pratiques** : Stocke la séquence dans une const pour éviter les modifications accidentelles.
4. Problèmes potentiels que tu pourrais rencontrer et solutions
- **Problème 1 - Code non détecté**: Cause – Séquence tapée trop lentement ou erreurs de casse. Solution : console.log(e.key) pour vérifier les touches. Étends le timeout si besoin (ajoute un timer pour reset après 5s).
- **Problème 2 - Styles non appliqués** : Cause – Classe CSS manquante. Solution : Vérifie que .konami est définie. Utilise console.log(document.body.classList) pour confirmer.
- **Problème 3 - Flèches non capturées** : Cause – Focus dans un input. Solution : window capture globalement, mais teste en cliquant hors des éléments.
- **Problème 4 - Erreurs console** : "e.key undefined" – Navigateur ancien. Solution : Utilise e.code (e.g., 'ArrowUp' devient 'ArrowUp').
- **Problème 5 - Pas de feedback** : Cause – Pas de message. Solution : Ajoute une alerte ou son (avec Audio API).
Astuce générale : Teste la séquence étape par étape. Pour plus de fun, ajoute un son ou animation.