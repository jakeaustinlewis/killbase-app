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
            let buttonGroup = document.createElement("div");
            buttonGroup.classList.add('btn-group btn-group-toggle');
            buttonGroup.setAttribute('data-toggle', 'buttons');
            assassinButtons.append(buttonGroup);
            // populateEditButtonLabel(buttonGroup);
            EditButtonLabel();
            // function populateEditButtonLabel(buttonGroup) {

                function EditButtonLabel() {
                    let editLabel = document.createElement('label');
                    editLabel.classList.add('btn btn-secondary');
                    buttonGroup.append('editLabel');

                    function EditButtonInput() {
                        editButtonInput = document.createElement('input');
                        editButtonInput.setAttribute('type', 'radio')
                    }

                

            }
            

            assassinButtons.append();

            let editButton = document.createElement("label");
            editButton.style.backgroundColor('#e59500');




            assassinButtonParams
        }
        populateImage();
        populateAssassinName();
    }
    populateAssassins();
});