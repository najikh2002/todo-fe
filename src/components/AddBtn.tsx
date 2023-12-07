import { Dispatch, SetStateAction } from 'react';

interface AddBtnProps {
    isAdd: boolean,
    setIsAdd: Dispatch<SetStateAction<boolean>>,
};

const AddBtn: React.FC<AddBtnProps> = ({isAdd, setIsAdd }) => {
    const handleClick = () => {
        if(isAdd) {
            setIsAdd(false);
        } else {
            setIsAdd(true);
        }
    };

    return ( 
        <div className="fixed bottom-6 right-6 h-[70px] w-[70px] rounded-full bg-red-400 flex justify-center items-center">
            <button className="text-[15px] text-white text-center" onClick={handleClick}>
                New
            </button>
        </div>
     );
}
 
export default AddBtn;