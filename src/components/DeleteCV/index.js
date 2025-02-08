import { Button, Popconfirm } from "antd";
import { deleteCVById } from "../../services/cvService";

function DeleteCV(props) {
  const { record, reload } = props;

  const confirm = async () => {
    await deleteCVById(record.id);
    reload();
  };

  return (
    <>
      <Popconfirm
        title="Xóa CV này"
        description="Bạn có chắc chắn là muốn xóa CV này?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Xóa</Button>
      </Popconfirm>
    </>
  );
}

export default DeleteCV;
