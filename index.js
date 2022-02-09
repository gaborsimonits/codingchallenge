const data = require("./dataOfBeers.json");
var _ = require("lodash");
const fs = require("fs");

console.log("1. Create objects, grouping by brand");

const groupedByBrand = (data) => {
	// group arr of obj by key https://stackoverflow.com/questions/40774697/how-can-i-group-an-array-of-objects-by-key/40774759#40774759
	let result = [];

	//_____Grouping beers by brand
	//__________with Reduce
	// let grouped = data.reduce((total, beer) => {
	// 	total[beer.brand] = total[beer.brand] || [];
	// 	let beerObject = {
	// 		brand: beer.brand,
	// 		beers: [],
	// 	};
	// 	total[beer.brand].push(beer);
	// 	return total;
	// }, Object.create({}));

	//__________with Lodash
	const grouped = _.groupBy(data, (beers) => beers.brand);

	//_____beerBrandsInSeparateArray
	const beerBrandsArray = [];
	data.forEach((beerBrand) => {
		beerBrandsArray.push(beerBrand.brand);
	});
	const beerBrandsInSeparateArray = beerBrandsArray.filter(
		(brand, i, a) => a.indexOf(brand) === i
	);

	//_____beersInSeparateArrays/brand
	let beersInSeparateArrays = [];
	for (let i = 0; i < 5; i++) {
		beersInSeparateArrays.push(
			grouped[Object.keys(grouped)[i]].map((beer) => beer.id)
		);
	}

	//_____Creating 1 object out of 2 arrays
	for (let i = 0; i < 5; i++) {
		let beerObject = {
			brand: beerBrandsInSeparateArray[i],
			beers: beersInSeparateArrays[i],
		};
		result.push(beerObject);
	}

	return JSON.stringify(result, null, "\t");
};

// groupedByBrand(data);
console.log(groupedByBrand(data));
// fs.writeFileSync("./1_result", groupedByBrand(data));

console.log("2. Filter beers by beer type (corn) in array");

const filterByType = (data, beerType) => {
	const filteredBeers = data
		.filter((beer) => beer.type.toLowerCase() === beerType.toLowerCase())
		.map((beer) => beer.id);
	return JSON.stringify(filteredBeers, null, "\t");

	// result = []
	// just to know all corn beer types in data
	// let filter = "type";
	// let keyword = "Corn"
	// let filteredArray = data.filter(function (obj) {
	//  return obj[filter] === keyword;
	// });
	// console.log(filteredArray);
	// result.push(filteredArray.map((beer) => beer.id));
	// filteredArray.map((beer) => beer.type === "Corn" && result.push(beer.id));
	// console.log(result);
};

// filterByType(data, "corn")
console.log(filterByType(data, "corn"));
// fs.writeFileSync("./2_result", filterByType(data, "corn"));

console.log("3. Get the cheapest brand");

const getTheCheapestBrand = (data) => {
	// Creating 1 Array of Objects, with brand names and average prices to sort() in the end
	const filteredBrandNames = data
		.map((beer) => beer.brand)
		.filter((beer, i, a) => a.indexOf(beer) === i);

	const avgPriceInArrayPerBrand = [];
	for (let i = 0; i < filteredBrandNames.length; i++) {
		const brewery = data.filter((beer) => beer.brand === filteredBrandNames[i]);
		const avgPerBrewery =
			brewery.reduce((total, beer) => total + parseInt(beer.price), 0) /
			brewery.length;
		avgPriceInArrayPerBrand.push(avgPerBrewery);
	}
	console.log(avgPriceInArrayPerBrand);

	const resultArrayToSort = [];
	for (let i = 0; i < avgPriceInArrayPerBrand.length; i++) {
		let beerBrandsObjWithAveragePrices = {
			name: filteredBrandNames[i],
			avgPrice: avgPriceInArrayPerBrand[i],
		};
		resultArrayToSort.push(beerBrandsObjWithAveragePrices);
	}
	console.log(resultArrayToSort);

	const beerObjectsInDescendingOrder = resultArrayToSort.sort(function (a, b) {
		return a.avgPrice - b.avgPrice;
	});

	const cheapestBrandObject =
		beerObjectsInDescendingOrder[Object.keys(beerObjectsInDescendingOrder)[0]];

	const cheapestBrand =
		cheapestBrandObject[Object.keys(cheapestBrandObject)[0]];

	return JSON.stringify(cheapestBrand, null, "\t");
};

// getTheCheapestBrand(data)
console.log(getTheCheapestBrand(data));
// fs.writeFileSync("./3_result", getTheCheapestBrand(data));

console.log("4. Filter by ingredient (barley) for allergies");

const filterByIngredient = (data, ingredientToCheck) => {
	let result = [];
	// console.log(data[0].ingredients[0].name);
	// loop through an array of objects and access their properties with .some()
	// https://stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties

	for (let i = 0; i < data.length; i++) {
		const beerToCheck = data[i].ingredients.some(
			(ingredient) =>
				ingredient.name === ingredientToCheck &&
				parseInt(ingredient.ratio) === 0
		);
		if (beerToCheck === true) {
			result.push(data[i].id);
		}
	}
	console.log(result);
	return JSON.stringify(result, null, "\t");
};

// filterByIngredient(data, "barley");
console.log(filterByIngredient(data, "barley"));
// fs.writeFileSync("./4_result", filterByIngredient(data, "barley"));

console.log("5. Sort by remaining ingredient ratio (water)");

const sortByTheMostWateredRatio = (data) => {
	let resultArrayToSort = [];

	for (let beer of data) {
		const { name, brand, type, price, alcohol, ...beerObject } = beer;
		// https://stackoverflow.com/questions/55468218/how-to-sum-string-value-in-lodash-by-particular-column
		let sumOfWaterRatios =
			1 - _.sumBy(beerObject.ingredients, (item) => Number(item.ratio));

		let pair = { water_ratio: sumOfWaterRatios };
		let updatedBeerObject = { ...pair, ...beerObject };

		resultArrayToSort.push(updatedBeerObject);
	}

	const resultArrayInAlphabeticalOrderArray = resultArrayToSort.sort((a, b) => {
		let textA = a.id.toUpperCase();
		let textB = b.id.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});

	const beersByDescendingWaterRatio = resultArrayInAlphabeticalOrderArray.sort(
		function (a, b) {
			return b.water_ratio - a.water_ratio;
		}
	);

	let result = [];
	for (let beer of beersByDescendingWaterRatio) {
		result.push(beer.id);
	}

	return JSON.stringify(result, null, "\t");
};

// sortByTheMostWateredRatio(data)
console.log(sortByTheMostWateredRatio(data));
// fs.writeFileSync("./5_result", sortByTheMostWateredRatio(data));

console.log("6. Map beers to rounded price");

const beerObjectByRoundedPrice = (data) => {
	let arrayToSort = [];
	for (let beer of data) {
		let pair = {
			roundedUp: Math.ceil(Number(beer.price) / 100) * 100,
			beer: [beer.id],
		};
		arrayToSort.push(pair);
	}

	// https://stackoverflow.com/questions/33850412/merge-javascript-objects-in-array-with-same-key
	let output = [];
	arrayToSort.forEach((item) => {
		let existing = output.filter((v, i) => {
			return v.roundedUp == item.roundedUp;
		});
		if (existing.length) {
			let existingIndex = output.indexOf(existing[0]);
			output[existingIndex].beer = output[existingIndex].beer.concat(item.beer);
		} else {
			if (typeof item.beer == "string") item.beer = [item.beer];
			output.push(item);
		}
	});

	let result = {};
	for (let beer of output) {
		result[beer.roundedUp] = beer.beer;
	}

	return JSON.stringify(result, null, "\t");
};

// beerObjectByRoundedPrice(data);
console.log(beerObjectByRoundedPrice(data));
// fs.writeFileSync("./6_result", beerObjectByRoundedPrice(data));

// https://stackoverflow.com/questions/42974735/create-object-from-array
// let result = {};
// for (let beer of data) {
//  result[Math.ceil(Number(beer.price) / 100) * 100] = [beer.id];
// }
// console.log(result);
