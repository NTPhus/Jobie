import { Col, Row } from "antd";
import JobStatistic from "../../components/JobStatistic";
import CVStatistic from "../../components/CVStatistic";
import CompanyCard from "../../components/CompanyCard";

function Dashboard() {
  return (
    <>
      <h1>Tổng quan</h1>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <JobStatistic />
        </Col>
        <Col span={8}>
          <CVStatistic/>
        </Col>
        <Col span={8}>
          <CompanyCard />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
