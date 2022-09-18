const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

//Get the data
const cities = [];
const prom = fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(...data));

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

("use strict");
const findMatches = function (wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const displayMatches = function () {
  const matchArr = findMatches(this.value, cities);
  console.log(matchArr);
  const html = matchArr
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
    <li><span class"name">City : ${cityName} State: ${stateName}</span>
      <span class"population">Population: ${numberWithCommas(
        place.population
      )}</span>
      </li>
     `;
    })
    .join("");

  suggestions.innerHTML = html;
  if (!this.value)
    suggestions.innerHTML = `
  <li>Filter for a city</li>
  <li>or a state</li>`;
};

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
