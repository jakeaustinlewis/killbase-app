document.addEventListener("DOMContentLoaded", function (event) {
    let assassinProfiles = document.getElementById('assassinProfiles');
    let inputName = document.getElementById('inputName');
    let inputAge = document.getElementById('inputAge');
    let inputCodeNames = document.getElementById('inputCodeNames');
    let inputPrice = document.getElementById('inputPrice');
    let inputImageURL = document.getElementById('inputImageURL');
    let inputRating = document.getElementById('inputRating');
    let inputWeaponOfChoice = document.getElementById('inputWeaponOfChoice');
    let inputKills = document.getElementById('inputKills');
    let inputContactInfo = document.getElementById('inputContactInfo');

    data = {
        full_name: inputName.getAttribute('value'),
        age: inputPrice.getAttribute('value'),
        price: inputPrice.getAttribute('value'),
        weapon: inputName.getAttribute('value'),
        rating: inputRating.getAttribute('value'),
        kills: inputKills.getAttribute('value'),
        contact_info: inputContactInfo.getAttribute('value')
    };

    let link = `http://localhost:8000/assassins`
    // postData(link, data)
    //     .then(data => console.log(data)) //json from response.json call
    //     .catch(error => console.error(error));


        const postData = (link, data ) => {
            // Default options are marked with *
              return fetch(link, {
                  method: "POST", // *GET, POST, PUT, DELETE, etc.
                  mode: "cors", // no-cors, cors, *same-origin
                  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: "same-origin", // include, same-origin, *omit
                  headers: {
                      "Content-Type": "application/json; charset=utf-8",
                      // "Content-Type": "application/x-www-form-urlencoded",
                  },
                  redirect: "follow", // manual, *follow, error
                  referrer: "no-referrer", // no-referrer, *client
                  body: JSON.stringify(data), // body data type must match "Content-Type" header
              })
              .then(response => response.json()) // parses response to JSON
              .catch(error => console.error(`Fetch Error =\n`, error));
          };



// for (let i = 0; i < data.length; i++) {
// let assassinContainer = elementMaker(assassinSection, 'section', `mainContainer`); 
// let picAndInfoContainer = elementMaker(assassinContainer, 'section', `flex`);

// populateImage(picAndInfoContainer);
// populateAssassinInfo(picAndInfoContainer, data[i].full_name, data[i].code_name, data[i].rating, data[i].price, data[i].kills, data[i].age, data[i].weapon, data[i].contact_info);
// let assassinsButtonsContainer = elementMaker(assassinContainer, `section`, `btn-container`) 
// populateButtons(assassinsButtonsContainer);


// }
// })
})