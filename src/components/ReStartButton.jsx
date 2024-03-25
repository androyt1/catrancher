import React from "react";

const ReStartButton = ({ reset }) => {
    return (
        <div className='w-1/2 mx-auto flex justify-center items-center mt-8'>
            <button
                className='bg-slate-800 text-white text-sm font-semibold px-8 py-2 rounded-full'
                onClick={reset}>
                Restart
            </button>
        </div>
    );
};

export default ReStartButton;
