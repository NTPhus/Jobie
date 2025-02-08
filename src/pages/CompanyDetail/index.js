import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataCompany } from "../../services/companyService";
import { getListJobByIdCompany } from "../../services/jobService";
import JobItem from "../../components/JobItem";
import "./style.scss";

function CompanyDetail(){
    const params = useParams();
    const [data, setData] = useState([]);
    const [listJob, setlistJob] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const rs = await getDataCompany(params.id);
            const Jobs = await getListJobByIdCompany(params.id);
            setData(rs);
            setlistJob(Jobs);
        }
        fetchApi();
        
    },[])

    console.log(listJob);

    return (<>
    {data && (
        <div className="company">
            <div className="company__item">
                <h1>{data.companyName}</h1>
            </div>
            <div className="company__item">
                <p>Địa chỉ: <strong>{data.address}</strong></p>
            </div>
            <div className="company__item">
                <p>Số lượng nhân sự: <strong>{data.quantityPeople}</strong></p>
            </div>
            <div className="company__item">
                <p>Thời gian làm việc: <strong>{data.workingTime}</strong></p>
            </div> 
            <div className="company__item">
                <p>link website: <strong>{data.website}</strong></p>
            </div>
            <div className="company__item">
                <h5>Mô tả ngắn:</h5>
                <p>{data.description}</p>
            </div>
            <div className="company__item">
                <h5>Mô tả chi tiết:</h5>
                <p>{data.detail}</p>
            </div>
            <div className="company__item">
                <h5>Danh sách các job:</h5>
            </div>
        </div>
    )}
    <div className="list-job">
            {listJob ? <>
                {listJob.map((item) => (                    
                     <JobItem item={item}/>
                ))}
            </>:<>
                Không có job nào
            </>}
        </div>  
        
    </>)
}

export default CompanyDetail;