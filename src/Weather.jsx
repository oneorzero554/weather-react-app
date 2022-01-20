import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressArrowsAlt, faTint, faWind} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import moment from 'moment'

const Weather = () => {

    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch()
    }, [])

    function fetch() {

        setLoading(true)

        axios
            .get('https://ipinfo.io/', {params: {token: '25d58ab528c768'}})
            .then(res => {
                const {data} = res

                setCity(data)

                const coords = data.loc.split(',')

                return axios.get('https://api.openweathermap.org/data/2.5/weather/', {
                    params:
                        {
                            lat: coords[0],
                            lon: coords[1],
                            units: 'metric',
                            appid: '71c5d7a48d9a0707d7b2955ec24ae527',
                            lang: 'ru'
                        }
                })
            })
            .then(res => {
                const {data} = res
                setWeather(data)
            })
            .catch(e => {
                console.log(e.response)
            })
            .finally(() => setLoading(false))
    }

    if (weather) {
        return (
            <div className="weather">
                <div className="weather__item weather__header">
                    <h1 className="weather__city">{city.city}, {city.timezone}</h1>
                    <span className="weather__datetime">
                         {moment().format('HH:mm')}・{moment().format('DD/MM')}
                    </span>
                </div>
                <div className="weather__item weather__main">
                    <div className="weather__main-item">
                        <div className="temperature">
                            <span className="temperature__current">{(Math.round(Number(weather.main.temp)))}°</span>
                            <span className="temperature__feel">ощущается {Math.round(Number(weather.main.feels_like))}°</span>
                            <div className="temperature__range">
                                <span className="temperature__range-item">▲<span className="temperature__range-val">{Math.round(Number(weather.main.temp_max))}°</span></span>
                                <span className="temperature__range-item">▼<span className="temperature__range-val">{Math.round(Number(weather.main.temp_min))}°</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="weather__main-item">
                        <div className="weather__visually">
                            <div className="weather__visually-icon">
                                <img src={`/icons/${weather.weather[0].icon}.svg`}
                                     alt={weather.weather[0].description}/>
                            </div>
                            <span className="weather__visually-desc">{weather.weather[0].description}</span>
                        </div>
                    </div>
                </div>
                <div className="weather__item  weather__bottom">
                    <div className="weather__bottom-item">
                        <div className="indicator">
                            <FontAwesomeIcon className="indicator__icon" icon={faTint}/>
                            <span className="indicator__val">{weather.main.humidity}</span>
                            <span className="indicator__name">влажность, %</span>
                        </div>
                    </div>
                    <div className="weather__bottom-item">
                        <div className="indicator">
                            <FontAwesomeIcon className="indicator__icon" icon={faCompressArrowsAlt}/>
                            <span className="indicator__val">{weather.main.pressure}</span>
                            <span className="indicator__name">давление, гПа</span>
                        </div>
                    </div>
                    <div className="weather__bottom-item">
                        <div className="indicator">
                            <FontAwesomeIcon className="indicator__icon" icon={faWind}/>
                            <span className="indicator__val">{weather.wind.speed}</span>
                            <span className="indicator__name">ветер, м/с</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <h1>Загрузка...</h1>

}

export default Weather