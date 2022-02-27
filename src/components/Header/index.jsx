import './style.css'
import logo from '../../assets/img/logo.png'
import { HotelsDispatchContext } from '../SearchForm'
import { HotelsContext } from '../SearchForm'
import { setCurrency, setLocale } from '../../reducers/hotelsReducer'
import { useContext, useState } from 'react'
import ukraine from '../../assets/img/country/ukraine.jpg'
import russia from '../../assets/img/country/russia.png'
import usa from '../../assets/img/country/usa.png'

const Header = () => {
    const dispatch = useContext(HotelsDispatchContext)
    const state = useContext(HotelsContext)

    const flagSrcKey = 'flagSrcKey'
    let flagSrc = JSON.parse(localStorage.getItem(flagSrcKey))


    const localeAndCurrencyItems = [
        {
            nameCountry: "United States of America",
            hcomLocale: "en_US",
            nameCurrency: 'долар США',
            valueCurrency: 'USD',
            src: usa
        },
        {
            nameCountry: "Україна",
            hcomLocale: "uk_UA",
            nameCurrency: 'українська гривня',
            valueCurrency: 'UAH',
            src: ukraine
        },
        {
            nameCountry: "Россия",
            hcomLocale: "ru_RU",
            nameCurrency: 'російський рубль',
            valueCurrency: 'RUB',
            src: russia
        },
    ]

    // const currency = [
    //     {
    //         nameCurrency: 'долар США',
    //         valueCurrency: 'USD'
    //     },
    //     {
    //         nameCurrency: 'українська гривня',
    //         valueCurrency: 'UAH',
    //     },
    //     {
    //         nameCurrency: 'російський рубль',
    //         valueCurrency: 'RUB'
    //     }
    // ]

    const onCountryClick = (locale, flagSrc, currency) => {
        dispatch(setLocale(locale))
        dispatch(setCurrency(currency))
      
        localStorage.setItem(flagSrcKey, JSON.stringify(flagSrc))
    }
 
//     if(flagSrc === null)
// {
//     flagSrc = usa;
// }

    return (
        <>
            <header className='header'>
                <div className="header__item"></div>
                <div className="header__logo">
                    <img src={logo} alt="" />
                </div>
                <li></li>
                <ul className="header__locale">
                    <div className="form__dropdown">
                        <button className='form__btn'>
                            <img className='country__img' src={flagSrc || usa} alt="" />
                        </button>
                        <div className="dropdown-content">
                            {localeAndCurrencyItems.map((item) => {
                                return <div className='country'>
                                    <img className='country__img' src={item.src} alt="" />
                                    <li
                                        className={(state.locale === item.hcomLocale) ? 'header__locale--chosed' : ' '}
                                        key={item.nameCountry}
                                        onClick={() => onCountryClick(item.hcomLocale, item.src, item.valueCurrency)}>
                                        {item.nameCountry}
                                    </li>
                                </div>
                            })}
                        </div>
                    </div>

                </ul>
                <ul className="header__currency">
                    <div className="form__dropdown">
                        <button className='form__btn'> {state.currency}</button>
                        <div className="dropdown-content">
                            {localeAndCurrencyItems.map(item => {
                                return <div>
                                    <li
                                        className={(state.currency === item.valueCurrency) ? 'header__locale--chosed' : ' '}
                                        key={item.nameCurrency}
                                        onClick={() => dispatch(setCurrency(item.valueCurrency))}>
                                        {item.valueCurrency}  {item.nameCurrency}</li>
                                </div>
                            })
                            }
                        </div>
                    </div>

                </ul >
            </header>
        </>
    )
}

export default Header