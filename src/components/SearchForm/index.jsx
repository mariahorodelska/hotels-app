import { getSearchResult, getHotelsInfo } from '../../api'
import { useState, useEffect, useReducer } from 'react'
import 'react-input-range/lib/css/index.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './style.css'
import Header from '../Header'
import Hotels from './../Hotels'
import Guests from './Guests'
import { setFormData } from '../../reducers/hotelsReducer'
import { hotelsReducer } from '../../reducers/hotelsReducer'
import { initialState, setCityId, setHotelsInfo } from '../../reducers/hotelsReducer'
import { createContext } from "react"

export const HotelsContext = createContext(null)
export const HotelsDispatchContext = createContext(null)


const SearchForm = () => {
    const [state, dispatch] = useReducer(hotelsReducer, initialState);

    function pad(n) {
        return (n < 10) ? ("0" + n) : n
    }

    function convertDate(date) {
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
    }

    const [cityName, setCityName] = useState('')
    const [countAdults, setCountAdults] = useState(1)
    const [countChildren, setCountChildren] = useState(0)
    const [ageChildren, setAgeChildren] = useState(1)
    // const [countRooms, setCountRooms] = useState(1)

    // const [checkInValue, setCheckInValue] = useState('')
    // const [checkOutValue, setCheckOutValue] = useState('')

    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false)
    const [countRooms, setCountRooms] = useState(1)

    const [date, setDate] = useState();

    const onChangeCalendar = date => {
        setDate(date);
    }

    const getSearch = async (cityName) => {
        const obj = {
            query: cityName,
            locale: state.locale,
            currency: state.currency
        }
        const response = await getSearchResult(obj)
        const cityId = response.suggestions[0].entities[0].destinationId
        if (cityId) {
            console.log(state.locale);
            const obj = {
                id: cityId,
                adults: countAdults,
                children: countChildren,
                checkIn: convertDate(date[0]),
                checkOut: convertDate(date[1]),
                locale: state.locale,
                currency: state.currency
            }
            const hotelsData = await getHotelsInfo(obj)
            setCityName(hotelsData.header)
            dispatch(setCityId(cityId))
            dispatch(setHotelsInfo(hotelsData))
        }
    }

    console.log(state);
    const localeKey = 'localeKey'
    localStorage.setItem(localeKey, JSON.stringify(state.locale))
    //  const localeValueFromLS = localStorage.getItem(localeKey)

    const currencyKey = 'currencyKey'
    localStorage.setItem(currencyKey, JSON.stringify(state.currency))
    //  const currencyValueFromLS = localStorage.getItem(currencyKey)

    useEffect(() => {
        if (cityName && countAdults && date) {
            getSearch(cityName)
        }

    }, [state.locale, state.currency])

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (e.keyCode === 13 || cityName && countAdults && date) {
            getSearch(cityName)
            let formData = {
                cityName,
                countAdults,
                countChildren,
                checkInValue: convertDate(date[0]),
                checkOutValue: convertDate(date[1])
            }
            dispatch(setFormData(formData))
        }
    }

    const threeMonthLater = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 3,
        new Date().getDate()
    );

    const guestsComponent = () => {
        return <Guests
            countRooms={countRooms}
            countAdults={countAdults}
            setCountAdults={setCountAdults}
            countChildren={countChildren}
            setCountChildren={setCountChildren}
            ageChildren={ageChildren}
            setAgeChildren={setAgeChildren}
        />
    }
    const [inputList, setInputList] = useState([]);

    const onAddBtnClick = () => {
        setCountRooms(countRooms + 1)
        setInputList(inputList.concat(<Guests
            countRooms={countRooms + 1}
            countAdults={countAdults}
            setCountAdults={setCountAdults}
            countChildren={countChildren}
            setCountChildren={setCountChildren}
            ageChildren={ageChildren}
            setAgeChildren={setAgeChildren}
            key={inputList.length}
        />));
    };

    return (
        <>
            <HotelsContext.Provider value={state}>
                <HotelsDispatchContext.Provider value={dispatch}>
                    <Header />
                    <div>
                        <form className="form" onSubmit={handleFormSubmit}>

                            <div className="form__block search">
                                <i className="fas fa-search"></i>
                                <input
                                    className="form__input form__input--delete "
                                    required
                                    type='text'
                                    placeholder='search city'
                                    // pattern='<[A-Za-zА-Яа-яЁё]/>'
                                    value={cityName}
                                    onChange={e => setCityName(e.target.value)}
                                />
                                <a href="#" className="form__cancel-button">
                                    <i className="fas fa-times"
                                        style={cityName ? { display: 'inline-block' } : { display: 'none' }}
                                        onClick={() => setCityName('')}></i>
                                </a>
                            </div>
                            <div className="form__guests" >
                                <div className="form__guests-header" onClick={() => setIsGuestsDropdownOpen(!isGuestsDropdownOpen)}>
                                    <p className="form__title" >Guests</p>
                                    <p className="form__title" >
                                        {countAdults} {countAdults === 1 ? 'adult' : 'adults'} - {countChildren} {countChildren === '1' ? 'child' : 'children'} - {countRooms} {countRooms === 1 ? 'room' : 'rooms'}
                                    </p>
                                </div>

                                {isGuestsDropdownOpen && <Guests
                                    countRooms='1'
                                    countAdults={countAdults}
                                    setCountAdults={setCountAdults}
                                    countChildren={countChildren}
                                    setCountChildren={setCountChildren}
                                    ageChildren={ageChildren}
                                    setAgeChildren={setAgeChildren}
                                />
                                }
                                {inputList}
                                {countRooms >= 8 &&
                                <p>You have selected the maximum numbers of rooms</p>
                                }
                                {isGuestsDropdownOpen && 
                                    <button
                                        onClick={onAddBtnClick}
                                        className='form__button'
                                        disabled={countRooms >= 8}
                                        >
                                        Add a room
                                </button>
                                }
                            </div>



                            <div >

                                <div className='form__date' onClick={() => setIsCalendarOpen(!isCalendarOpen)}>

                                    <button className='form__btn-date' >
                                        {date ? date[0].getDate() + ' ' + date[0].toLocaleString(state.locale.slice(0, 2), { month: 'short', weekday: 'short' }) : 'Check-in'}
                                    </button>

                                    <button className='form__btn-date' >
                                        {date ? date[1].getDate() + ' ' + date[1].toLocaleString(state.locale.slice(0, 2), { month: 'short', weekday: 'short' }) : 'Check-out'}
                                    </button>
                                </div>

                                {isCalendarOpen && <Calendar
                                    // showDoubleView={true}
                                    selectRange={true}
                                    locale={state.locale.replace('_', '-')}
                                    returnValue='range'
                                    minDate={new Date()}
                                    maxDate={threeMonthLater}
                                    onChange={onChangeCalendar}
                                    value={date}
                                />
                                }

                            </div>

                            <button
                                className='form__button'
                                type='submit'>
                                Search
                            </button>
                        </form>
                    </div>




                    {state.hotelsInfo && <Hotels hotelsInfo={state.hotelsInfo} />}
                </HotelsDispatchContext.Provider>
            </HotelsContext.Provider>

        </>

    )
}

export default SearchForm