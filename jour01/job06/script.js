
function fizzbuzz() {
    for (let i=1; i<=151; i++) {
        if (i % 3 === 0 && i % 5 === 0) { // Vérifie la divisibilité par 3 ET 5 (donc par 3 x 5 -> multiples de 15)
            console.log("FizzBuzz"); // Affiche "FizzBuzz" dans la console
        }  else if (i % 3 === 0) { // Sinon (si pas divisible par 3 et 5), si divisible par 3
            console.log("Fizz");   // Affiche "Fizz" dans la console
        }  else if (i % 5 === 0) {  // Sinon (si pas divisible par 3 et 5), si divisible par 5
            console.log("Buzz");  // Affiche "Buzz" dans la console
        }  else {  // Sinon (si pas divisible par 3 et 5 ou 3 ou 5)
            console.log(i);  // Affiche le nombre dans la console
        }
    }
}

fizzbuzz();  //* Appel de la fonction fizzbuzz pour afficher dans la console web 
// Pour test dans terminal VSCode, taper:
//" ...\www\runtrack3\jour01\job06> node script.js"