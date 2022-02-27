import { useState, useContext, useEffect } from 'react'
import './style.css'
import InputRange from 'react-input-range';
import { HotelsContext } from '../../SearchForm';
import { getHotelsInfo } from '../../../api'
import { HotelsDispatchContext } from '../../SearchForm';
import { setHotelsInfo, setCurrentPage } from '../../../reducers/hotelsReducer';
import FilterCheckBox from './FilterCheckBox';
import SortButton from './SortButton';

const Filters = ({ hotelsInfo }) => {
    const state = useContext(HotelsContext);
    const dispatch = useContext(HotelsDispatchContext);

    const [sortOrder, setSortOrder] = useState('')
    const [guestRatingValue, setGuestRatingValue] = useState(1)
    const [rangePriceValue, setRangePriceValue] = useState({ min: hotelsInfo.filters.price.range.min.defaultValue, max: hotelsInfo.filters.price.range.max.defaultValue })
    const [starRating, setStarRating] = useState([])
    const [accommodationType, setAccommodationType] = useState([])
    const [facilities, setFacilities] = useState([])
    const [themesAndTypes, setThemesAndTypes] = useState([])
    const [accessibility, setAccessibility] = useState([])
    const [landmarks, setLandmarks] = useState([])
    const [neighbourhood, setNeighbourhood] = useState([])

    // тут ще має бути відстань до ландмарків, але поки що забрала
    // const sortBy = [
    //     { text: 'Featured', sortOrder: 'BEST_SELLER' },
    //     { text: 'Guest rating', sortOrder: 'GUEST_RATING' },
    //     { text: 'Star rating', sortOrder: '', dropdownContent: [{ text: 'from high to low', sortOrder: 'STAR_RATING_HIGHEST_FIRST' }, { text: 'from low to high', sortOrder: 'STAR_RATING_LOWEST_FIRST' }] },
    //     { text: 'Price', sortOrder: 'PRICE', dropdownContent: [{ text: 'from high to low', sortOrder: 'PRICE_HIGHEST_FIRST' }, { text: 'from low to high', sortOrder: 'PRICE' }] }
    // ]

    const setActiveStarRating = (countOfStars) => {
        starRating.includes(countOfStars)
            ? setStarRating(starRating.filter(elem => elem !== countOfStars))
            : setStarRating([...starRating, countOfStars])
    }

    const getSearchForm = async (currentPage) => {
      
      
        const obj = {
            id: state.cityId,
            adults: state.formData.countGuestsInput,
            checkIn: state.formData.inputCheckInValue,
            checkOut: state.formData.inputCheckOutValue,
            locale: state.locale,
            currency: state.currency,
            priceMin: rangePriceValue.min,
            priceMax: rangePriceValue.max,
            guestRatingValueMin: guestRatingValue,
            sortOrder: sortOrder,
            starRatings: starRating.join(','),
            accommodationType: accommodationType.join(','),
            amenityIds: facilities.join(','), 
            landmarkIds: landmarks.join(','),
            themeIds: themesAndTypes.join(','),
            currentPage
        }
        const hotelsData = await getHotelsInfo(obj)
     // if (hotelsData)  dispatch(setCurrentPage(1))
        dispatch(setHotelsInfo(hotelsData))
     
    }


    const handleFormSubmit = (e) => {
        // dispatch(setCurrentPage('1'))
        e.preventDefault()
        if (e.keyCode === 13 || rangePriceValue || guestRatingValue || sortOrder || starRating) {
            getSearchForm()
        }
    }

    useEffect(() => {
      
           getSearchForm(state.currentPage) 
        
       // getSearchForm()
    }, [state.currentPage])

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="form__sort-by">
                    <p>Sort by</p>
                    {hotelsInfo.sortResults.options.map(({ label, choices }) => {
                        if (choices.length === 1) {
                            return choices.map(({ label, value }) => {
                                return <SortButton sortOrder={sortOrder} value={value} label={label} setSortOrder={setSortOrder} key={value} />
                            })
                        } else {
                            return <div className="form__dropdown">
                                <button className='form__btn'> {label}</button>
                                <div className="dropdown-content">
                                    {choices.map(({ label, value }) => {
                                        return <SortButton sortOrder={sortOrder} value={value} label={label} setSortOrder={setSortOrder} key={value} />

                                    })}
                                </div>
                            </div>
                        }
                    })}
                </div>

                <p className="form__title">Guest Rating: {guestRatingValue}</p>
                <input
                    type="range"
                    value={guestRatingValue}
                    max='10'
                    onChange={e => setGuestRatingValue(e.target.value)}
                />

                <p>Price</p>
                <div className="input-range">
                    <InputRange
                        maxValue={hotelsInfo.filters.price.range.max.defaultValue}
                        minValue={hotelsInfo.filters.price.range.min.defaultValue}
                        step={10}
                        value={rangePriceValue}
                        onChange={value => setRangePriceValue(value)} />
                </div>

                <p className="form__title">Star Rating</p>
                {hotelsInfo.filters.starRating.items.reverse().map(({ value }) => {
                    return <button
                        className={starRating.includes(value + '') ? 'form__btn form__btn--star buttonChecked' : 'form__btn form__btn--star'}
                        type='button'
                        value={value}
                        onClick={(e) => setActiveStarRating(e.target.value)}
                        key={value}>
                        {value}

                    </button>

                })
                }
                <div className="form__filters">
                    <FilterCheckBox
                        filterType={hotelsInfo.filters.accommodationType.items}
                        state={accommodationType}
                        setState={setAccommodationType}
                        titleOfFilter='Accommodation Type' />
                    <FilterCheckBox
                        filterType={hotelsInfo.filters.facilities.items}
                        state={facilities}
                        setState={setFacilities}
                        titleOfFilter='Facilities' />
                    <FilterCheckBox
                        filterType={hotelsInfo.filters.themesAndTypes.items}
                        state={themesAndTypes}
                        setState={setThemesAndTypes}
                        titleOfFilter='Themes And Types' />
                    <FilterCheckBox
                        filterType={hotelsInfo.filters.accessibility.items}
                        state={accessibility}
                        setState={setAccessibility}
                        titleOfFilter='Accessibility Features' />
                    <FilterCheckBox
                        filterType={hotelsInfo.filters.landmarks.items}
                        state={landmarks}
                        setState={setLandmarks}
                        titleOfFilter='Landmarks' />
                    {/* <p>Neighbourhood</p>
          <FilterCheckBox filterType={hotelsInfo.filters.neighbourhood.items} state={neighbourhood} setState={setNeighbourhood}/> */}
                </div>
                <button className='form__button' type='submit'>APPLY</button>
            </form>
        </>

    )
}


export default Filters