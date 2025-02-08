import { Button, Card, Form, Input, message } from "antd";
import "./style.scss";
import { generateToken } from "../../helper/token";
import { checkExist, createNewCompany } from "../../services/companyService";
import {useNavigate} from "react-router-dom";

function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const style={
        width: 600,
      }
  const onFinish = async (values) => {
    values.token = generateToken();
    const chkExistEmail = await checkExist("email", values.email);
    const chkExistPhoneNumber = await checkExist("phone", values.phone);

    if(chkExistEmail.length > 0){
        messageApi.error("Email này đã tồn tại!");
    }else if(chkExistPhoneNumber.length > 0){
        messageApi.error("Số điện thoại này đã tồn tại!");
    }else{
        const rs = await createNewCompany(values);
        if(rs){
            navigate("/login")
        }
    }
  };

  return (
    <>
    {contextHolder}
      <div className="form-register">
        <Card
          title="Đăng kí tài khoản"
          style={{
            width: 500,
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Tên công ty"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên công ty!",
                },
              ]}
              style={style}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền email!",
                },
              ]}
              style={style}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone" style={style}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              style={style}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Register;
