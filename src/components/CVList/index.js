import { Button, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { Link } from "react-router-dom";
import DeleteJob from "../DeleteJob";
import EditJob from "../EditJob";
import { getCVByIdCompany } from "../../services/cvService";
import { getJobName } from "../../services/jobService";
import JobName from "../JobName";
import DeleteCV from "../DeleteCV";

function CVList() {
  const [data, setData] = useState();
  const idCompany = getCookie("id");

  const fetchApi = async () => {
    const rs = await getCVByIdCompany(idCompany);
    setData(rs);
  };

  const reloadPage = () => {
    fetchApi();
  }

  useEffect(() => {
   
    fetchApi();
  }, []);

  const columns = [
    {
      title: "Tên job",
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => (
        <>
          <JobName id={record.idJob}/>
        </>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, record) => (
        <>
          <small>Ngày gửi: {record.createAt}</small>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="gray">Chưa đọc</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={"/detail-cv/" + record.id}>
            <Tooltip>
              <Button // icon={<EyeOutlined />}>
              >
                Xem
              </Button>
            </Tooltip>
          </Link>
          <DeleteCV record={record} reload={reloadPage}/>
        </>
      ),
    },
  ];

  return <>{<Table columns={columns} dataSource={data} />}</>;
}

export default CVList;
