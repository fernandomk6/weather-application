const formChangeLocation = document.querySelector('[data-js="change-location"]')
const h5CityLocation = document.querySelector('[data-js="city-location"]')
const spanTemperature = document.querySelector('[data-js="temperature"]')
const divWeatherText = document.querySelector('[data-js="weather-text"]')
const imgTime = document.querySelector('[data-js="time"]')
const divTimeIcon = document.querySelector('[data-js="time-icon"]')
const divWeatherCard = document.querySelector('[data-js="weather-card"]')
const spanLoading = document.querySelector('[data-js="loading"]')

const setImgTime = (isDayTime) => {
  const time = isDayTime ? 'day' : 'night'
  imgTime.setAttribute('src', `./src/${time}.svg`)
  imgTime.setAttribute('alt', `${time}`)
}

const setTimeIcon = (weatherIcon) => {
  const imgTimeIconHTML = `<img src="./src/icons/${weatherIcon}.svg"/>`
  divTimeIcon.innerHTML = imgTimeIconHTML
}

const showWeatherCard = () => {
  const isVisible = !divWeatherCard.classList.contains('d-none')
  !isVisible && divWeatherCard.classList.remove('d-none')
}

const buildWeatherCard = async (weatherCardInfo) => {
  const { 
    cityName,
    temperature,
    weatherText,
    isDayTime,
    weatherIcon,
    state,
    country
  } = await weatherCardInfo
  
  const cityLocation = `${cityName}, ${state} - ${country}`
  h5CityLocation.textContent = cityLocation
  spanTemperature.textContent = temperature
  divWeatherText.textContent = weatherText

  setImgTime(isDayTime)
  setTimeIcon(weatherIcon)
}

const getWeatherCardInfo = async (cityName) => {
  showLoadingMessage('Buscando clima na cidade')

  try {
    const [{ Key, LocalizedName, AdministrativeArea, Country }] = await getCityData(cityName)
    const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getCityWeatherData(Key)

    return {
      cityName: LocalizedName,
      temperature: Temperature.Metric.Value,
      weatherText: WeatherText,
      isDayTime: IsDayTime,
      weatherIcon: WeatherIcon,
      country: Country.LocalizedName, 
      state: AdministrativeArea.ID
    }
  } catch (error) {
    console.log(error.message)
    showLoadingMessage('Cidade não encontrada')
  }
}

const showLoadingMessage = (message) => {
  spanLoading.textContent = message || '' 
}

formChangeLocation.addEventListener('submit', async (event) => {
  event.preventDefault()

  const cityName = event.target.city.value
  const weatherCardInfo = getWeatherCardInfo(cityName)

  await buildWeatherCard(weatherCardInfo)

  showLoadingMessage(false)
  showWeatherCard()

  event.target.reset()
})