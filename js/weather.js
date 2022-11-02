const APIKey = '0BEDxrdgdklT5SzYqs477akGAsA6Fteb'
const baseURL = 'http://dataservice.accuweather.com'
const language = 'pt-br'

const getCityData = async (cityName) => {
  try {
    const response = await fetch(`${baseURL}/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}&language=${language}`)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados da cidade')
    }

    return response.json()
    
  } catch (error) {
    console.log(error.message)
  }
}

const getCityWeatherData = async (locationKey) => {
  try {
    const response = await fetch(`${baseURL}/currentconditions/v1/${locationKey}?apikey=${APIKey}&language=${language}`)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados do clima')
    }

    return response.json()
  } catch (error) {
    console.log(error.message)
  }
}

