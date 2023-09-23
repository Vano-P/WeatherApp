'use strict'
const apiKey = '5d9476cc376408be84817a11782e6640'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const city = document.querySelector('.weather__search_input')
const searchBtn = document.querySelector('.weather__search_btn')
const weatherIcon = document.querySelector('.weather__main_img')
const modal = document.querySelector('.modal')
const invalidText = document.querySelector('.errorCityName')
const emptyText = modal.querySelector('.modal__win_title')
const checkWeather = async (cityName) => {
    const response = await fetch(apiUrl + `&q=${cityName}` + `&appid=${apiKey}`)
    if (response.status === 404) {
        invalidText.style.display = 'block'
        modal.style.display = 'flex'
        emptyText.style.display = 'none'
        setTimeout(() => {modal.style.display = 'none'}, 750)
    } else if (response.status === 400) {
        modal.style.display = 'flex'
        setTimeout(() => {modal.style.display = 'none'}, 750)
    }
    const data = await response.json()
    const temp = Math.round(data.main.temp) + '°C'
    const humidity = data.main.humidity + ' %'
    const wind = data.wind.speed+ ' km/h'
    const city = data.name
    const weather = data.weather[0].main
    document.querySelector('.weather__main_temp').innerText = temp
    document.querySelector('.weather__moreHum_description').innerText = humidity
    document.querySelector('.weather__moreWSpeed_description').innerText = wind
    document.querySelector('.weather__main_city').innerText = city

    if (weather === 'Clouds') weatherIcon.src = './assets/images/clouds.png'
    else if (weather === 'Clear') weatherIcon.src = './assets/images/clear.png'
    else if (weather === 'Rain') weatherIcon.src = './assets/images/rain.png'
    else if (weather === 'Mist') weatherIcon.src = './assets/images/mist.png'
    else if (weather === 'Drizzle') weatherIcon.src = './assets/images/drizzle.png'

    document.querySelector('.weather__main').style.display = 'flex'
    document.querySelector('.weather__more').style.display = 'flex'

}

searchBtn.addEventListener('click', () => {
    checkWeather(city.value)
    city.value = ''
})

document.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(city.value)
        city.value = '';
    }
})