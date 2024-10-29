import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
interface listCameraHistoryProps {
  data: any;
  isLoading: any;
  setShowFirstTable: any;
  setIsPageHistory: any;
  totalPageHistory: any;
  isPageHistory: any;
  rtspUrl: any;
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
}) => {
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
          {dayjs(text).format("HH:mm:ss - DD/MM/YYYY")} {/* Định dạng ngày */}
        </span>
      ),
    },
    // {
    //   title: "Violation date",
    //   align: "center",
    //   dataIndex: "violation_date",
    //   render: (text) => (
    //     <span>
    //       {dayjs(text).format("DD/MM/YYYY")} {/* Định dạng ngày */}
    //     </span>
    //   ),
    // },
    {
      title: "Image",
      align: "center",
      dataIndex: "url_image",
      render: (text) => (
        <img
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
  ];
  const handleBack = () => {
    setShowFirstTable(true);
  };
  const changePage = (page: any) => {
    setIsPageHistory(page);
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
