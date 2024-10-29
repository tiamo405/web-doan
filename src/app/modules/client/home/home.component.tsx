import { Button, Col, DatePicker, Modal, Row, Spin } from "antd";
import { ListCameraTable } from "./components/homeTable";
import { useGetCamera, useGetCameraHistory } from "./home.loader";
import "./home.css";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ListCameraHistoryTable } from "./components/historyTable";
const Home = () => {
  const currentDate = dayjs();
  const timestampCurrentDate = currentDate.unix();
  const [isPage, setIsPage] = useState(1);
  const [isPageHistory, setIsPageHistory] = useState(1);
  const [isRtsp, setIsRtsp] = useState("");
  const [isDate, setIsDate] = useState(timestampCurrentDate);
  const [showFirstTable, setShowFirstTable] = useState(true);
  const { data: dataCamera, isLoading: isLoadingCamera } = useGetCamera({
    page: isPage,
    limit: 10,
  });
  const { data: dataCameraHistory, isLoading: isLoadingCameraHistory } =
    useGetCameraHistory({
      rtsp_url: isRtsp,
      date: isDate,
      page: isPageHistory,
      limit: 5,
    });
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const onChangeDate = (date: any) => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm:ss");
    const timestamp = dayjs(formattedDate, "DD/MM/YYYY HH:mm:ss").unix();
    setIsDate(timestamp);
  };
  return (
    <>
      <Row style={{ padding: "50px" }}>
        <Col span={24} xxl={24} xl={24}>
          <Row justify={"space-between"}>
            <Col>
              <span className="titleCamera">
                {showFirstTable ? "CAMERA" : "CAMERA HISTORY"}
              </span>{" "}
            </Col>
            <Col>
              <Row gutter={[10, 0]}>
                <Col>
                  <DatePicker
                    onChange={onChangeDate}
                    needConfirm
                    defaultValue={currentDate}
                  />
                </Col>
                <Col>
                  <Button type="primary">Add camera</Button>
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
            <Col xl={24} xs={24} style={{ backgroundColor: "#fff" }}>
              <Row justify={"space-between"} gutter={[0, 40]}>
                <>
                  {showFirstTable ? (
                    <ListCameraTable
                      data={dataCamera?.entities?.cameras ?? []}
                      isLoading={isLoadingCamera}
                      setIsRtsp={setIsRtsp}
                      total_pages={dataCamera?.entities?.total_pages}
                      isPage={isPage}
                      setIsPage={setIsPage}
                      setShowFirstTable={setShowFirstTable}
                    />
                  ) : (
                    <ListCameraHistoryTable
                      data={dataCameraHistory?.entities?.violations}
                      isLoading={isLoadingCameraHistory}
                      setShowFirstTable={setShowFirstTable}
                      setIsPageHistory={setIsPageHistory}
                      isPageHistory={isPageHistory}
                      rtspUrl = {dataCameraHistory?.entities?.rtsp_url}
                      totalPageHistory={dataCameraHistory?.entities?.totalPage}
                    />
                  )}
                </>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Modal loading */}
      <Modal
        // open={isLoadingCamera}
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
  );
};

export default Home;
