const countriesAPIUrl = 'https://restcountries.com/v3.1/all';

fetch(countriesAPIUrl)
.then(data => data.json())
.then(res => {
    const select = document.getElementById('country');
    let countries = [];

    for(index in res) {
        countries.push(res[index].name.common);
    }
    
    const sortedCountries = countries.sort();

    for(index in sortedCountries) {
        select.options[select.options.length] = new Option(sortedCountries[index], sortedCountries[index]);
    }
});

function vote() {
    const name = document.getElementById('name').value;
    console.log(name);

    const country = document.getElementById('country').value;
    console.log(country);
}
