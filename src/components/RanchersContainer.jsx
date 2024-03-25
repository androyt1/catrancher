import React from "react";
import { array1, array2, array3, array4 } from "../utils/functions";

const RanchersContainer = ({
    levelOneRef,
    stageOneCleared,
    levelTwoValidCatsArrayRef,
    stageTwoCleared,
    levelThreeValidCatsArrayRef,
    stageThreeCleared,
    levelFourValidCatsArrayRef,
    stageFourCleared,
}) => {
    return (
        <div className='w-full flex flex-col justify-center items-start'>
            <div className='w-1/3 flex  justify-center items-center mb-2'>
                <h3>Clowders found</h3>
            </div>
            <div className='w-1/3 grid grid-cols-3 grid-flow-row auto-rows-max'>
                {array1?.map((_, index) => {
                    const cat = levelOneRef.current[index];
                    return (
                        <div
                            key={index}
                            className='border border-sky-400 h-[60px]  flex justify-center items-center'>
                            {stageOneCleared && (
                                <img
                                    src={cat?.imageUrl}
                                    alt=''
                                    className='w-full h-full object-contain'
                                />
                            )}
                        </div>
                    );
                })}
                {array2.map((_, index) => {
                    const cat = levelTwoValidCatsArrayRef.current[index];
                    return (
                        <div
                            key={index}
                            className='border border-sky-400 h-[60px]  flex justify-center items-center'>
                            {stageTwoCleared && (
                                <img
                                    src={cat?.imageUrl}
                                    alt=''
                                    className='w-full h-full object-contain'
                                />
                            )}
                        </div>
                    );
                })}
                {array3.map((_, index) => {
                    const cat = levelThreeValidCatsArrayRef.current[index];
                    return (
                        <div
                            key={index}
                            className={`border border-sky-400 h-[60px]  flex justify-center items-center 
                                    `}>
                            {stageThreeCleared && (
                                <img
                                    src={cat?.imageUrl}
                                    alt=''
                                    className='w-full h-full object-contain'
                                />
                            )}
                        </div>
                    );
                })}
                {array4.map((_, index) => {
                    const cat = levelFourValidCatsArrayRef.current[index];
                    return (
                        <div
                            key={index}
                            className='border border-sky-400 h-[60px]  flex justify-center items-center'>
                            {stageFourCleared && (
                                <img
                                    src={cat?.imageUrl}
                                    alt=''
                                    className='w-full h-full object-contain'
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RanchersContainer;
