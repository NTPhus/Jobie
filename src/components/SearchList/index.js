import "./style.scss";
import JobItem from "../JobItem";

function SearchList(props) {
  const { data } = props;
  return (
    <>
      <div className="searchList">
        {data.length === 1 && (<JobItem item={data[0]}/>)}
        {data.length > 0 ? (
          data.map((item) => {
            <JobItem item={item}/>
          })
        ) : (
          <>Không có công việc nào</>
        )}
      </div>
    </>
  );
}

export default SearchList;
