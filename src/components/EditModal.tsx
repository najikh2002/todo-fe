"use client";

import { PostProps } from "@/app/page";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface EditModalProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editingItemId: number | null;
  setEditingItemId: React.Dispatch<React.SetStateAction<number | null>>;
  data: PostProps[];
}

const EditModal: React.FC<EditModalProps> = ({
  isEdit,
  setIsEdit,
  editingItemId,
  setEditingItemId,
  data,
}) => {
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDesc, setEditedDesc] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>();

  useEffect(() => {
    if (editingItemId !== null && data !== undefined) {
      const selectedItem = data[editingItemId];
      setEditedTitle(selectedItem.title);
      setEditedDesc(selectedItem.desc || "");
      setIsCheck(selectedItem.checklist);
    }
  }, [editingItemId, data]);

  const handleSubmit = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = {
        title: editedTitle,
        desc: editedDesc,
        checklist: isCheck,
    };

    try {
        await axios.put(`https://todo-api-34gt.onrender.com/api/post/${editingItemId}`, body, config);
    } catch(err) {
        console.error(err);
    }

    location.reload();
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setIsEdit(false);
  };

  return (
    <div className="fixed w-full h-full bg-black/30 z-30 flex flex-col justify-center items-center">
      <div className="bg-white w-[330px] md:w-[500px] h-fit flex flex-col justify-center items-center py-12 gap-6 rounded-lg shadow-md px-6">
        <h3 className="font-bold text-[24px]">EDIT LIST</h3>
        <div className="flex flex-col w-full gap-2">
            <label><b>Title</b></label>
            <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border-[1px] border-slate-400 rounded-md p-2"
            />
        </div>

        <div className="flex flex-col w-full gap-2">
            <label><b>Description</b></label>
            <input
                type="text"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
                className="border-[1px] border-slate-400 rounded-md p-2"
            />
        </div>
        
        <div className="flex gap-3">
            <button className="w-[80px] py-1 rounded-md text-white bg-blue-400" onClick={handleSubmit}>Edit</button>
            <button className="w-[80px] py-1 rounded-md text-white bg-red-400" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
