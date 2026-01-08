function isPremier(n) {
    result = true;
    if (n == 0 || n == 1) {
        return false;
    }
    for (i = 2; i<=n-1; i++) {
        if (n % i == 0) {
            result = false;
        }
    }
    return result;
}
function sommeNombresPremiers(nb1,nb2) {
    if (isPremier(nb1) && isPremier(nb2)) {
        return nb1 + nb2;
    }
    else {
        return false;
    }
}
console.log(sommeNombresPremiers(3, 5));  
console.log(sommeNombresPremiers(4, 5));  
console.log(sommeNombresPremiers(7, 11)); 
console.log(sommeNombresPremiers(8, 10));


// Pour test dans terminal VSCode, taper:
//" ...\www\runtrack3\jour01\job08> node script.js"