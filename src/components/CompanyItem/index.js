import { Link } from "react-router-dom";
import { Card } from "antd";

function CompanyItem(props) {
    const {item} = props;
  return (
    <>
      <Link
        key={item.id}
        className="hint__company-item"
        to={"/company/" + item.id}
      >
        <Card
          style={{
            width: 300,
          }}
        >
          <p>
            Công ty: <strong>{item.companyName}</strong>
          </p>
          <p>
            Số nhân sự: <strong>{item.quantityPeople}</strong>
          </p>
          <p>
            Địa chỉ: <strong>{item.address}</strong>
          </p>
        </Card>
      </Link>
    </>
  );
}

export default CompanyItem;
