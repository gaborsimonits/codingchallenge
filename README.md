# codingchallenge

_____1. Task: Group beers by brands, the Function should return an array of objects which contains the Brand name and an array of beer IDs of that Brand.

return as below: 
[
  {
    "brand": "brandName2",
    "beers": [
      "beerID3",
      "beerID4"
    ]
  },
  {
    "brand": "brandName1",
    "beers": [
      "beerID2",
      "beerID1"
    ]
  }
]

_____2. Task: Create a list of the beers filtered by beer types, the Function should take a BeerType and return all the beer IDs in an array of that type.
Filter for the `Corn` type! (Note: the input may change when you reload the page!)

return as below: 

[
  "beerID2",
  "beerID1"
]

_____3. Task: Create a list of the cheapest beers, the Function should return the name of the brand that has the cheapest average price. (Note: The brand name should be in quotes "")

return as below: 

"brandName1"

_____4. Task: Create a Function that takes an ingredient's name and returns an array of beer IDs that lack that ingredient. Filter for the `barley` ingredient! (Note: the input may change when you reload the page!)

return as below: 

[
  "beerID2",
  "beerID1"
]

_____5. Task: The function should return all beer IDs sorted in a descending order by their water ingredient ratio. The remaining part of the listed ingredients is the water (ignore alcohol). The first item should be the most watered down beer, then if two beers have the same water ratio, sort them by the alphabetic order of their IDs.

return as below: 

[
  "beerID2",
  "beerID1"
]

_____6. Task: The function should return a map where the keys are the prices rounded up to the nearest hundred and the values are arrays of the beer IDs with that price range.

return as below: 

{
  "100": [
    "beerID2",
    "beerID1"
  ],
  "200": [
    "beerID4",
    "beerID5"
  ]
}



