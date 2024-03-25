const Modal = ({ isOpen, onClose, children }) => {
    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className='absolute top-0 left-0 w-full h-full bg-transparent flex justify-center items-center'
            onClick={handleClose}>
            <div
                className='bg-[#E1E1E1] w-[300px] h-fit py-4 px-5 rounded-md shadow-xl shadow-[#C1C1C1]'
                onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
