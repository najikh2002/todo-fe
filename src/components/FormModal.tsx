"use client";

import axios from "axios";
import { useState } from "react";
import { Dispatch, SetStateAction } from 'react';

interface FormModalProps {
    isAdd: boolean,
    setIsAdd: Dispatch<SetStateAction<boolean>>,
};

const FormModal: React.FC<FormModalProps> = ({isAdd, setIsAdd}) => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const handleSubmit = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = {
            title: title,
            desc: desc,
            checklist: false,
        };

        try {
            await axios.post('https://todo-api-34gt.onrender.com/api/post', body, config);
        } catch(err) {
            console.error(err);
        }
        setIsAdd(false);
        location.reload();
    }

    const handleCancelBtn = () => {
        if(isAdd) {
            setIsAdd(false);
        } else {
            setIsAdd(true);
        }
    };

    return ( 
        <div className="fixed w-full h-full bg-black/30 z-30 flex flex-col justify-center items-center">
            <div className="bg-white w-[330px] md:w-[500px] h-fit flex flex-col justify-center items-center py-12 gap-6 rounded-lg shadow-md">
                <h3 className="font-bold text-[24px]">ADD NEW LIST</h3>
                <div className="flex flex-col gap-4 w-full px-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor=""><b>Title</b></label>
                        <input className="p-2 border-[1px] border-slate-400 rounded-md" type="text" onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor=""><b>Description</b> (optional)</label>
                        <input className="p-2 border-[1px] border-slate-400 rounded-md" type="text" onChange={e => setDesc(e.target.value)} value={desc} />
                    </div>
                </div>
                
                <div className="flex gap-1">
                    <button className="w-[80px] py-1 rounded-md text-white bg-blue-400" onClick={handleSubmit}>Add</button>
                    <button className="w-[80px] py-1 rounded-md text-white bg-red-400" onClick={handleCancelBtn}>Cancel</button>
                </div>
            </div>
        </div>
     );
}
 
export default FormModal;