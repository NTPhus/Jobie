import { Button } from "antd";
import { getCookie } from "../../helper/cookie";
import { useSelector } from "react-redux";

function Header() {
  const token = getCookie("token");
  const isLogin = useSelector(state => state.loginReducer);

  return (
    <>
      <div className="layout__header--logo">IT Jobs</div>
      <div className="layout__header--account">
        {token ? (
          <>
            
            <div className="layout__header--account-button">
              <Button type="default" href="/admin">
                Quản lý
              </Button>
            </div>
            <div className="layout__header--account-button">
              <Button type="default" href="/logout">
                Đăng xuất
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="layout__header--account-button">
              <Button type="default" href="/login">
                Đăng nhập
              </Button>
            </div>
            <div className="layout__header--account-button">
              <Button type="primary" href="/register">
                Đăng kí
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
