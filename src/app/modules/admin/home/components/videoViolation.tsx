import {
  ArrowLeftOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Alert, Button, Col, Modal, Pagination, Row, Spin, Switch } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useDeleteViolation } from "../home.loader";
interface listVideoViolationProps {
  data: any;
  isLoading: any;
  setShowFirstTableVideoViolation: any;
  setIsPageVideoViolation: any;
  totalPageVideoViolation: any;
  isPageVideoViolation: any;
  mutateSetViolation: any;
  isLoadingSetViolation: any;
  dataUseSetViolation: any;
}

interface ReportVideoViolation {
  key: React.Key;
  name: string;
}

export const ListVideoViolationTable: React.FC<listVideoViolationProps> = ({
  data,
  isLoading,
  setShowFirstTableVideoViolation,
  setIsPageVideoViolation,
  totalPageVideoViolation,
  isPageVideoViolation,
  mutateSetViolation,
  isLoadingSetViolation,
  dataUseSetViolation,
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const columVideoViolation: ColumnsType<ReportVideoViolation> = [
    {
      title: "Index",
      align: "center",
      render: (_value, _record, index) => {
        return (isPageVideoViolation - 1) * 5 + index + 1;
      },
    },
    // {
    //   title: "Camera ID",
    //   align: "center",
    //   dataIndex: "camera_id",
    // },
    // {
    //   title: "Date time",
    //   align: "center",
    //   dataIndex: "date_time",
    //   render: (text) => (
    //     <span>
    //       {dayjs(text).format("DD/MM/YYYY")}
    //     </span>
    //   ),
    // },
    {
      title: "Start time",
      align: "center",
      dataIndex: "start_time",
      render: (text) => (
        <span>
          {dayjs.unix(text).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "End time",
      align: "center",
      dataIndex: "end_time",
      render: (text) => (
        <span>
          {dayjs.unix(text).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "Video name",
      align: "center",
      dataIndex: "video_path",
    },
    {
      title: "Video",
      align: "center",
      dataIndex: "url_video",
      render: (url: any) => (
        <Button
          type="link"
          icon={<PlayCircleOutlined style={{ fontSize: "24px" }} />}
          style={{ fontSize: "18px", padding: "8px 16px" }}
          onClick={() => showModal(url)}
        />
      ),
    },
  ];
  const [isViolation, setIsViolation] = useState(false);
  useEffect(() => {
    setIsViolation(dataUseSetViolation.is_violation);
  }, [dataUseSetViolation]);

  const { mutate: mutateDeleteViolation, isLoading: isLoadingDeleteViolation } =
    useDeleteViolation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [tempSwitchValue, setTempSwitchValue] = useState();
  const [isModalDeleteViolation, setIsModalDeleteViolation] = useState(false);
  const showConfirmModal = (value: any) => {
    setTempSwitchValue(value);
    setIsConfirmModal(true);
  };
  const handleOkeConfirm = () => {
    setIsConfirmModal(false);
    setIsViolation(tempSwitchValue!);
    mutateSetViolation({
      image_id: dataUseSetViolation._id,
      is_violation: tempSwitchValue,
    });
  };

  const handleCancelConfirm = () => {
    setIsConfirmModal(false);
  };
  const handleBack = () => {
    setShowFirstTableVideoViolation(true);
  };
  const changePage = (page: any) => {
    setIsPageVideoViolation(page);
  };
  const showModal = (url: any) => {
    setIsModalVisible(true);
    setVideoUrl(url);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setVideoUrl("");
  };

  const handleDeleteViolation = () => {
    setIsModalDeleteViolation(true);
  };

  const handlOkDeleteViolation = () => {
    mutateDeleteViolation({ id_image: dataUseSetViolation?._id });
    setIsModalDeleteViolation(false);
    setShowFirstTableVideoViolation(true);
  };

  const handleCancelDeleteViolation = () => {
    setIsModalDeleteViolation(false);
  };
  return (
    <>
      <Col span={24}>
        <Row justify="end" align="middle" style={{ marginBottom: "20px" }}>
          <b style={{ fontSize: "17px" }}>Administrator verify violation: </b>
          <Switch
            checkedChildren="True"
            unCheckedChildren="False"
            style={{ margin: "10px", marginRight: "30px" }}
            checked={isViolation}
            onChange={(checkedClick) => showConfirmModal(checkedClick)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            style={{ marginRight: "30px" }} // Tạo khoảng cách giữa nút Delete và nút Back
            onClick={handleDeleteViolation}
          >
            Delete
          </Button>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            Back
          </Button>
        </Row>
        {isLoading ? (
          <Row justify={"center"}>
            <Spin size="large" />
          </Row>
        ) : (
          <>
            <Table
              columns={columVideoViolation}
              dataSource={data ?? []}
              pagination={false}
            />
          </>
        )}
        <Row justify={"end"} style={{ marginTop: "20px" }}>
          <Pagination
            current={isPageVideoViolation}
            total={totalPageVideoViolation * 10}
            onChange={changePage}
          />
        </Row>
      </Col>
      <Modal
        title="Watch Video"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        {/* Video player */}
        {videoUrl && (
          <ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
          />
        )}
      </Modal>

      <Modal
        title="Confirm changes"
        onOk={handleOkeConfirm}
        visible={isConfirmModal}
        onCancel={handleCancelConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Alert
          message={<p>Are you sure you want to change this option?</p>}
          type="error"
          showIcon
        />
      </Modal>

      {/* Modal loading */}
      <Modal
        open={isLoadingSetViolation || isLoadingDeleteViolation}
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

      {/* Modal delete */}

      <Modal
        title="Delete violation"
        open={isModalDeleteViolation}
        onOk={handlOkDeleteViolation}
        onCancel={handleCancelDeleteViolation}
      >
        <Alert
          message={
            <p>
              Are you sure you want to delete this violation image in "
              <b>{dataUseSetViolation?.location}"</b> ?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
    </>
  );
};
