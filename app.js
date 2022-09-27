document.querySelector("#search").addEventListener("click", () => {
	let entry = document.querySelector("input").value;
	//    console.log('search clicked for ' + entry);
	displayDetails(entry);
});

document.querySelector("#clear").addEventListener("click", () => {
	document.querySelector("main").innerHTML = "";
});

const displayDetails = async (entry) => {
	//    console.log('@ displayDetails ' + entry);
	try {
		let JSONData = await getCountry(entry);
		//      console.log(' @ try block ' + JSONData.status);
		createCard(JSONData);
	} catch {
		console.log("Something went wrong @ displayDetails method");
	}
};

const getCountry = async (entry) => {
	//    console.log('@ getCountry ' + entry);

	const response = await fetch(`https://restcountries.com/v3.1/name/${entry}`);
	const data = await response.json();

	// out of the given countries select the one that has the most population.
	return data[0];
};

const createCard = (country) => {
	console.log(country.startOfWeek); // string, number
	console.log(country.continents[0]); // array
	console.log(country.flags["svg"]); // JSON Object
	console.log(Object.values(country.flags)[1]); // JSON Object
	let cardCountry = `
    <div class="card country-card col col-sm-6 col-lg-3 py-3">
      <img
        src="https://flagcdn.com/ca.svg"
        class="card-img-top border border-secondary"
        alt="Flag"
      />
      <div class="card-body">
        <h5 class="card-title">Canada</h5>
        <p class="card-text">Americas</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <span><i class="fas fa-2x fa-landmark"></i>Ottawa</span>
        </li>
        <li class="list-group-item">
          <span><i class="fas fa-lg fa-users"></i>38.01 M</span>
        </li>
        <li class="list-group-item">
          <span><i class="fas fa-lg fa-comments"></i>English,French</span>
        </li>
        <li class="list-group-item">
          <span
            ><i class="fas fa-lg fa-money-bill-wave"></i>Canadian dollar $
          </span>
        </li>
      </ul>
    </div>
    `;
};
