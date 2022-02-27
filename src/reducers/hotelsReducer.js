
// create Action-type
const SET_FORM_DATA = 'SET_FORM_DATA'
const SET_CITY_ID = 'SET_CITY_ID'
const SET_HOTELS_INFO = 'SET_HOTELS_INFO'
const SET_LOCALE = 'SET_LOCALE'
const SET_CURRENCY = 'SET_CURRENCY'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

const a = JSON.parse( localStorage.getItem('localeKey'))
const b = JSON.parse( localStorage.getItem('currencyKey'))
// const currentPage = JSON.parse( localStorage.getItem('currentPage'))

export const initialState = {
    formData: null,
    cityId: null,
    hotelsInfo: null,
    locale: a || 'en_US',
    currency: b || 'USD',
    currentPage : 1
}

export const hotelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORM_DATA:
            return {
                ...state,
                formData: action.formData
            }
        case SET_CITY_ID:
            return {
                ...state,
                cityId: action.cityId
            }
        case SET_HOTELS_INFO:
            return {
                ...state,
                hotelsInfo: action.hotelsInfo
            }
        case SET_LOCALE:
            return {
                ...state,
                locale: action.locale
            }
        case SET_CURRENCY:
            return {
                ...state,
                currency: action.currency
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        default:
            return state;
    }
}

export const setFormData = (formData) => ({ type: SET_FORM_DATA, formData })
export const setCityId = (cityId) => ({ type: SET_CITY_ID, cityId })
export const setHotelsInfo = (hotelsInfo) => ({ type: SET_HOTELS_INFO, hotelsInfo })
export const setLocale = (locale) => ({ type: SET_LOCALE, locale })
export const setCurrency = (currency) => ({ type: SET_CURRENCY, currency })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })