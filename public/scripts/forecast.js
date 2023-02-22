const key = 'N6PgGLfNjHWHFzsJd8nV4wNLEpcnbAbd' // never actually publish this key ; 1abdes@webaff.com

/*
found documentation

https://developer.accuweather.com/accuweather-locations-api/apis

here we can have the user search for the city in question...
Its also possible to use location infromation from the browser as well.

Netninja searchs the city search 1st

https://developer.accuweather.com/accuweather-current-conditions-api/apis

looks like we need to get the locations key 1st

*/

//get weather info 
const getWeather = async(id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};


// get city information 
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`; // always put question mark at the end of request?

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

/* //test function 
getCity('victoria')
    .then(data => {
        return getWeather(data.Key)
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));
*/
    