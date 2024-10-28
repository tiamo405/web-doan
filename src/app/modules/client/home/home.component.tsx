import { Button, Col, Modal, Row, Spin } from "antd";
import { ListCameraTable } from "./components/homeTable";
import { useGetCamera } from "./home.loader"
import './home.css'
const Home = () => {

  const {data: dataCamera, isLoading: isLoadingCamera} = useGetCamera({
    page: 1,
    limit:10
  });
  console.log(dataCamera);
  return (
    <>
      <Row style={{padding:"50px"}}>
        <Col span={24} xxl={24} xl={24}>
          <Row justify={"space-between"}>
            <Col>
              <span className="titleCamera">CAMERA</span>{" "}
            </Col>
            <Col>
              <Row gutter={[10, 0]}>
                <Col>
                  <Button type="primary" >
                    Add camera
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            justify={"space-between"}
            style={{
              marginTop: "30px",
            }}
            gutter={[0, 30]}
          >
            <Col
              xl={24}
              xs={24}
              style={{ backgroundColor: "#fff"}}
            >
              <Row justify={"space-between"} gutter={[0, 40]}>
                <>
                  <ListCameraTable
                    data={dataCamera?.cameras ?? []}
                    isLoading={isLoadingCamera}
                  />
                </>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Modal loading */}
      <Modal
        open={isLoadingCamera}
        footer={false}
        closable={false}
        centered={true}
      >
        <Col span={24}>
          <Row justify={"center"}>
            <h1></h1>
          </Row>
          <Row justify={"center"}>
            <Spin />
          </Row>
        </Col>
      </Modal>
    </>
  )
}

export default Home