import { Card } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { getDataCompany } from "../../services/companyService";
import { Link } from "react-router-dom";

function CompanyCard() {
  const [data, setData] = useState([]);
  const idCompany = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const rs = await getDataCompany(idCompany);
      setData(rs);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Link to={"/info-company"}>
        <Card
          title="Thông tin công ty"
          style={{
            width: 300,
            height: 250
          }}
        >
          <p>
            Tên công ty: <strong>{data && data.companyName}</strong>{" "}
          </p>
          <p>
            Email: <strong>{data && data.email}</strong>
          </p>
          <p>
            Số điện thoại: <strong>{data && data.phone}</strong>
          </p>
          <p>
            Số nhân viên: <strong>{data && data.quantityPeople}</strong>
          </p>
        </Card>
      </Link>
    </>
  );
}

export default CompanyCard;
