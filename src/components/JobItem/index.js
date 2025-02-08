import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

function JobItem(props){
    const {item} = props;
    return (<>
        <Link to={"/job/" + item.id} key={item.id}>
              <Card
                title={item.name}
                style={{
                  width: 300,
                }}
              >
                <p>
                  Ngôn ngữ:{" "}
                  {item.tags.map((tag) => (
                    <Tag color="blue">{tag}</Tag>
                  ))}
                </p>
                <p>
                  Thành phố:{" "}
                  {item.city.map((c) => (
                    <Tag color="yellow">{c}</Tag>
                  ))}
                </p>
                <p>
                  Lương: <strong>{item.salary}$</strong>
                </p>
                <p>
                  ID Công ty: <strong>{item.idCompany}</strong>
                </p>
                <p>
                  Ngày tạo: <strong>{item.createAt}</strong>
                </p>
              </Card>
            </Link>
    </>)
}

export default JobItem;