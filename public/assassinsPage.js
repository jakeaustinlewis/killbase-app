document.addEventListener("DOMContentLoaded", function (event) {
    assassinsContainer = document.getElementById('assassins-container');

    function populateAssassins () {
        let assassin = document.createElement("h2");
        assassins.classList.add
    }

    populateAssassins();
});


function createPalette() {
    for (let i = 0 ; i < paletteColors.length; i++) {
        let circle = document.createElement("div");
        circle.classList.add('palette');
        circle.style.backgroundColor = paletteColors[i];
        if (paletteColors[i]== 'white') {
            circle.style.border= "1px solid black";
        }
        colorPalette.append(circle);
    }
}