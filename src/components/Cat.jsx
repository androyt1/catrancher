import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Cat = ({ id, imageUrl, handleSelectedCat, counter }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (id, imageUrl) => {
        handleSelectedCat(id, imageUrl);
        setIsSelected((prev) => !prev);
    };

    useEffect(() => {
        if (counter === 0) {
            setIsSelected(false);
        }
    }, [counter]);

    return (
        <button
            className={`h-[120px] flex justify-center items-center ${
                isSelected ? "bg-slate-400" : "bg-white"
            }`}
            onClick={() => handleClick(id, imageUrl)}>
            <img src={imageUrl} alt='Cat' className='w-full h-full object-contain' />
        </button>
    );
};
Cat.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    handleSelectedCat: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
};
export default Cat;
