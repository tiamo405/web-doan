// import { ArrowLeftOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Image, Modal, Pagination, Row, Spin, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
interface listCameraHistoryProps {
  data: any;
  isLoading: any;
  setIsPageHistory: any;
  totalPageHistory: any;
  isPageHistory: any;
  mutateDeleteViolation: any;
  isLoadingDeleteViolation: any;
}

interface ReportCameraHistory {
  key: React.Key;
  name: string;
}

export const ListViolationTable: React.FC<listCameraHistoryProps> = ({
  data,
  isLoading,
  //   setShowFirstTable,
  setIsPageHistory,
  totalPageHistory,
  isPageHistory,
  mutateDeleteViolation,
  isLoadingDeleteViolation,
  //   rtspUrl,
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const columCamera: ColumnsType<ReportCameraHistory> = [
    {
      title: "STT",
      align: "center" as "center",
      render: (_value, _record, index) => {
        return (isPageHistory - 1) * 5 + index + 1;
      },
    },
    {
      title: "Thời gian phát hiện",
      align: "center" as "center",
      dataIndex: "detect_timestamp",
      render: (text) => (
        <span>
          {dayjs
            .unix(text)
            .tz("Asia/Ho_Chi_Minh")
            .format("HH:mm:ss - DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Vi phạm",
      align: "center" as "center",
      dataIndex: "is_violation",
      render: (text) => {
        return (
          <Tag color={text ? "green" : "red"}>{text ? "true" : "false"}</Tag>
        );
      },
    },
    {
      title: "Hình ảnh",
      align: "center" as "center",
      dataIndex: "url_image",
      render: (text) => (
        <Image
          src={text}
          alt="Origin"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Vị trí",
      align: "center" as "center",
      dataIndex: "location",
    },
    ...(localStorage.getItem("role") === "adminheheheh"
      ? [
          {
            title: "Chức năng",
            align: "center" as "center",
            render: (_: any, data: any) => {
              const handleDeleteSegment = (data: any) => {
                console.log(data);
                mutateDeleteViolation(data?._id);
              };
              return (
                <>
                  <DeleteOutlined
                    className="delete-button"
                    onClick={() => handleDeleteSegment(data)}
                  />
                </>
              );
            },
          },
        ]
      : []),
  ];

  //   const handleBack = () => {
  //     setShowFirstTable(true);
  //   };
  const changePage = (page: any) => {
    setIsPageHistory(page);
  };
  return (
    <>
      <Col span={24}>
        {isLoading ? (
          <Row justify={"center"}>
            <Spin size="large" />
          </Row>
        ) : (
          <>
            <Table
              columns={columCamera}
              dataSource={data ?? []}
              pagination={false}
            />
          </>
        )}
        <Row justify={"end"} style={{ marginTop: "20px" }}>
          <Pagination
            current={isPageHistory}
            total={totalPageHistory * 10}
            showSizeChanger={false}
            onChange={changePage}
          />
        </Row>
      </Col>

      <Modal
        open={isLoadingDeleteViolation}
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
    </>
  );
};
