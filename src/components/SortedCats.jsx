import React from "react";

const SortedCats = () => {
    const arrays = Array.from({ length: 12 }, () => []);
    return (
        <div className='w-1/2 flex justify-start items-center '>
            <div className='grid grid-cols-3 grid-flow-row auto-rows-max w-1/4 gap-0'>
                {arrays.map((_, index) => {
                    return <div key={index} className='h-[60px]  border border-sky-400'></div>;
                })}
            </div>
        </div>
    );
};

export default SortedCats;
