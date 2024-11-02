import { Button, Col, DatePicker, Form, Input, Modal, Row, Spin } from "antd";
import { ListCameraTable } from "./components/homeTable";
import {
  useAddCamera,
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
  const [form] = Form.useForm();
  const currentTime = dayjs();
  const formattedDate = currentTime.format("DD/MM/YYYY");
  const timestampCurrentDate = dayjs(formattedDate, "DD/MM/YYYY").unix();
  const [isPage, setIsPage] = useState(1);
  const [isPageHistory, setIsPageHistory] = useState(1);
  const [isPageVideoViolation, setIsPageVideoViolation] = useState(1);
  const [isRtsp, setIsRtsp] = useState("");
  const [isDate, setIsDate] = useState(timestampCurrentDate);
  const [showFirstTable, setShowFirstTable] = useState(true);
  const [isIdImage, setIsIdImage] = useState("");
  const [dataUseSetViolation, setDataSetViolation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const { mutate: mutateAddCamera, isLoading: isLoadingAddCamera } =
    useAddCamera();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const onChangeDate = (date: any) => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm:ss");
    const timestamp = dayjs(formattedDate, "DD/MM/YYYY HH:mm:ss").unix();
    setIsDate(timestamp);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("rtsp_url", values?.rtsp_url || ""),
          formData.append("location", values?.location || ""),
          mutateAddCamera(formData);
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row style={{ padding: "20px" }}>
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
                    defaultValue={currentTime}
                  />
                </Col>
                <Col>
                  <Button type="primary" onClick={showModal}>
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
            <Col xl={24} xs={24} style={{ backgroundColor: "#fff" }}>
              <Row
                justify={"space-between"}
                gutter={[0, 40]}
                style={{ padding: "20px" }}
              >
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

      {/* Modal add & edit camera */}

      <Modal
        title="Add camera"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="rtsp_url"
            label="Rtsp url"
            rules={[{ required: true, message: "Please enter rtsp url" }]}
          >
            <Input placeholder="Enter rtsp url" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal loading */}

      <Modal
        open={isLoadingAddCamera}
        footer={false}
        closable={false}
        centered={true}
      >
        <Col span={24}>
          <Row justify={"center"}>
            <h1>Loadingg...</h1>
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
