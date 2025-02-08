import { Button, Col, Form, Input, notification, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getDataCompany, updateInfoCompany } from "../../services/companyService";
import { getCookie } from "../../helper/cookie";

function InfoCompany() {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const idCompany = getCookie("id");
  const [api, contextHolder] = notification.useNotification();

  const fetchApi = async () => {
    const res = await getDataCompany(idCompany);
    if(res){
        setData(res);
        form.setFieldsValue(res);
    }
    console.log(data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const rules = [
    {
      required: true,
      message: "Vui lòng nhập thông tin!",
    },
  ];

  const onFinish = async (values) => {
    values.id = idCompany;
    const res = await updateInfoCompany(values);
    if(res){
        setIsEdit(!isEdit);
        fetchApi();
        api.success({
          message: `Cập nhật thành công`,
          placement:"topRight"
        });
      }else{
        api.error({
          message: `Cập nhật không thành công`,
          description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu",
          placement:"topRight"
        });
      }
  };

  return (
    <>
    {contextHolder}
      <div className="info-company">
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          disabled={!isEdit}
          initialValues={data}
        >
          <Row gutter={20}>
            <Col span={20}>
              <h2>Thông tin công ty</h2>
            </Col>
            <Col span={4}>
              <Button
                type="default"
                onClick={() => setIsEdit(!isEdit)}
                disabled={false}
              >
                Chỉnh sửa
              </Button>
            </Col>
            <Col span={24}>
              <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Địa chỉ" name="address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số lượng nhân sự" name="quantityPeople">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Thời gian làm việc" name="workingTime">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Link Website" name="website">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả ngắn" name="description">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả chi tiết" name="detail">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button type="default" onClick={() => {setIsEdit(false); setData(data)}}>
                Hủy
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default InfoCompany;
