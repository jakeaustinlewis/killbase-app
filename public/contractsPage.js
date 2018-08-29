document.addEventListener("DOMContentLoaded", function (event) {
    let contractSection = document.getElementById('contractSection');

    function elementMaker(parentElement, elementType, elemClass) {
        let element = document.createElement(elementType);
        element.classList.add(elemClass);
        parentElement.append(element);
        return element;
    }

    function populateImage(PicAndInfoContainer, targetPhoto) {
        let image = elementMaker(PicAndInfoContainer, `img`, `imgSizing`); 
        image.src = targetPhoto;
        image.alt = `contractPhoto`;
    }

    function populateContractInfo(PicAndInfoContainer, targetName, clientName, targetLocation, budget, securityLevel) {
        let contractInfoContainer = elementMaker(PicAndInfoContainer, `section`, `infoContainer`); //infoContainer
        let contractTitle = elementMaker(contractInfoContainer, `h3`, `infoTitle`);
        populateContractName(contractTitle, targetName);

        populateStat(contractInfoContainer, 'Client:', clientName);
        populateStat(contractInfoContainer, 'Target Location:', targetLocation);
        populateStat(contractInfoContainer, 'Budget:', budget);
        populateStat(contractInfoContainer, 'Security Level:', securityLevel);
    }

    function populateStat(contractInfoContainer, statTitle, stat) {
        let contractStat = elementMaker(contractInfoContainer, `h5`, `noClass`);
        contractStat.innerHTML = statTitle.bold() + ' ' + stat;
    }

    function populateContractName(contractTitle, targetName) {
        if (targetName === null) {
            targetName = 'null';
        };
        contractTitle.innerHTML = targetName.bold();
    }

    function populateButtons(contractButtonsContainer) {
        populateButton(contractButtonsContainer, 'btn-warning', 'editAssassin.html', 'Edit'); //editButton
        populateButton(contractButtonsContainer, 'btn-danger', '#', 'Delete'); //deleteButton
        populateButton(contractButtonsContainer, 'btn-success', '#', 'Complete'); //completeButton
    }

    function populateButton(buttonGroup, buttonClass, hrefAddress, innerHTMLText) {
        let button = elementMaker(buttonGroup, 'a', 'buttons');
        button.classList.add('btn', buttonClass);
        button.setAttribute('role', 'button');
        button.setAttribute('href', hrefAddress);
        button.innerHTML = innerHTMLText.bold();
    }

    let link = `http://localhost:8000/contracts`;

    fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                
                let contractContainer = elementMaker(contractSection, 'section', `mainContainer`); 
                let PicAndInfoContainer = elementMaker(contractContainer, 'section', `flex`);
                populateImage(PicAndInfoContainer, data[i].target_photo);
                populateContractInfo(PicAndInfoContainer, data[i].target_name, data[i].client_name, data[i].target_location, data[i].contract_budget, data[i].target_security_level);
                let contractButtonsContainer = elementMaker(contractContainer, `section`, `btn-container`) 
                populateButtons(contractButtonsContainer);
            }
        })
})

