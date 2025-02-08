import { Card } from "antd";
import { useEffect, useState } from "react";
import { getListJobByIdCompany } from "../../services/jobService";
import { getCookie } from "../../helper/cookie";

function JobStatistic() {
  const [data, setData] = useState([]);
  const idCompany = getCookie("id");
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListJobByIdCompany(idCompany);
      const infoJob = {
        SL: 0,
        jobIsOn: 0,
        jobIsOff: 0,
      };
      res.map(item => item.status ? infoJob.jobIsOn++ : infoJob.jobIsOff++);
    
      setData(infoJob);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card
        title="Job"
        style={{
          width: 300,
          height: 250
        }}
      >
        <p>Số lượng job: <strong>{data && data.SL}</strong></p>
        <p>Job đang bật: <strong>{data && data.jobIsOn}</strong></p>
        <p>Job đang tắt: <strong>{data && data.jobIsOff}</strong></p>
      </Card>
    </>
  );
}

export default JobStatistic;
