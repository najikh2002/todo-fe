import { PostProps } from "@/app/page";
import axios from "axios";
import { useEffect, useState } from "react";

interface CancelCheckBtnProps {
    postId: number,
    data: PostProps[],
}

const CancelCheckBtn: React.FC<CancelCheckBtnProps> = ({postId, data}) => {
    const [item, setItem] = useState<PostProps>();
    const [isCheck, setIsCheck] = useState<boolean>(false);

    const updateChecklist = async () => {
        if(isCheck == true) {
            setIsCheck(false);
        };

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
            const response = await axios.put(`https://todo-api-34gt.onrender.com/api/post/${postId}`, body, config);
            console.log(JSON.stringify(response.data));
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
        <button className="w-[80px] py-1 rounded-md text-white bg-yellow-400" onClick={updateChecklist}>Cancel</button>
     );
}
 
export default CancelCheckBtn;