import HotelInfo from "./HotelInfo"
import Filters from "./Filters"
import './style.css'
import Pagination from "./Pagination"


const Hotels = ({ hotelsInfo }) => {
 //   console.log(hotelsInfo);

    return (
        <div className="hotels">
            <div className="hotels__header">
                {hotelsInfo && hotelsInfo.header + ': ' + hotelsInfo.searchResults.totalCount } properties found
            </div>
            <div className="hotels__items">
                <div className="hotels__filters">
                    <Filters hotelsInfo={hotelsInfo} />
                </div>
                <div className="hotels__results">
                    {hotelsInfo && hotelsInfo.searchResults.results.map((hotel, index) => {
                        return <HotelInfo
                            {...hotel}
                            index={index}
                            key={hotel.id}
                        />
                    }
                    )
                    }
                </div>
            </div>
            <Pagination
                searchResults={hotelsInfo.searchResults}

            />

        </div>
    )
}
export default Hotels
