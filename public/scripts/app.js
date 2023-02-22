
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    //destructured syntax
    const { cityDets, weather} = data; //ok honestly really is weird because the assignment of variables is backwards...
/* equivelent to:
const cityDets = data.cityDets;
const weather = data.weather; */


    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
    `;

    //upadet the night/day and icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);


    //remove d-none class if there
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
 const cityDets = await getCity(city);
 const weather = await getWeather(cityDets.Key);

 return {
    cityDets: cityDets,
    weather: weather
 };

};

cityForm.addEventListener('submit', e => {
 //prevent default action

 e.preventDefault();

// get the city value

 const city = cityForm.city.value.trim();
 cityForm.reset();

 //update ui with the new city
 updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));


//set local storage - just to try out the feature

localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(data));
}
