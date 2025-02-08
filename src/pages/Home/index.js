import { Button, Form, Input, Select, Tag, Card } from "antd";
import { useEffect, useState } from "react";
import { getListCity } from "../../services/cityService";
import { getListTags } from "../../services/tagService";
import { getListCompany } from "../../services/companyService";
import { Link, useNavigate } from "react-router-dom";
import CompanyItem from "../../components/CompanyItem";

function Home() {
  const [listCity, setListCity] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [listCompany, setListCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const listCities = await getListCity();
      const listTags = await getListTags();
      const listHintCompany = await getListCompany();
      let nameCity = [];
      for (let i = 0; i < listCities.length; i++) {
        nameCity.push({
          value: listCities[i].value,
          label: listCities[i].value,
        });
      }
      setListCity(nameCity);

      setListTag(listTags);

      let arrCompany = [];
      for (let i = 0; i < 2; i++) {
        arrCompany.push(listHintCompany[i]);
      }
      setListCompany(arrCompany);
    };
    fetchApi();
  }, []);


  const handleFinish = (values) => {
    let city = values.city === undefined ? "" : values.city;
    navigate(`/search?city=${city}&keyword=${values.keyword || ""}`);
  };

  return (
    <>
      <div className="title">1000+ IT Jobs for Developers</div>
      <div className="form">
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="city">
            <Select
              showSearch
              placeholder="Chọn thành phố"
              optionFilterProp="label"
              options={listCity}
            />
          </Form.Item>
          <Form.Item name="keyword">
            <Input placeholder="Nhập từ khóa" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="tag">
        {listTag.map((item) => (
            <Link key={item.id} to={"/search?keyword="+item.value}>
                <Tag color="blue">
                    {item.value}
                </Tag>
            </Link>
        ))}
      </div>
      <div className="hint">
        <div className="hint__title">
          <h2>Danh sách một số công ty</h2>
        </div>
        <div className="hint__company">
            {listCompany.map(item => (
                <CompanyItem item={item} key={item.id}/>
            ))}          
        </div>
        <Link to={"/company"}><Button type="default">Xem thêm</Button></Link>
      </div>
    </>
  );
}

export default Home;
