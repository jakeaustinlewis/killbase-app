document.addEventListener("DOMContentLoaded", function (event) {
    let assassinProfiles = document.getElementById('assassinProfiles');

    function elementMaker(parentElement, elementType, elemClass) {
        let element = document.createElement(elementType);
        element.classList.add(elemClass);
        parentElement.append(element);
        return element;
    }

    function populateImage(assassinContainer) {
        let image = elementMaker(assassinContainer, `img`, `imgSizing`); 
        image.src = "https://goo.gl/LCquZj";
        image.alt = "contract1";
    }

    function populateAssassinInfo(picAndInfoContainer, assassinName, codeName, rating, price, kills, age, weapon, contact_info) {
        let assassinInfoContainer = elementMaker(picAndInfoContainer, `section`, `infoContainer`);
        let assassinTitle = elementMaker(assassinInfoContainer, `h3`, `infoTitle`);
        populateAssassinName(assassinTitle, assassinName);

        let statContainer = elementMaker(assassinInfoContainer, `section`, `statContainer`);

        let ratingAndPriceContainer = elementMaker(statContainer, `section`, `ratingAndPriceContainer`); 
        populateStat(ratingAndPriceContainer, 'Rating:', rating);
        populateStat(ratingAndPriceContainer, 'Price:', price);

        let killsAndAgeContainer = elementMaker(statContainer, `section`, `noClass`);
        populateStat(killsAndAgeContainer, 'Kills:', kills);
        populateStat(killsAndAgeContainer, 'Age:', age);

        populateStat(assassinInfoContainer, 'Weapon:', weapon);
        populateStat(assassinInfoContainer, 'Contact:', contact_info);
    }

    function populateStat(assassinInfoContainer, statTitle, stat) {
        let assassinStat = elementMaker(assassinInfoContainer, `h5`, `noClass`);
        assassinStat.innerHTML = statTitle.bold() + ' ' + stat;
    }

    function populateAssassinName(contractTitle, contractName) {
        if (contractName === null) {
            contractName = 'null';
        };
        contractTitle.innerHTML = contractName;
    }

    function populateButtons(contractButtonsContainer) {
        //Create Buttons
        populateButton(contractButtonsContainer, 'btn-warning', 'editAssassin.html', 'Edit'); //editButton
        populateButton(contractButtonsContainer, 'btn-danger', '#', 'Delete'); //deleteButton
    }

    function populateButton(buttonGroup, buttonClass, hrefAddress, innerHTMLText) {
        let button = elementMaker(buttonGroup, 'a','buttons');
        button.classList.add('btn', buttonClass);
        button.setAttribute('role', 'button');
        button.setAttribute('href', hrefAddress);
        button.innerHTML = innerHTMLText;
    }

    let link = `http://localhost:8000/assassins`;

    fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            for (let i = 0; i < data.length; i++) {
                let assassinContainer = elementMaker(assassinSection, 'section', `mainContainer`); 
                let picAndInfoContainer = elementMaker(assassinContainer, 'section', `flex`);

                populateImage(picAndInfoContainer);
                populateAssassinInfo(picAndInfoContainer, data[i].full_name, 'codeName', data[i].rating, data[i].price, data[i].kills, data[i].age, data[i].weapon, data[i].contact_info);
                let assassinsButtonsContainer = elementMaker(assassinContainer, `section`, `btn-container`) 
                populateButtons(assassinsButtonsContainer);
            }
        })
})