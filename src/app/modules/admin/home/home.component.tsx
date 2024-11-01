import { Button, Col, DatePicker, Row } from "antd";
import { ListCameraTable } from "./components/homeTable";
import {
  useGetCamera,
  useGetCameraHistory,
  useGetVideoViolation,
  useSetViolation,
} from "./home.loader";
import "./home.css";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ListCameraHistoryTable } from "./components/historyTable";
import { ListVideoViolationTable } from "./components/videoViolation";
const Home = () => {
  const currentDate = dayjs();
  const timestampCurrentDate = currentDate.unix();
  const [isPage, setIsPage] = useState(1);
  const [isPageHistory, setIsPageHistory] = useState(1);
  const [isPageVideoViolation, setIsPageVideoViolation] = useState(1);
  const [isRtsp, setIsRtsp] = useState("");
  const [isDate, setIsDate] = useState(timestampCurrentDate);
  const [showFirstTable, setShowFirstTable] = useState(true);
  const [isIdImage, setIsIdImage] = useState("");
  const [dataUseSetViolation, setDataSetViolation] = useState("");
  const [showFirstTableVideoViolation, setShowFirstTableVideoViolation] =
    useState(true);
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
  const { data: dataVideoViolation, isLoading: isLoadingVideoViolation } =
    useGetVideoViolation({
      id_image_violation: isIdImage,
      page: isPageVideoViolation,
      limit: 10,
    });
  const { mutate: mutateSetViolation, isLoading: isLoadingSetViolation } =
    useSetViolation();
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
                {showFirstTable
                  ? "CAMERA"
                  : showFirstTableVideoViolation
                  ? "CAMERA HISTORY"
                  : "VIOLATION VIDEOS"}
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
                  ) : showFirstTableVideoViolation ? (
                    <ListCameraHistoryTable
                      data={dataCameraHistory?.entities?.violations}
                      isLoading={isLoadingCameraHistory}
                      setShowFirstTable={setShowFirstTable}
                      setIsPageHistory={setIsPageHistory}
                      isPageHistory={isPageHistory}
                      rtspUrl={dataCameraHistory?.entities?.rtsp_url}
                      totalPageHistory={dataCameraHistory?.entities?.totalPage}
                      setShowFirstTableVideoViolation={
                        setShowFirstTableVideoViolation
                      }
                      setIsIdImage={setIsIdImage}
                      setDataSetViolation={setDataSetViolation}
                    />
                  ) : (
                    <ListVideoViolationTable
                      data={dataVideoViolation?.entities?.videos}
                      isLoading={isLoadingVideoViolation}
                      setShowFirstTableVideoViolation={
                        setShowFirstTableVideoViolation
                      }
                      mutateSetViolation={mutateSetViolation}
                      isLoadingSetViolation={isLoadingSetViolation}
                      setIsPageVideoViolation={setIsPageVideoViolation}
                      isPageVideoViolation={isPageVideoViolation}
                      totalPageVideoViolation={
                        dataVideoViolation?.entities?.totalPage
                      }
                      dataUseSetViolation={dataUseSetViolation}
                    />
                  )}
                </>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
