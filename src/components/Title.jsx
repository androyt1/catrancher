import { getTodaysDate } from "../utils/functions";

const Title = () => {
    const today = getTodaysDate();
    return (
        <div className='w-full flex flex-col justify-center items-center mt-10 mb-6'>
            <h1 className='text-5xl font-semibold'>CatRanchers</h1>
            <p className='mt-4'>{today}</p>
        </div>
    );
};

export default Title;
