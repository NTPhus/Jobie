import {
  Button,
  Col,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Switch,
  Form,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { updateJob } from "../../services/jobService";

function EditJob(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const { record, reload } = props;

  
  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rules = [
    {
      required: true,
      message: "Vui lòng nhập thông tin!",
    },
  ];

  const onFinish = async (values) => {
    values.id = record.id;
    const res = await updateJob(values);
    setIsModalOpen(false);
    reload();
    if (res) {
      form.resetFields();
      api.success({
        message: `Cập nhật job thành công`,
        placement: "topRight",
      });
    } else {
      api.error({
        message: `Cập nhật job không thành công`,
        description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu",
        placement: "topRight",
      });
    }
  };

  return (
    <>
      <>
        <Button type="primary" onClick={showModal}>
          Chỉnh sửa
        </Button>
        <Modal
          title="Chỉnh sửa Job"
          open={isModalOpen}
          onCancel={handleCancel}
          width={800}
          footer={null}
        >
          {contextHolder}
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            options={record}
            style={{
              width: "700px",
            }}
          >
            <Row gutter={20}>
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
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Mô tả" name="description">
                  <TextArea rows={10} />
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
        </Modal>
      </>
    </>
  );
}

export default EditJob;
