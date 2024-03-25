import React from "react";
import Modal from "./Modal";
const CatsContainer = ({
    cats,
    selected,
    handleClick,
    modalOpen,
    handleCloseModal,
    modelContent,
}) => {
    const { title, content } = modelContent;
    return (
        <div className='relative  grid grid-cols-4 grid-flow-row auto-rows-max ml-auto'>
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
            <Modal isOpen={modalOpen} onClose={handleCloseModal} title={title} content={content}>
                <h3 className='text-xl font-semibold text-black py-0'>{title} </h3>
                <p className='text-xs text-slate-800 mt-0'>{content}</p>
                <div className='w-full flex justify-end items-center'>
                    <button
                        className='bg-gradient-to-b from-[#9ED9E6] to-[#03A3C7] text-black font-normal px-6 py-[2px] rounded-full text-xs'
                        onClick={handleCloseModal}>
                        ok
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CatsContainer;
