function bissextile(annee) {
    let result = (annee % 4 === 0 && annee % 100 != 0) || annee % 400 === 0
        ? `${annee} est une année bissextile`    // true (année bissextile)
        : `${annee} est une année commune`;      // false (année non bissextile)
    console.log(result);
}

bissextile(2000); // true (bissextile)
bissextile(2023); // false (non bissextile)
bissextile(2024); // true (bissextile)
bissextile(2025); // false (non bissextile)
bissextile(2030); // false (non bissextile)

// Pour test dans terminal VSCode, taper:
//" ...\www\runtrack3\jour01\job04> node script.js"



// - - - //* Fonction alternative *\\ - - - \\
// function bissextile(annee) {
//     return (annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0);
// }

// - - - //* Test dans la console *\\ - - - \\
// console.log(bissextile(2000));  // true (bissextile)
// console.log(bissextile(2023));  // false (non bissextile)
// console.log(bissextile(2024));  // true (bissextile)
// console.log(bissextile(2025));  // false (non bissextile)
// console.log(bissextile(2030));  // false (non bissextile)

// Pour test dans terminal VSCode, taper:
//" ...\www\runtrack3\jour01\job04> node script.js"