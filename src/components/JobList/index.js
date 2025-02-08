import { Button, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { getListJobByIdCompany } from "../../services/jobService";
import { Link } from "react-router-dom";
import DeleteJob from "../DeleteJob";
import EditJob from "../EditJob";

function JobList() {
  const [data, setData] = useState();
  const idCompany = getCookie("id");

  const fetchApi = async () => {
    const rs = await getListJobByIdCompany(idCompany);
    setData(rs);
  };

  const reLoadPage = () => {
    fetchApi();
  }

  useEffect(() => {
    fetchApi();
  }, []);

  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag, index) => {
            return (
              <Tag color={"blue"} key={index}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "createAt",
      render: (_, record) => (
        <>
          <small>Ngày tạo: {record.createAt}</small>
          <br />
          <small>Ngày cập nhật: {record.updateAt}</small>
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
            <Tag color="green">Bật</Tag>
          ) : (
            <Tag color="red">Tắt</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={"/job-detail/" + record.id}>
            <Tooltip>
              <Button // icon={<EyeOutlined />}>
              >
                Xem
              </Button>
            </Tooltip>
          </Link>
          <EditJob record={record} reload={reLoadPage}/>
          <DeleteJob record={record} reload={reLoadPage}/>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default JobList;
