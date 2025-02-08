import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCVById, updateStatusCV } from "../../services/cvService";
import { getDataJob } from "../../services/jobService";

function DetailCV() {
    const params = useParams();
    const [cv, setCV] = useState([]);
    const [job, setJob] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getCVById(params.id);
            if(res){
                setCV(res);
                const resC = await getDataJob(res.idJob);
                setJob(resC);
                await updateStatusCV(params.id);
            }
        };
        fetchApi();
    },[]);
    console.log(job.tags)
    return (
    <>
      <Card
        title={"Ứng viên: " + cv.name}
        style={{
          width: 1000,
        }}
      >
        <p>Ngày gửi: <strong>{cv.createAt}</strong></p>
        <p>Số điện thoại: <strong>{cv.phone}</strong></p>
        <p>Email: <strong>{cv.email}</strong></p>
        <p>Thành phố ứng tuyển: <strong>{cv.city}</strong></p>
        <p>Giới thiệu bản thân: {cv.description}</p>
        <p>Link project cá nhân: {cv.linkProject}</p>
      </Card>
      <Card
        title={"Thông tin job: " + job.name}
        style={{
          width: 1000,
        }}
      >
        <p>Tags: {job.length > 0 && job.tags.map(item => <><Tag color="blue" key={item}>{item}</Tag></>)}</p>
        <p>Mức lương: <strong>{job.salary}</strong></p>
        <p>Mô tả: {job.description}</p>
      </Card>
    </>
  );
}

export default DetailCV;
