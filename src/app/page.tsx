"use client";

import { AddBtn, CancelCheckBtn, CheckBtn, DeleteBtn, EditBtn, EditModal, FormModal } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export interface PostProps {
  title: string,
  desc?: string,
  checklist: boolean,
}

export default function Home() {
  const [data, setData] = useState<PostProps[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PostProps[]>('https://todo-api-34gt.onrender.com/api/post');
        
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col bg-gray-300 w-full min-h-screen justify-start items-center">
      <div className="flex flex-col w-[350px] md:w-[700px] h-fit bg-white rounded-lg justify-center items-center px-6 py-6 shadow-md mt-6 md:mt-12">
        <div className="pb-12">
          <h3 className="font-bold">TODO LIST</h3>
        </div>
        <ul className="flex flex-col w-full gap-3">
          {data.map((item: PostProps, index: number) => (
            <li key={index} className="flex w-full justify-between items-center bg-slate-200 p-3 rounded-md">
              <div>
                <p>{item.title}</p>
                {item.checklist ? <h3 className="font-bold text-green-700">Sudah Selesai</h3> : <h3 className="font-bold text-red-700">Belum Selesai</h3>}
              </div>
              <div className="flex flex-col md:flex-row gap-1">
              {item.checklist ? <CancelCheckBtn data={data} postId={index} /> : <CheckBtn data={data} postId={index} />}
              <EditBtn 
                isEdit={isEdit && editingItemId === index} 
                setIsEdit={setIsEdit} 
                editingItemId={editingItemId}
                setEditingItemId={setEditingItemId} 
                index={index} 
              />
              <DeleteBtn postId={index} />
            </div>  
            </li>
          ))}
        </ul>
      </div>
      
      {/* Form Add */}
      {isAdd && <FormModal isAdd={isAdd} setIsAdd={setIsAdd} />}
      <AddBtn isAdd={isAdd} setIsAdd={setIsAdd} />

      {isEdit && (
        <EditModal
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editingItemId={editingItemId}
          setEditingItemId={setEditingItemId}
          data={data}
        />
      )}
    </main>
  )
}