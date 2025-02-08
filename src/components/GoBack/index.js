import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function GoBack(){
    const navigate = useNavigate();
    console.log(navigate);
    const handleClick = () => {
        navigate(-1);
    }
    return (
        <>
            <Button type="default" onClick={handleClick}>Trở lại</Button>
        </>
    )
}

export default GoBack;