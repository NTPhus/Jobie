import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter(){
    const isLogin = useSelector(state => state.loginReducer);
   
    return (
        <>
            {isLogin ?  <Outlet/> : <Navigate to={"/admin"}/>}
            
        </>
    )
}

export default PrivateRouter;