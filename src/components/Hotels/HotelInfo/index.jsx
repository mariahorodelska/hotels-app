import { getHotelsPhotos } from '../../../api'
import { useState, useEffect, useContext } from 'react'
import './style.css'
import { HotelsContext } from '../../SearchForm'

const HotelInfo = ({ id, name, vrBadge, address, ratePlan, guestReviews, starRating, landmarks, deals, neighbourhood, optimizedThumbUrls, index }) => {

    const state = useContext(HotelsContext);
    const [hotelsPhotos, setHotelsPhotos] = useState([])

    const getPhotos = async () => {
        const aaa = await getHotelsPhotos(id)
        setHotelsPhotos(aaa)
    }

    useEffect(() => {
    //   let timerId = setTimeout(() => {
    //          getPhotos()
    //     }, (index * 1000))

    //     return () => clearTimeout(timerId)
    }, [])

   // console.log(deals);
   
    return (
        <div className="hotel">
            deals.specialDeal.dealText
            ratePlan.features object
          
            <div className="iiii">
                {ratePlan.price.additionalInfo}
            </div>
            <div className="hotel__photo">
                <img src={optimizedThumbUrls.srpDesktop} alt="" />
            </div>
            <div className="hotel__name">{name}</div>
            <div className="hotel__label">{vrBadge}</div>
            <div className="hotel__address">{address.streetAddress}, {address.locality}, {address.postalCode}, {address.region}</div>
            <div className="hotel__neighbourhood">{neighbourhood}</div>
            <div className="hotel__landmarks">
                {landmarks.map((elem, index) => {
                    return <p key={index}>{elem.label + ': ' + elem.distance}</p>
                })
                }
            </div>

            <div className="hotel__price">
                <div className="hotel__old-price">{ratePlan.price.old}</div>
                <div className="hotel__current-price">{ratePlan.price.current}</div>

            </div>
            <div className="hotel__star-rating">Star rating: {starRating}</div>
            {guestReviews && <div className="hotel__rating">Guest rating: {guestReviews.rating} {guestReviews.badgeText}</div>}
            {guestReviews && <div className="hotel__total-rating">Total guest reviews: {guestReviews.total}</div>}
            <div className="hotel__button">Book</div>

        </div>

    )
}

export default HotelInfo