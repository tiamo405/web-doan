import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Image, Pagination, Row, Spin, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
interface listCameraHistoryProps {
  data: any;
  isLoading: any;
  setShowFirstTable: any;
  setIsPageHistory: any;
  totalPageHistory: any;
  isPageHistory: any;
  rtspUrl: any;
  setShowFirstTableVideoViolation: any;
  setIsIdImage: any;
  setDataSetViolation: any;
}

interface ReportCameraHistory {
  key: React.Key;
  name: string;
}

export const ListCameraHistoryTable: React.FC<listCameraHistoryProps> = ({
  data,
  isLoading,
  setShowFirstTable,
  setIsPageHistory,
  totalPageHistory,
  isPageHistory,
  rtspUrl,
  setShowFirstTableVideoViolation,
  setIsIdImage,
  setDataSetViolation,
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const columCamera: ColumnsType<ReportCameraHistory> = [
    {
      title: "Index",
      align: "center",
      render: (_value, _record, index) => {
        return (isPageHistory - 1) * 5 + index + 1;
      },
    },
    // {
    //   title: "Camera ID",
    //   align: "center",
    //   dataIndex: "camera_id",
    // },
    {
      title: "Detect timestamp",
      align: "center",
      dataIndex: "detect_timestamp",
      render: (text) => (
        <span>
           {dayjs.unix(text).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Is violation",
      align: "center",
      dataIndex: "is_violation",
      render: (text) => {
        return (
          <Tag color={text ? "green" : "red"}>{text ? "true" : "false"}</Tag>
        );
      },
    },
    {
      title: "Image",
      align: "center",
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
      title: "Location",
      align: "center",
      dataIndex: "location",
    },
    {
      title: "Action",
      align: "center",

      render: (_, record) => (
        <Button type="primary" onClick={() => handleVideoViolation(record)}>
          Video inspection
        </Button>
      ),
    },
  ];
  const handleBack = () => {
    setShowFirstTable(true);
  };
  const changePage = (page: any) => {
    setIsPageHistory(page);
  };
  const handleVideoViolation = (value: any) => {
    setIsIdImage(value?._id);
    setDataSetViolation(value);
    setShowFirstTableVideoViolation(false);
  };
  return (
    <>
      <Col span={24}>
        <Row justify="center">
          <h3>{rtspUrl}</h3>
        </Row>
        <Row justify="end" style={{ marginBottom: "20px" }}>
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
            // showSizeChanger={true}
            onChange={changePage}
          />
        </Row>
      </Col>
    </>
  );
};
