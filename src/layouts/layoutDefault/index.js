import Header from "./header";
import Footer from "./footer";
import {Outlet} from "react-router-dom";
import "./style.scss";

function LayoutDefault(){
    return (<>
        <div className="layout">
            <div className="layout__header">
                <Header/>
            </div>
            <div className="layout__content">
                <Outlet/>
            </div>
            <div className="layout__footer">
                <Footer/>
            </div>
        </div>
    </>)
}

export default LayoutDefault;