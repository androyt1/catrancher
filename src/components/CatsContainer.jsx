import React from "react";
import Cat from "./Cat";
import PropTypes from "prop-types";

const CatsContainer = ({ cats, handleSelectedCat, counter }) => {
    return (
        <div className='w-1/3  grid grid-cols-4 grid-flow-row auto-rows-max ml-auto'>
            {cats?.map((cat) => {
                return (
                    <Cat
                        key={cat?.id}
                        {...cat}
                        handleSelectedCat={handleSelectedCat}
                        counter={counter}
                    />
                );
            })}
        </div>
    );
};
CatsContainer.propTypes = {
    cats: PropTypes.array.isRequired,
    handleSelectedCat: PropTypes.func,
    counter: PropTypes.number,
};

export default CatsContainer;
