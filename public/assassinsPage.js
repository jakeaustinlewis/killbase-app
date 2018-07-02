document.addEventListener("DOMContentLoaded", function (event) {
    let assassinProfiles = document.getElementById('assassinProfiles');


    function assassinProfileContainer(assassinProfiles) {
        let assassinProfileContainer = document.createElement('section');
        assassinProfileContainer.style.cssText = `display: flex; justify-content: space-between; margin: 40px 0px 60px 0px`;
        assassinProfiles.append(assassinProfileContainer);
        return assassinProfileContainer;
    }

    function picAndInfoContainer(assassinProfileContainer) {
        let assassinPicAndInfoContainer = document.createElement('section');
        assassinPicAndInfoContainer.style.cssText = `display: flex;`;
        assassinProfileContainer.append(assassinPicAndInfoContainer);
        return assassinPicAndInfoContainer;
    }

    function populateImage(assassinPicAndInfo) {
        let image = document.createElement('img');
        image.src = "https://goo.gl/LCquZj";
        image.alt = "assassin1";
        image.style.cssText = `height: 150px; width: 150px;`;
        assassinPicAndInfo.append(image);
    }

    function assassinInfo(assassinPicAndInfo, assasinName, codeName, rating, price, kills, age, weapon, contact_info) {
        let assassinInfoContainer = document.createElement('section');
        assassinInfoContainer.append(populateAssassinName(assasinName, codeName));
        assassinInfoContainer.style.marginLeft = '30px';

        let statContainer = document.createElement('section');

        statContainer.style.cssText = `display: flex; flex-wrap: wrap;`;

        let ratingAndPriceContainer = document.createElement('section');
        ratingAndPriceContainer.style.marginRight = '30px';
        ratingAndPriceContainer.append(populateStat('Rating:', rating));
        ratingAndPriceContainer.append(populateStat('Price:', price));
        statContainer.append(ratingAndPriceContainer);

        let killsAndAgeContainer = document.createElement('section');
        killsAndAgeContainer.append(populateStat('Kills:', kills));
        killsAndAgeContainer.append(populateStat('Age:', age));
        statContainer.append(killsAndAgeContainer);

        assassinInfoContainer.append(statContainer);

        assassinInfoContainer.append(populateStat('Weapon:', weapon));
        assassinInfoContainer.append(populateStat('Contact:', contact_info));

        assassinPicAndInfo.append(assassinInfoContainer);
    }

    function populateStat(statTitle, stat) {
        let assassinStat = document.createElement('h5');
        assassinStat.innerHTML = statTitle.bold() + ' ' + stat;
        return assassinStat;
    }


    function populateAssassinName(assassinName, codeName) {
        let assassin = document.createElement("h3");
        if (assassinName===null) {assassinName='null'};
        assassin.innerHTML = assassinName.bold() + ' (' + codeName + ')';
        assassin.style.cssText = `margin-bottom: 15px`;
        return assassin;
    }


    function buttonsContainer(assassinProfileContain) {
        let assassinButtonsContainer = document.createElement("section");
        assassinButtonsContainer.style.cssText = `display: flex; height: 50px`;
        assassinProfileContain.append(assassinButtonsContainer);
        populateButtons(assassinButtonsContainer);
    }

    function populateButtons(assassinButtonsContainer) {
        let buttonGroup = document.createElement("div");
        buttonGroup.classList.add('btn-group');
        buttonGroup.setAttribute('type', 'group');
        buttonGroup.setAttribute('aria-label', 'Basic example');
        buttonGroup.style.cssText = `margin-left: 20px`;
        assassinButtonsContainer.append(buttonGroup);

        //Create Buttons
        let editButton = populateButton(buttonGroup, 'editAssassin.html', 'Edit', '#e59500');
        let deleteButton = populateButton(buttonGroup, '#', 'Delete', '#830132');
    }

    function populateButton(buttonGroup, hrefAddress, innerHTMLText, bgColor) {
        let editButton = document.createElement('a');
        editButton.classList.add('btn');
        editButton.setAttribute('type', 'button');
        editButton.setAttribute('href', hrefAddress);
        editButton.innerHTML = innerHTMLText;
        editButton.style.backgroundColor = bgColor;
        buttonGroup.append(editButton);
    }

    let link = `http://localhost:8000/assassins`;

    fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            for (let i = 0; i < data.length; i++) {
                
                let assassinProfileContain = assassinProfileContainer(assassinProfiles);
                let assassinPicAndInfoCont = picAndInfoContainer(assassinProfileContain);
                populateImage(assassinPicAndInfoCont);
                assassinInfo(assassinPicAndInfoCont, data[i].full_name, 'codeName', data[i].rating, data[i].price, data[i].kills, data[i].age, data[i].weapon, data[i].contact_info);
                buttonsContainer(assassinProfileContain);
            }
        })
})