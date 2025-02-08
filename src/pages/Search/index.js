import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListJobs } from "../../services/jobService";
import { Tag } from "antd";
import SearchList from "../../components/SearchList";

function Search(){
    const [searchParams, setSearchParams] = useSearchParams();
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const allJobs = await getListJobs();
            if(allJobs){
                const newData = allJobs.filter((item) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const status = item.status;
                    return city && keyword && status;
                });
                setData(newData.reverse());
            }
        }
        fetchApi();
    },[])
    return(<>
        <div>
            <strong>Kết quả tìm kiếm: </strong>
            {citySearch && <Tag>{citySearch}</Tag>}
            {keywordSearch && <Tag>{keywordSearch}</Tag>}            
        </div>
            {data && (
                <SearchList data={data}/>
            )}
    </>)
}

export default Search;