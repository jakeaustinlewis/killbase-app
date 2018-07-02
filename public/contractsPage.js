document.addEventListener("DOMContentLoaded", function (event) {
    let contractSection = document.getElementById('contractSection');


    function elementMaker(parentElement, elementType, styling) {
        let element = document.createElement(elementType);
        element.style.cssText = styling;
        parentElement.append(element);
        return element;
    }

    function populateImage(contractContainer) {
        let image = elementMaker(contractContainer, `img`, `height: 150px; width: 150px;`);
        image.src = "https://goo.gl/LCquZj";
        image.alt = "contract1";
    }

    function contractInfo(contractContainer, contractName, clientName, target_location, budget, security_level) {
        let contractInfoContainer = elementMaker(contractContainer, `section`, `margin-left: 30px;`);
        let contractTitle = elementMaker(contractInfoContainer, `h3`, `margin-bottom: 15px`);
        populateContractName(contractTitle, contractName);

        populateStat(contractInfoContainer, 'Client:', clientName);
        populateStat(contractInfoContainer, 'Target Location:', target_location);
        populateStat(contractInfoContainer, 'Budget:', budget);
        populateStat(contractInfoContainer, 'Security Level:', security_level);
    }

    function populateStat(contractInfoContainer, statTitle, stat) {
        let contractStat = document.createElement('h5');
        contractStat.innerHTML = statTitle.bold() + ' ' + stat;
        contractInfoContainer.append(contractStat);
    }

    function populateContractName(contractTitle, contractName) {
        if (contractName === null) {
            contractName = 'null';
        };
        contractTitle.innerHTML = contractName;
    }

    function populateButtons(contractButtonsContainer) {
        let buttonGroup = elementMaker(contractButtonsContainer, `div`, `margin-left: 20px`)
        // let buttonGroup = document.createElement("div");
        buttonGroup.classList.add('btn-group');
        buttonGroup.setAttribute('type', 'group');
        buttonGroup.setAttribute('aria-label', 'Basic example');


        //Create Buttons
        let editButton = populateButton(buttonGroup, 'editAssassin.html', 'Edit', '#e59500');
        let deleteButton = populateButton(buttonGroup, '#', 'Delete', '#830132');
        let completeButton = populateButton(buttonGroup, '#', 'Complete', '#830132');
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

    let link = `http://localhost:8000/contracts`;

    fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {

                let contractContainer = elementMaker(contractSection, 'section', `display: flex; justify-content: space-between; margin: 40px 0px 60px 0px`);
                let PicAndInfoContainer = elementMaker(contractContainer, 'section', `display: flex;`);
                populateImage(PicAndInfoContainer);
                contractInfo(PicAndInfoContainer, data[i].target_name_id, data[i].client_id, 'taget_location', data[i].budget, 'securty level');
                let contractButtonsContainer = elementMaker(contractContainer, `section`, `display: flex; height: 50px`)
                populateButtons(contractButtonsContainer);
            }
        })
})