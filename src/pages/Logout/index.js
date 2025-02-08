import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteAllCookie } from "../../helper/cookie";
import { useEffect } from "react";
import { checkLogin } from "../../actions";

function Logout(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    DeleteAllCookie();
    useEffect(() => {
        dispatch(checkLogin(false));
        navigate("/");
    },[])
    return(
        <>
        
        </>
    )
}

export default Logout;