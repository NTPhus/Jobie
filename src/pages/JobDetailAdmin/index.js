import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataJob } from "../../services/jobService";
import { Tag} from "antd";
import "./style.scss";
import { getDataCompany } from "../../services/companyService";

function JobDetailAdmin() {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const job = await getDataJob(params.id);
      const company = await getDataCompany(params.id);
      const rs = {
        ...job,
        infoCompany: company,
      };
      setData(rs);
    };
    fetchApi();
  }, []);

  return (
    <>
      {data && (
        <>
          <div className="job__item">
            <h1>{data.name}</h1>
          </div>
          <div className="job__item">
            Trạng thái: {data.status ? (<Tag color="green">Bật</Tag>):(<Tag color="red">Tắt</Tag>)}
          </div>
          <div className="job__item">
            Tags:{" "}
            {data.tags &&
              data.tags.map((item, index) => (
                <Tag color="blue" key={index}>
                  {item}
                </Tag>
              ))}
          </div>
          <div className="job__item">
            Thành phố:{" "}
            {data.city &&
              data.city.map((item, index) => (
                <Tag color="yellow" key={index}>
                  {item}
                </Tag>
              ))}
          </div>
          <div className="job__item">
            Mức lương: <strong>{data.salary}$</strong>
          </div>
          <div className="job__item">
            Ngày tạo: <strong>{data.createAt}</strong>
          </div>
          <div className="job__item">
            Ngày cập nhật: <strong>{data.updateAt}</strong>
          </div>
          <div className="job__item">
            <h5>Mô tả:</h5>
            {data.description}
          </div>
        </>
      )}
    </>
  );
}

export default JobDetailAdmin;