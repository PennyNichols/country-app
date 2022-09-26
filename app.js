//  CRUD -> create read update delete
// Axios vs Fetch
// ready to use
// axios (-)
// fetch (+)
// use of collected data
// axios (+)
// fetch (-)
// error handling
// axios (+)
// fetch (-)

const dataFetch = fetch("https://restcountries.com/v3.1/name/Canada")
	.then((response) => {
		if (!response.ok) {
			throw Error("Failed");
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(`We have an issue ${error}`);
	});

const dataAxios = axios
	.get("https://restcountries.com/v3.1/name/Canada")
	.then((response) => {
		console.log(response);
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(`We have an issue ${error}`);
	});

console.log(dataFetch);
console.log(dataAxios);
