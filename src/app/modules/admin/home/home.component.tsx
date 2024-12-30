import {
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Spin,
} from "antd";
import { ListCameraTable } from "./components/homeTable";
import {
  useAddCamera,
  useChangeStatusCamera,
  useDeleteCamera,
  useGetCamera,
  useGetCameraHistory,
  useGetVideoViolation,
  useSetViolation,
  useUpdateCamera,
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
  const [isModalOpenEditCamera, setIsModalOpenEditCamera] = useState(false);
  const [isModalDeleteCamera, setIsModalDeleteCamera] = useState(false);
  const [isModalChangeStatusCamera, setIsModalChangeStatusCamera] = useState(false);
  const [isCameraSelect, setIsCameraSelect] = useState({} as any);
  const [dataUpdateCamera, setDataUpdateCamera] = useState({} as any);
  const [showFirstTableVideoViolation, setShowFirstTableVideoViolation] = useState(true);
  const [valueChangeStatusCamera, setValueChangeStatusCamera] = useState("");
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
    console.log(dataVideoViolation);
    
  const { mutate: mutateChangeStatusCamera, isLoading: isLoadingChangeStatusCamera} = useChangeStatusCamera();
  const { mutate: mutateSetViolation, isLoading: isLoadingSetViolation } = useSetViolation();
  const { mutate: mutateAddCamera, isLoading: isLoadingAddCamera } = useAddCamera();
  const { mutate: mutateDeleteCamera, isLoading: isLoadingDeleteCamera } = useDeleteCamera();
  const { mutate: mutateUpdateCamera, isLoading: isLoadingUpdateCamera } = useUpdateCamera();
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
          formData.append("add_by_customer_id", "671b0c1be9383de32aefd299"),
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
    setIsModalOpenEditCamera(false);
    setIsModalDeleteCamera(false);
    setIsModalChangeStatusCamera(false);
  };

  const handleDeleteCamera = () => {
    mutateDeleteCamera({ cam_id: isCameraSelect?._id });
    setIsModalDeleteCamera(false);
  };
  const handleChangeStatusCamera = () => {
    setIsModalChangeStatusCamera(false);
    mutateChangeStatusCamera({
      cam_id: isCameraSelect?._id,
      is_active: valueChangeStatusCamera,
    });
  };

  const handleUpdateCamera = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("cam_id", dataUpdateCamera?._id),
          formData.append("location", values?.location || ""),
          mutateUpdateCamera(formData);
        form.resetFields();
        setIsModalOpenEditCamera(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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
                  ? "LỊCH SỬ CAMERA"
                  : "VIDEO VI PHẠM"}
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
                    Thêm camera
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
                      setIsModalDeleteCamera={setIsModalDeleteCamera}
                      setIsCameraSelect={setIsCameraSelect}
                      setIsModalChangeStatusCamera={
                        setIsModalChangeStatusCamera
                      }
                      setValueChangeStatusCamera={setValueChangeStatusCamera}
                      setDataUpdateCamera={setDataUpdateCamera}
                      setIsModalOpenEditCamera={setIsModalOpenEditCamera}
                      form={form}
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

      {/* Modal add & edit */}

      <Modal
        title="Thêm camera"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="rtsp_url"
            label="Link rtsp"
            rules={[{ required: true, message: "Vui lòng nhập link rtsp" }]}
          >
            <Input placeholder="Nhập link rtsp" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Vị trí"
            rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}
          >
            <Input placeholder="Nhập vị trí" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal loading */}

      <Modal
        open={
          isLoadingAddCamera ||
          isLoadingDeleteCamera ||
          isLoadingChangeStatusCamera ||
          isLoadingUpdateCamera
        }
        footer={false}
        closable={false}
        centered={true}
      >
        <Col span={24}>
          <Row justify={"center"}>
            <h1>Vui lòng chờ...</h1>
          </Row>
          <Row justify={"center"}>
            <Spin />
          </Row>
        </Col>
      </Modal>

      {/* Modal delete */}

      <Modal
        title="Xoá camera"
        open={isModalDeleteCamera}
        onOk={handleDeleteCamera}
        onCancel={handleCancel}
      >
        <Alert
          message={
            <p>
              Bạn có chắc chắn muốn xoá camera:
              <b> "{isCameraSelect?.location}"</b> ?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>

      {/* Modal change status camera  */}
      <Modal
        title="Thay đổi trạng thái camera"
        open={isModalChangeStatusCamera}
        onOk={handleChangeStatusCamera}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Huỷ"
      >
        <Alert
          message={<p>Bạn có chắc chắn muốn thay đổi trạng thái camera?</p>}
          type="error"
          showIcon
        />
      </Modal>

      {/* Modal update camera */}
      <Modal
        title="Cập nhật camera"
        open={isModalOpenEditCamera}
        onOk={handleUpdateCamera}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="location"
            label="Location"
            rules={[
              { required: true, message: "Vui lòng nhập location camera" },
            ]}
          >
            <Input placeholder="Nhập location camera" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Home;
