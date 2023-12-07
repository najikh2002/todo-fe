import { PostProps } from "@/app/page";
import axios from "axios";
import { useEffect, useState } from "react";

interface CheckBtnProps {
    postId: number,
    data: PostProps[],
}

const CheckBtn: React.FC<CheckBtnProps> = ({postId, data}) => {
    const [item, setItem] = useState<PostProps>();
    const [isCheck, setIsCheck] = useState<boolean>(true);

    const updateChecklist = async () => {
        if(isCheck == false) {
            setIsCheck(true);
        } 

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = {
            title: item?.title,
            desc: item?.desc,
            checklist: isCheck,
        };

        try {
            await axios.put(`https://todo-api-34gt.onrender.com/api/post/${postId}`, body, config);
        } catch(err) {
            console.error(err);
        }

        location.reload();
    };

    useEffect(() => {
        if (postId !== null && data !== undefined) {
          const selectedItem = data[postId];
          setItem(selectedItem); 
        }
      }, [postId, data]);

    return ( 
        <button className="w-[80px] py-1 rounded-md text-white bg-green-400" onClick={updateChecklist}>Done</button>
     );
}
 
export default CheckBtn;