import React, { useState, useRef } from "react";
import useCustomDataHook from "./hooks/useCustomData";
import Loading from "./components/Loading";
import ErrorComponent from "./components/Error";
import CatsContainer from "./components/CatsContainer";

import {
    compareCatsArrays,
    checkIfCatsAreUnique,
    gameOver,
    successMessage,
    errorMessage,
    duplicateClowderMessage,
    lastSuccessMessage,
} from "./utils/functions";
import RanchersContainer from "./components/RanchersContainer";
import ReStartButton from "./components/ReStartButton";
import Title from "./components/Title";

const App = () => {
    // CAN USE PREVIOUSLY USED CAT BUT NOT ALL THREE CATS

    const { data, loading, error } = useCustomDataHook();

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
    const [modalOpen, setModalOpen] = useState(false);
    const [modelContent, setModelContent] = useState({
        title: "",
        content: "",
    });

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
        const { valid } = compareCats(catRefs.current);

        if (valid) {
            levelOneRef.current = catRefs.current;
            setStageOneCleared(true);
            stageRef.current = 2;
            resetCatList();
            handleOpenModal(successMessage);
            levelOneValidCatsArrayRef.current = [
                levelOneRef.current[0]?.id,
                levelOneRef.current[1]?.id,
                levelOneRef.current[2]?.id,
            ];
        }
        handleFailedAttempt(valid);
    };

    const stage2 = () => {
        const { valid } = compareCats(catRefs.current);
        if (valid) {
            const isUnique = checkIfCatsAreUnique(levelOneValidCatsArrayRef.current, [
                catRefs.current[0]?.id,
                catRefs.current[1]?.id,
                catRefs.current[2]?.id,
            ]);
            if (isUnique) {
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
                setStageTwoCleared(true);
                handleOpenModal(successMessage);
                stageRef.current = 3;
                resetCatList();
            } else {
                handleOpenModal(duplicateClowderMessage);
                resetCatList();
            }
        } else {
            handleFailedAttempt(valid);
        }
    };

    const stage3 = () => {
        const { valid } = compareCats(catRefs.current);
        if (valid) {
            const isUnique =
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

            if (isUnique) {
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
                handleOpenModal(successMessage);
                setStageThreeCleared(true);
                stageRef.current = 4;
                resetCatList();
            } else {
                handleOpenModal(duplicateClowderMessage);
                resetCatList();
            }
        } else {
            handleFailedAttempt(valid);
        }
    };

    const stage4 = () => {
        const { valid } = compareCats(catRefs.current);

        if (valid) {
            const isUnique =
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

            if (isUnique) {
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
                handleOpenModal(lastSuccessMessage);

                setStageFourCleared(true);
                stageRef.current = "game over";
                gameOver();
            } else {
                handleOpenModal(duplicateClowderMessage);
                resetCatList();
            }
        } else {
            handleFailedAttempt(valid);
        }
    };

    const compareCats = (cats) => {
        const catIds = cats.map((cat) => cat?.id.split(""));
        return compareCatsArrays(...catIds);
    };

    const manageAddedCat = (newCat) => {
        manageSelectionHighlight(newCat);
        const itExist = selectedCats.find((cat) => cat?.id === newCat?.id);
        const listOfCats = itExist
            ? selectedCats.filter((cat) => cat.id !== newCat?.id)
            : [...selectedCats, newCat];

        setSelectedCats(listOfCats);
        catRefs.current = listOfCats;
    };

    const manageSelectionHighlight = (addedCat) => {
        const alreadySelected = selected.find((cat) => cat?.id === addedCat?.id);
        const listOfSelecteds = alreadySelected
            ? selected.filter((cat) => cat?.id !== addedCat?.id)
            : [...selected, addedCat];

        const cycled = listOfSelecteds.length % 3 === 0 ? [] : listOfSelecteds;
        setSelected(cycled);
    };

    const handleFailedAttempt = (result) => {
        if (catRefs.current.length === 3 && result === false) {
            handleOpenModal(errorMessage);
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

    // modal
    const handleOpenModal = (msg) => {
        setModalOpen(true);
        setModelContent(msg);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (loading) return <Loading />;
    if (error) return <ErrorComponent />;

    return (
        <div className='w-full flex flex-col'>
            <Title />
            <div className='w-full grid grid-cols-2 gap-12'>
                <CatsContainer
                    cats={data}
                    selected={selected}
                    handleClick={handleClick}
                    modalOpen={modalOpen}
                    handleCloseModal={handleCloseModal}
                    modelContent={modelContent}
                />
                <RanchersContainer
                    levelOneRef={levelOneRef}
                    stageOneCleared={stageOneCleared}
                    levelTwoValidCatsArrayRef={levelTwoValidCatsArrayRef}
                    stageTwoCleared={stageTwoCleared}
                    levelThreeValidCatsArrayRef={levelThreeValidCatsArrayRef}
                    stageThreeCleared={stageThreeCleared}
                    levelFourValidCatsArrayRef={levelFourValidCatsArrayRef}
                    stageFourCleared={stageFourCleared}
                />
            </div>
            <ReStartButton reset={reset} />
        </div>
    );
};

export default App;
