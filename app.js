document.querySelector('#search').addEventListener('click', () => {
    let entry = document.querySelector('input').value;
//    console.log('search clicked for ' + entry);
    displayDetails(entry);
})

document.querySelector('#clear').addEventListener('click', () => {
    document.querySelector('main').innerHTML = '';
})

const displayDetails = async (entry) => {
//    console.log('@ displayDetails ' + entry);
    try{
        let JSONData = await getCountry(entry);
//      console.log(' @ try block ' + JSONData);
        createCard(JSONData, true);
        if(JSONData.borders){
//          console.log(JSONData.borders);
            for(border of JSONData.borders){
                let borderData = await getBorder(border);
                createCard(borderData, false);
            }
        }else{
            displayWarning("Don't have border country");
        }
    }catch{
        console.log('Something went wrong @ displayDetails method');
        displayWarning('Something went wrong @ displayDetails method');
    }
}

const getCountry = async (entry) => {
//    console.log('@ getCountry ' + entry);
    const response = await fetch(`https://restcountries.com/v3.1/name/${entry}`);
    const data = await response.json();
    
    // out of the given countries select the one that has the most population.
    return data[0];
}

const getBorder = async(country) => {
    return await axios.get(`https://restcountries.com/v3.1/alpha/${country}`)
                      .then((res) => res.data[0]);
}

const createCard = (country, mainCountry) => {
    /*
    console.log(country.startOfWeek); // string, number
    console.log(country.continents[0]); // array
    console.log(country.flags['svg']); // JSON Object
    console.log(Object.values(country.flags)[1]); // JSON Object
    */
    console.log(country);
    let countryCard = 
    `
    <div class="card ${mainCountry ? 'country-card' : 'neighbour'} col col-sm-6 col-lg-3 py-3">
      <img
        src="${country.flags['svg']}"
        class="card-img-top border border-secondary"
        alt="Flag"
      />
      <div class="card-body">
        <h5 class="card-title">${country.name['common']}</h5>
        <p class="card-text">${country.region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <span><i class="fas fa-2x fa-landmark"></i>${country.capital}</span>
        </li>
        <li class="list-group-item">
          <span><i class="fas fa-lg fa-users"></i>
          ${(country.population / 1000000).toFixed(2)} M</span>
        </li>
        <li class="list-group-item">
          <span><i class="fas fa-lg fa-comments"></i>${Object.values(country.languages)}</span>
        </li>
        <li class="list-group-item">
          <span><i class="fas fa-lg fa-money-bill-wave"></i>
          ${Object.values(country.currencies)[0].name} - ${Object.values(country.currencies)[0].symbol}
          </span>
        </li>
      </ul>
    </div>
    `;

    const countryCardsHolder = 
    `
    <div class="container country">
        <div class="row justify-content-center mt-5">
            ${countryCard}
        </div>
        <div class="row justify-content-start neighbour-container">
        </div>
    </div>
    `;

    if(mainCountry){
        document.querySelector('main').insertAdjacentHTML('afterbegin', countryCardsHolder);
    }else{
        let neighbourDiv = `<div class="card col col-sm-6 col-lg-3 py-3 neighbour">${countryCard}</div>`
        document.querySelector('.neighbour-container').insertAdjacentHTML("beforeend", countryCard);
    }
}

const displayWarning = (msg) => {
    let warningBox = document.createElement('div');

    warningBox.classList.add('alert', 'alert-danger', 'mt-3');
    warningBox.innerText = msg;

    document.querySelector('.input-section').insertAdjacentElement("beforeend", warningBox);

    setTimeout(() => {warningBox.remove()}, 7000);
}