import React from "react";

const ErrorComponent = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <span className='text-xl'>
                An error occurred loading cats, please try again later ..
            </span>
        </div>
    );
};

export default ErrorComponent;
