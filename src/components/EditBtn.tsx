import { Dispatch, SetStateAction } from 'react';

interface EditBtnProps {
    isEdit: boolean,
    setIsEdit: Dispatch<SetStateAction<boolean>>,
    editingItemId: number | null,
    setEditingItemId: Dispatch<SetStateAction<number | null>>,
    index: number,
};

const EditBtn: React.FC<EditBtnProps> = ({ isEdit, setIsEdit, editingItemId, setEditingItemId, index }) => {
    const handleClick = () => {
        if(isEdit) {
            setIsEdit(false);
        } else {
            setIsEdit(true);
            setEditingItemId(index);
        }
    };

    return ( 
        <button className="w-[80px] py-1 rounded-md text-white bg-blue-400" onClick={handleClick}>Edit</button>
     );
}
 
export default EditBtn;