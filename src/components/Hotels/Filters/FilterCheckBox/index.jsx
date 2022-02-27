import { useState } from "react"
import './style.css'

const FilterCheckBox = ({ filterType, state, setState, titleOfFilter }) => {

    const setActiveCheckBox = (id) => {
        state.includes(id)
            ? setState(state.filter(elem => elem !== id))
            : setState([...state, id])
    }

    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return (
        <div className="check-box">
            <div
                className='check-box__title'
                onClick={() => setIsFilterOpen(!isFilterOpen)}>{titleOfFilter}
            </div>
            {filterType.map((elem) => {
                return <div
                key={elem.value}
                    className='check-box__items'
                    style={isFilterOpen ? { display: 'block' } : { display: 'none' }}>
                    <input
                        className='check-box__item'
                        type='checkbox'
                        name={elem.label}
                        id={elem.value}
                        //checked={accommodationType.includes(elem.label)}
                        onChange={(e) => setActiveCheckBox(e.target.id)}
                        key={elem.label}
                    />
                    <label htmlFor={elem.label}>{elem.label}</label>
                </div>
            }
            )
            }
        </div>
    )
}

export default FilterCheckBox
