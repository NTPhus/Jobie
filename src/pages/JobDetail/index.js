import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataJob } from "../../services/jobService";
import { Button, Card, Input, Row, Select, Tag, Col, Form, notification } from "antd";
import "./style.scss";
import { getDataCompany } from "../../services/companyService";
import { getListCity } from "../../services/cityService";
import { createCV } from "../../services/cvService";
import { createId, getCurrentTime } from "../../services/dataService";

const {TextArea} = Input;
const {Option} = Select;

function JobDetail() {
  const params = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const rules =[
    {
      //tạo dấu chấm đỏ
      required: true,
      message: "Vui lòng nhập thông tin!",
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const job = await getDataJob(params.id);
      const company = await getDataCompany(params.id);
      const listCities = await getListCity();
      const rs = {
        ...job,
        infoCompany: company,
      };

      setData(rs);
      setListCity(listCities);
    };
    fetchApi();
  }, []);

  const onFinish = async (values) => {

    const option = {
      "id": createId(),
      "idCompany": data.idCompany,
      "idJob": data.id,
      "name": values.name,
      "phone": values.phone,
      "email": values.email,
      "statusRead": true,
      "description": values.description,
      "linkProject": values.linkProject,
      "createAt": getCurrentTime(),
      "city": values.city
    }


    const respond = await createCV(option);
    if(respond){
      form.resetFields();
      api.success({
        message: `Gửi yêu cầu thành công`,
        description: "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất",
        placement:"topRight"
      });
    }else{
      api.error({
        message: `Gửi yêu cầu không thành công`,
        description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu",
        placement:"topRight"
      });
    }
  };

  return (
    <>
    {contextHolder}
      {data && (
        <>
          <div className="job__item">
            <h1>{data.name}</h1>
          </div>
          <div className="job__item">
            <Button type="primary" href="#formApply">
              ỨNG TUYỂN NGAY
            </Button>
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
            Tên công ty:{" "}
            <strong>{data.infoCompany && data.infoCompany.companyName}</strong>
          </div>
          <div className="job__item">
            Thời gian đăng bài: <strong>{data.createAt}$</strong>
          </div>
          <div className="job__item">
            <h5>Mô tả:</h5>
            {data.description}
          </div>

          <Card title="Ứng tuyển ngay" id="formApply">
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Row gutter={[20,20]}>
                {/* Họ tên */}
                <Col span={6}>
                  <Form.Item
                    label="Họ tên"
                    name="name"
                    rules={rules} 
                  >
                    <Input />
                  </Form.Item>
                </Col>

                 {/* Số điện thoại */}
                 <Col span={6}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={rules} 
                  >
                    <Input />
                  </Form.Item>
                </Col>

                 {/* Email*/}
                 <Col span={6}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={rules} 
                  >
                    <Input />
                  </Form.Item>
                </Col>

                 {/* Họ tên */}
                 <Col span={6}>
                  <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={rules} 
                  >
                    <Select>
                      {listCity && listCity.map((item, index) => (
                        <Option value={item.value} label={item.value} key={index}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {/* Giới thiệu bản thân */}
                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={rules} 
                  >
                       <TextArea rows={6} />
                  </Form.Item>
                </Col>

                {/* Danh sách link project đã làm */}
                <Col span={24}>
                  <Form.Item
                    label="Danh sách link project đã làm"
                    name="linkProject"
                    rules={rules} 
                  >
                       <TextArea rows={6} />
                  </Form.Item>
                </Col>

                {/* Nút gửi yêu cầu */}
                <Col span={6}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}

export default JobDetail;
