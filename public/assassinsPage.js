document.addEventListener("DOMContentLoaded", function (event) {
    assassinPicAndInfo = document.getElementById('assassinPicAndInfo');
    assassinButtons = document.getElementById('assassinButtons');


    let link = `http://localhost:8000/assassins`;

    fetch(link)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            // let myPhotos = document.getElementById('myPhotos'); //my Photos is a section containing the populated photos
            // let assassinsArray = data.assassins;

            //Add photos from API to myPhotos (parent element)
            // for (let i = 0; i < publicPhotosArray.length; i++) {

                // Adding image

            // }
        })

    function populateAssassins() {
        function populateImage() {
            let image = document.createElement('img');
            image.src = "https://goo.gl/LCquZj";
            image.alt = "assassin1";
            assassinPicAndInfo.append(image);
        }

        function populateAssassinName() {
            let assassin = document.createElement("h3");
            assassin.innerHTML = 'Assassin One';
            assassinPicAndInfo.append(assassin);
        }

        function populateEditButton() {
            let editButton = document.createElement("");



            assassinButtonParams
        }
        populateImage();
        populateAssassinName();
    }
    populateAssassins();
});