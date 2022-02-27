import { useState } from "react"
const SortButton = ({ sortOrder, value, label, setSortOrder }) => {

    const onBtnClick = () => {
        setSortOrder(value)
    }

    return (
        <button
            className={(sortOrder === value ? 'form__btn buttonChecked' : 'form__btn')}
            type='button'
            key={value}
            onClick={onBtnClick}>
            {label}
        </button>
    )
}

export default SortButton