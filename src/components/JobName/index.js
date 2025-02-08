import { useEffect, useState } from "react";
import { getDataJob } from "../../services/jobService";

function JobName(props){
    const {id} = props;
    var [job, setJob] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const rs = await getDataJob(id);
            setJob(rs);
        }
        fetchApi();
    }, [])

    return(<>
        <p>{job.name}</p>
    </>)
}

export default JobName;