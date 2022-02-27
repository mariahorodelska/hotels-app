
const Guests = ({ 
    countRooms,
    countAdults, 
    setCountAdults,    
    countChildren, 
     setCountChildren,
    ageChildren, 
    setAgeChildren}) => {

    return (
       <>
           
                <div className="guests">
                    <h3 className="guests__title">Room {countRooms} </h3>
                    <p className="form__title" >Adults</p>
                    <input
                        className="form__input"
                        type='number'
                        min='1'
                        max='10'
                        value={countAdults === '' ? 1 : countAdults}
                        onChange={e => setCountAdults(Math.max(1, parseInt(e.target.value)))}

                    />
                    <p className="form__title" >Children</p>
                    <input
                        className="form__input"
                        type='number'
                        min='0'
                        max='10'
                        value={countChildren}
                        onChange={e => setCountChildren(e.target.value)}
                    />
                    {countChildren >= 1 && <input
                        className="form__input"
                        type='number'
                        min='1'
                        max='17'
                        value={ageChildren}
                        onChange={e => setAgeChildren(e.target.value)}
                    />}
                </div>
            
        </>
    )
}

export default Guests