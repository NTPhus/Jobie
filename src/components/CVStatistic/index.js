import { Card } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { getCVByIdCompany } from "../../services/cvService";

function CVStatistic() {
  const [data, setData] = useState([]);
  const idCompany = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const rs = await getCVByIdCompany(idCompany);
      const infoCV = {
        SL: 0,
        readCV: 0,
        unReadCV: 0,
      };

      rs.map((item) => (item.statusRead ? infoCV.readCV++ : infoCV.unReadCV++));

      setData(infoCV);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card
        title="CV"
        style={{
          width: 300,
          height: 250
        }}
      >
        <p>
          Số lượng CV: <strong>{data && data.SL}</strong>{" "}
        </p>
        <p>
          CV đã đọc: <strong>{data && data.readCV}</strong>
        </p>
        <p>
          CV chưa đọc: <strong>{data && data.unReadCV}</strong>
        </p>
      </Card>
    </>
  );
}

export default CVStatistic;
