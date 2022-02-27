import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

console.log(process.env.REACT_APP_API_KEY)

const instance = axios.create({
  baseURL: 'https://hotels4.p.rapidapi.com',

  headers: {
    'x-rapidapi-host': 'hotels4.p.rapidapi.com',
    'x-rapidapi-key': API_KEY
  }
})

export function getHotelsInfo(obj) {
  const {
    id,
    adults,
    children,
    checkIn,
    checkOut,
    priceMin,
    priceMax,
    guestRatingValueMin,
    sortOrder,
    starRatings,
    accommodationType,
    amenityIds,
    landmarkIds,
    themeIds,
    locale,
    currency,
    currentPage
  } = obj;

  return instance.get('/properties/list', {
    params: {
      destinationId: id,
      pageNumber: currentPage,
      pageSize: '10',
      checkIn: checkIn,
      checkOut: checkOut,
      adults1: adults,
      children1: children,
      starRatings: starRatings,
      priceMin: priceMin,
      priceMax: priceMax,
      sortOrder: sortOrder,
      locale: locale,
      currency: currency,
      guestRatingValueMin: guestRatingValueMin,
      accommodationIds: accommodationType,
      amenityIds: amenityIds,
      landmarkIds: landmarkIds,
      themeIds: themeIds,
    }
  })
    .then(response => response.data.data.body)
}


export function getHotelsPhotos(hotelId) {
  return instance.get('/properties/get-hotel-photos', { params: { id: hotelId } },)
    .then(response => response.data)
}

export function getSearchResult(obj) {
  const { query, locale, currency } = obj;
  return instance.get('/locations/v2/search', {
    params: {
      query: query,
      locale: locale,
      currency: currency
    }
  })
    .then(response => response.data)
}





