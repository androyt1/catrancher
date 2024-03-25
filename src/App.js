import React, { useState, useEffect, useRef } from "react";
// import useCustomDataHook from "./hooks/useCustomData";
// import Loading from "./components/Loading";
// import ErrorComponent from "./components/Error";
//import CatsContainer from "./components/CatsContainer";
//import SortedCats from "./components/SortedCats";
//new comment

import {
    array1,
    array2,
    array3,
    array4,
    compareCatsArrays,
    checkIfCatsAreUnique,
} from "./utils/functions";

const App = () => {
    // CAN USE PREVIOUSLY USED CAT BUT NOT ALL THREE CATS

    const [cats, setCats] = useState([]);
    const [selectedCats, setSelectedCats] = useState([]);
    const levelOneRef = useRef([]);
    const levelTwoRef = useRef([]);
    const levelThreeRef = useRef([]);
    const levelFourRef = useRef([]);
    const levelOneValidCatsArrayRef = useRef([]);
    const levelTwoValidCatsArrayRef = useRef([]);
    const levelThreeValidCatsArrayRef = useRef([]);
    const levelFourValidCatsArrayRef = useRef([]);
    const [stageOneCleared, setStageOneCleared] = useState(false);
    const [stageTwoCleared, setStageTwoCleared] = useState(false);
    const [stageThreeCleared, setStageThreeCleared] = useState(false);
    const [stageFourCleared, setStageFourCleared] = useState(false);
    const catRefs = useRef([]);
    const [selected, setSelected] = useState([]);
    const stageRef = useRef(1);

    useEffect(() => {
        const data = localStorage.getItem("cats");
        setCats(JSON.parse(data));
    }, []);

    const handleClick = (chosenCat) => {
        manageAddedCat(chosenCat);
        if (stageRef.current === 1) {
            stage1();
        } else if (stageRef.current === 2) {
            stage2();
        } else if (stageRef.current === 3) {
            stage3();
        } else if (stageRef.current === 4) {
            stage4();
        } else {
            gameOver();
        }
    };
    const stage1 = () => {
        const { valid, validString } = compareCatsArrays(
            catRefs.current[0]?.id,
            catRefs.current[1]?.id,
            catRefs.current[2]?.id
        );

        if (valid) {
            levelOneRef.current = catRefs.current;
            setStageOneCleared(true);
            stageRef.current = 2;
            resetCatList();
            console.log("level 1 valid", valid);
            console.log("valid strings", validString);
            levelOneValidCatsArrayRef.current = [
                levelOneRef.current[0]?.id,
                levelOneRef.current[1]?.id,
                levelOneRef.current[2]?.id,
            ];
            console.log("level one valid cats", levelOneValidCatsArrayRef.current);
        }
        handleFailedAttempt(valid);
    };
    const stage2 = () => {
        console.log("stage 2");
        const { valid, validString } = compareCatsArrays(
            catRefs.current[0]?.id.split(""),
            catRefs.current[1]?.id.split(""),
            catRefs.current[2]?.id.split("")
        );
        if (valid) {
            console.log("level 2 valid", valid);
            console.log("valid string", validString);

            const result = checkIfCatsAreUnique(levelOneValidCatsArrayRef.current, [
                catRefs.current[0]?.id,
                catRefs.current[1]?.id,
                catRefs.current[2]?.id,
            ]);
            if (result) {
                levelTwoValidCatsArrayRef.current = [
                    catRefs.current[0],
                    catRefs.current[1],
                    catRefs.current[2],
                ];
                levelTwoRef.current = [
                    catRefs.current[0]?.id,
                    catRefs.current[1].id,
                    catRefs.current[2].id,
                ];
                console.log("level two ref", levelTwoRef.current);
                setStageTwoCleared(true);
                stageRef.current = 3;
                resetCatList();
            } else {
                console.log("You cannot repeat same clowder");
                resetCatList();
            }
        } else {
            handleFailedAttempt(valid);
        }
    };
    const stage3 = () => {
        console.log("stage 3");
        const { valid, validString } = compareCatsArrays(
            catRefs.current[0]?.id.split(""),
            catRefs.current[1]?.id.split(""),
            catRefs.current[2]?.id.split("")
        );
        if (valid) {
            console.log("level 3 valid", valid);
            console.log("valid string", validString);

            const result =
                checkIfCatsAreUnique(levelOneValidCatsArrayRef.current, [
                    catRefs.current[0]?.id,
                    catRefs.current[1]?.id,
                    catRefs.current[2]?.id,
                ]) &&
                checkIfCatsAreUnique(levelTwoRef.current, [
                    catRefs.current[0]?.id,
                    catRefs.current[1]?.id,
                    catRefs.current[2]?.id,
                ]);

            if (result) {
                levelThreeValidCatsArrayRef.current = [
                    catRefs.current[0],
                    catRefs.current[1],
                    catRefs.current[2],
                ];
                levelThreeRef.current = [
                    catRefs.current[0]?.id,
                    catRefs.current[1]?.id,
                    catRefs.current[2]?.id,
                ];
                console.log("level three ref", levelThreeRef.current);
                setStageThreeCleared(true);
                stageRef.current = 4;
                resetCatList();
            } else {
                console.log("You cannot repeat same clowder");
                resetCatList();
            }
        } else {
            handleFailedAttempt(valid);
        }
    };
    const stage4 = () => {
        console.log("stage 4");
        const { valid, validString } = compareCatsArrays(
            catRefs.current[0]?.id.split(""),
            catRefs.current[1]?.id.split(""),
            catRefs.current[2]?.id.split("")
        );
        // if (valid) {
        //     // const result =
        //     //     checkIfArrayIsUnique(validString, validStrings[0]) &&
        //     //     checkIfArrayIsUnique(validString, validStrings[1]) &&
        //     //     checkIfArrayIsUnique(validString, validStrings[2]);
        //     // if (result) {
        //     //     levelFourRef.current = [catRefs.current[0], catRefs.current[1], catRefs.current[2]];
        //     //     setStageFourCleared(true);
        //     //     stageRef.current = "game over";
        //     //     const newValidStrings = [...validStrings, validString];
        //     //     setValidStrings(newValidStrings);
        //     //     console.log("valid strings array", newValidStrings);
        //     //     gameOver();
        //     // } else {
        //     //     console.log("You cannot repeat same clowder");
        //     //     resetCatList();
        //     // }
        // } else {
        //     handleFailedAttempt(valid);
        // }
        if (valid) {
            console.log("level 4 valid", valid);
            console.log("valid string", validString);

            const result =
                checkIfCatsAreUnique(levelOneValidCatsArrayRef.current, [
                    catRefs.current[0]?.id,
                    catRefs.current[1]?.id,
                    catRefs.current[2]?.id,
                ]) &&
                checkIfCatsAreUnique(levelTwoRef.current, [
                    catRefs.current[0]?.id,
                    catRefs.current[1]?.id,
                    catRefs.current[2]?.id,
                ]) &&
                checkIfCatsAreUnique(levelThreeRef.current, [
                    catRefs.current[0]?.id,
                    catRefs.current[1]?.id,
                    catRefs.current[2]?.id,
                ]);

            if (result) {
                levelFourValidCatsArrayRef.current = [
                    catRefs.current[0],
                    catRefs.current[1],
                    catRefs.current[2],
                ];
                levelFourRef.current = [
                    catRefs.current[0]?.id,
                    catRefs.current[1]?.id,
                    catRefs.current[2]?.id,
                ];
                console.log("level four ref", levelFourRef.current);
                setStageFourCleared(true);

                stageRef.current = "game over";
                gameOver();
            } else {
                console.log("You cannot repeat same clowder");
                resetCatList();
            }
        } else {
            handleFailedAttempt(valid);
        }
    };

    const gameOver = () => {
        console.log("game over!");
    };

    const manageAddedCat = (pussyCat) => {
        manageSelectionHighlight(pussyCat);
        const itExist = selectedCats.find((cat) => cat?.id === pussyCat?.id);
        const listOfCats = itExist
            ? selectedCats.filter((cat) => cat.id !== pussyCat?.id)
            : [...selectedCats, pussyCat];

        setSelectedCats(listOfCats);
        catRefs.current = listOfCats;
    };

    const manageSelectionHighlight = (pussyCat) => {
        const alreadySelected = selected.find((cat) => cat?.id === pussyCat?.id);
        const listOfSelecteds = alreadySelected
            ? selected.filter((cat) => cat?.id !== pussyCat?.id)
            : [...selected, pussyCat];

        const cycled = listOfSelecteds.length % 3 === 0 ? [] : listOfSelecteds;
        setSelected(cycled);
    };

    const handleFailedAttempt = (result) => {
        if (catRefs.current.length === 3 && result === false) {
            console.log("Aww these cats do not get along");
            resetCatList();
        }
    };

    const resetCatList = () => {
        setSelectedCats([]);
        catRefs.current = [];
        setSelected([]);
    };

    const reset = () => {
        resetCatList();
        levelOneRef.current = [];
        levelTwoRef.current = [];
        levelThreeRef.current = [];
        levelFourRef.current = [];
        setStageOneCleared(false);
        setStageTwoCleared(false);
        setStageThreeCleared(false);
        setStageFourCleared(false);
        stageRef.current = 1;
    };

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex justify-center items-center mt-10 mb-4'>
                <h1 className='text-6xl font-semibold'>CatRanchers</h1>
            </div>
            <div className='w-full grid grid-cols-2'>
                <div className='  grid grid-cols-4 grid-flow-row auto-rows-max mx-auto'>
                    {cats?.map((cat) => {
                        return (
                            <button
                                key={cat?.id}
                                className={`h-[120px] flex justify-center items-center ${
                                    selected.find((pussy) => pussy?.id === cat?.id)
                                        ? "bg-slate-400"
                                        : "bg-white"
                                }`}
                                onClick={() => handleClick(cat)}>
                                <img
                                    src={cat?.imageUrl}
                                    alt='Cat'
                                    className='w-full h-full object-contain'
                                />
                            </button>
                        );
                    })}
                </div>
                <div className='w-full flex justify-center items-center'>
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
            </div>
            <div className='w-1/2 mx-auto flex justify-center items-center mt-8'>
                <button
                    className='bg-slate-800 text-white font-semibold px-8 py-2 rounded-full'
                    onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default App;
