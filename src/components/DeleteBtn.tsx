import axios from "axios";

interface DeleteBtnProps {
    postId: number,
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({ postId }) => {
    const deletePost = async () => {
        try {
            const response = await axios.delete(`https://todo-api-34gt.onrender.com/api/post/${postId}`, {
            withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(JSON.stringify(response.data));
        } catch (error) {
          console.error(error);
        }

        location.reload();
      };

    return ( 
        <button className="w-[80px] py-1 rounded-md text-white bg-red-400" onClick={deletePost}>Delete</button>
     );
}
 
export default DeleteBtn;