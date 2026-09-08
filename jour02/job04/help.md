#### 1. Concepts clés vulgarisés : Événements clavier, focus, et expressions régulières
- Événements clavier : Penser au clavier comme un messager. Chaque fois que l'on presse une touche, le navigateur envoie un "message" (événement) à JavaScript. 'keypress' est comme un signal "Hé, une touche a été pressée et relâchée !" – idéal pour capturer des caractères. Contrairement à 'keydown' (appui) ou 'keyup' (relâchement), 'keypress' est fait pour les lettres/chiffres.
- Pourquoi global sur window ? Parce que ça capture les touches partout sur la page, pas seulement dans un élément spécifique. C'est comme avoir un micro omniprésent.
- Focus : Le "focus" est comme l'attention de la page. Si l'on clique dans le textarea, il devient "actif" (curseurs clignotant). 'document.activeElement' dit qui a l'attention en ce moment. Ici, on double l'ajout si le textarea est focus – comme un bonus pour interaction directe.
- Expressions régulières (regex) : C'est un outil pour "matcher" des patterns dans du texte. [a-z] signifie "n'importe quelle lettre minuscule de a à z". C'est comme un filtre : si la touche n'est pas une lettre simple, on l'ignore. Pas de majuscules ou chiffres ici, pour respecter les consignes.
#### 2. Pourquoi ces choix de fonctions et méthodes ?
- addEventListener pour 'keypress' : J'ai choisi 'keypress' parce qu'il est spécifique aux caractères (évite les touches comme Shift ou Enter). window pour capture globale, pas limité à un élément. Pas d'onkeypress dans le HTML – propre et moderne.
- e.preventDefault() : Essentiel pour prendre le contrôle. Sans ça, le navigateur ajouterait la lettre automatiquement dans le textarea (ou ailleurs), causant des doublons ou conflits. C'est comme dire "Non merci, je gère !".
- Regex avec .match() : Simple et efficace pour filtrer les lettres. Pas de boucle compliquée – juste un test booléen. J'ai limité à [a-z] pour éviter les majuscules (facilement extensible si besoin).
- document.activeElement : La façon standard de détecter le focus. Plus fiable que des flags manuels. Compare directement à l'élément stocké.
- Concaténation avec += : Modifie value du textarea directement. Rapide pour du texte simple. Pas de innerHTML (pas pour inputs).
- console.log pour débogage :– bon réflexe ! Affiche l'objet pour vérifier la sélection DOM.
#### 3. Éléments importants à retenir
- Différences entre événements clavier : 'keypress' est obsolète dans certains contextes modernes (préférer 'keydown' + e.key). Mais pour ce job, c'est ok. Retiens : 'keydown' pour toutes touches, 'keypress' pour caractères.
- Performance : 'keypress' se déclenche souvent – si ton code est lourd, ça peut lagger. Ici, c'est léger, mais évite les calculs complexes dans la fonction.
- Sécurité et éthique : Un vrai keylogger est illégal/malveillant. Ici, c'est éducatif – apprends à manipuler les inputs sans abuser.
- Compatibilité : e.key est moderne ; anciens navigateurs utilisent e.which. Teste sur Chrome/Firefox.
- Bonnes pratiques : Utilise defer pour que le DOM soit prêt. Stocke les éléments dans des variables pour éviter les recherches répétées.
#### 4. Problèmes potentiels que tu pourrais rencontrer et solutions
- Problème 1 : Lettres pas ajoutées ou ajoutées partout : Cause – Pas de preventDefault, ou regex trop strict. Solution : Vérifie console.log(e.key) pour voir ce qui est capturé. Ajuste regex si besoin (e.g., [a-zA-Z] pour majuscules).
- Problème 2 : Focus pas détecté : Cause – Erreur dans la comparaison. Solution : console.log(document.activeElement) pour déboguer. Assure-toi que l'id est correct.
- Problème 3 : Événements pas déclenchés sur mobile : Cause – Claviers virtuels. Solution : Ajoute 'input' event sur le textarea pour complément.
- Problème 4 : Console pleine d'erreurs : "keylogger is null" – DOM pas prêt. Solution : Avec defer, ok ; sinon, enveloppe dans DOMContentLoaded.
- Problème 5 : Majuscules ignorées : Cause – Regex limité. Solution : Étends à [a-zA-Z], mais vérifie si c'est voulu.
- Astuce générale : Teste en tapant dans le textarea et hors (e.g., dans l'URL bar). Utilise F12 pour inspecter.