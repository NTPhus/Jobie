import { Button, Popconfirm } from "antd";
import { deleteJob } from "../../services/jobService";

function DeleteJob(props) {
  const { record, reload } = props;

  const confirm = async () => {
    await deleteJob(record.id);
    reload();
  };

  return (
    <>
      <Popconfirm
        title="Xóa job này"
        description="Bạn có chắc chắn là muốn xóa job này?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Xóa</Button>
      </Popconfirm>
    </>
  );
}

export default DeleteJob;
