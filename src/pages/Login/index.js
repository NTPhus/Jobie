import { Button, Card, Checkbox, Form, Input } from "antd";
import "./style.scss";
import { login } from "../../services/companyService";
import { setCookie } from "../../helper/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const onFinish = async (values) => {
     const res = await login(values.username, values.password);
     if(res.length > 0){
        const time = 1;
        setCookie("id", res[0].id, time);
        setCookie("companyName", res[0].companyName, time);
        setCookie("email", res[0].email, time);
        setCookie("token", res[0].token, time);
        dispatch(checkLogin(true));
        navigate("/");
     }
  };
  return (
    <>
      <div className="form-login">
        <Card
          title="Đăng nhập"
          style={{
            width: 500,
          }}
        >
          <Form
            name="basic"
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
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
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Login;
