import { useEffect, useState } from "react";
import { getListCompany } from "../../services/companyService";
import CompanyItem from "../../components/CompanyItem";
import "./style.scss"


function Company(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const rs = await getListCompany();
            setData(rs);
            
        }
        fetchApi();
    },[])

    console.log(data);

    return (<>
        <h1>Danh sách các công ty</h1>
        <div className="List-company">
            {data ? <>
            {data.map((item) => (
                <CompanyItem item={item}/>
            ))}
            </>:
            <>
                Không có công ty nào
            </>}
        </div>     
    </>)
}

export default Company;