document.addEventListener("DOMContentLoaded", function (event) {
    let contractSection = document.getElementById('contractSection');

    function elementMaker(parentElement, elementType, elemClass) {
        let element = document.createElement(elementType);
        element.classList.add(elemClass);
        parentElement.append(element);
        return element;
    }

    function populateImage(PicAndInfoContainer) {
        let image = elementMaker(PicAndInfoContainer, `img`, `imgSizing`); 
        image.src = "https://goo.gl/LCquZj";
        image.alt = "contract1";
    }

    function populateContractInfo(PicAndInfoContainer, contractName, clientName, target_location, budget, security_level) {
        let contractInfoContainer = elementMaker(PicAndInfoContainer, `section`, `infoContainer`); //infoContainer
        let contractTitle = elementMaker(contractInfoContainer, `h3`, `infoTitle`);
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
        //Create Buttons
        populateButton(contractButtonsContainer, 'btn-warning', 'editAssassin.html', 'Edit'); //editButton
        populateButton(contractButtonsContainer, 'btn-danger', '#', 'Delete'); //deleteButton
        populateButton(contractButtonsContainer, 'btn-success', '#', 'Complete'); //completeButton
    }

    function populateButton(buttonGroup, buttonClass, hrefAddress, innerHTMLText) {
        let button = elementMaker(buttonGroup, 'a', 'buttons');
        button.classList.add('btn', buttonClass);
        button.setAttribute('role', 'button');
        button.setAttribute('href', hrefAddress);
        button.innerHTML = innerHTMLText;
    }

    let link = `http://localhost:8000/contracts`;

    fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                
                let contractContainer = elementMaker(contractSection, 'section', `mainContainer`); 
                let PicAndInfoContainer = elementMaker(contractContainer, 'section', `flex`);
                populateImage(PicAndInfoContainer);
                populateContractInfo(PicAndInfoContainer, data[i].target_name_id, data[i].client_id, 'taget_location', data[i].budget, 'securty level');
                let contractButtonsContainer = elementMaker(contractContainer, `section`, `btn-container`) 
                populateButtons(contractButtonsContainer);
            }
        })
})

