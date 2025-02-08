import { Button } from "antd";
import { Link } from "react-router-dom";
import JobList from "../../components/JobList";

function JobManage(){
    return (
        <>
        <h1>Danh sách việc làm</h1>
        <Link to={"/create-job"}>
            <Button type="default">Tạo việc làm mới</Button>
        </Link>
        <JobList/>
        </>
    );
}

export default JobManage;