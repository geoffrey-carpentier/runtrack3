function citation() {
    let content = document.getElementById("citation").textContent;
    console.log(content);
}

document.getElementById("button").addEventListener("click", citation);




// Alternative






// Alternative

// const element = document.getElementById("citation");
// const button = document.getElementById("button");

//?Condition de vérification de constante non nulle
// if (element && button) {
//     const citation = () => {
//         console.log(element.textContent);
//     };

//     button.addEventListener("click", citation);