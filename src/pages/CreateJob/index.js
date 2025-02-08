import { Button, Col, Form, Input, notification, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import TextArea from "antd/es/input/TextArea";
import { getListTags } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { createId, getCurrentTime } from "../../services/dataService";
import { createNewJob } from "../../services/jobService";

function CreateJob() {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [cities, setCities] = useState([]);
  const idCompany = getCookie("id");
  const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchApi = async () => {
            const resTags = await getListTags();
            const resCities = await getListCity();
            setCities(resCities);
            setTags(resTags);
        };
        fetchApi();
    },[])

  const rules = [
    {
      required: true,
      message: "Vui lòng nhập thông tin!",
    },
  ];

  const onFinish = async (values) => {
    values.idCompany = idCompany;
    values.createAt = getCurrentTime();
    values.status = values.status === undefined ? true : values.status;
    values.updateAt = getCurrentTime();
    values.id = createId();
    console.log(values);
    const res = await createNewJob(values);
    if (res) {
        form.resetFields();
      api.success({
        message: `Tạo job mới thành công`,
        placement: "topRight",
      });
    } else {
      api.error({
        message: `Tạo job mới không thành công`,
        description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu",
        placement: "topRight",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={20}>
          <Col span={20}>
            <h2>Thông tin Job</h2>
          </Col>
          <Col span={24}>
            <Form.Item label="Tên job" name="name" rules={rules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="tags" name="tags" rules={rules}>
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                options={tags}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Mức lương" name="salary" rules={rules}>
              <Input addonAfter={"$"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Thành phố" name="city" rules={rules}>
            <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                options={cities}
              />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={24}>
                <Form.Item label="Trạng thái" name="status">
                    <Switch defaultChecked />
                </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Hoàn tất
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CreateJob;
