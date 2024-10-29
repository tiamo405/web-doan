import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Pagination, Row, Spin, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
interface listCameraProps {
  data: any;
  isLoading: any;
  total_pages: any;
  setIsPage: any;
  isPage: any;
  setIsRtsp: any;
  setShowFirstTable: any;
}

interface ReportCameraHistory {
  key: React.Key;
  name: string;
}

export const ListCameraTable: React.FC<listCameraProps> = ({
  data,
  isLoading,
  total_pages,
  setIsPage,
  isPage,
  setIsRtsp,
  setShowFirstTable,
}) => {
  const changePage = (page: any) => {
    setIsPage(page);
  };
  const handleRtsp = (value: any) => {
    setIsRtsp(value.rtsp_cam);
    setShowFirstTable(false);
  };
  const columCamera: ColumnsType<ReportCameraHistory> = [
    {
      title: "_id",
      align: "center",
      dataIndex: "",
    },
    {
      title: "Rtsp Camera",
      align: "center",
      dataIndex: "rtsp_cam",
    },
    {
      title: "Is activate",
      align: "center",
      dataIndex: "is_activate",
      render: (text) => (
        <Tag color={text ? "green" : "red"}>{text ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Date added",
      align: "center",
      dataIndex: "date_added",
      render: (text) => (
        <span>
          {dayjs(text).format("DD/MM/YYYY")} {/* Định dạng ngày */}
        </span>
      ),
    },
    {
      title: "Location",
      align: "center",
      dataIndex: "location",
    },
    {
      title: "Add by customer id",
      align: "center",
      dataIndex: "add_by_customer_id",
    },
    {
      title: "Origin image",
      align: "center",
      dataIndex: "origin_image",
      render: (text) => (
        <img
          src={text}
          alt="Origin"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, data: any) => {
        return (
          <>
            <EditOutlined
              className="edit-button"
              onClick={() => handleEdit(data)}
            />
            <DeleteOutlined
              className="delete-button"
              onClick={() => handleDeteteSegment(data)}
            />
          </>
        );
        function handleDeteteSegment(data: any) {
          console.log(data);
        }
        function handleEdit(data: any) {
          console.log(data);
        }
      },
    },
  ];
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
              onRow={(record) => {
                return {
                  onClick: () => {
                    handleRtsp(record);
                  },
                };
              }}
            />
            <Row justify={"end"} style={{ marginTop: "20px" }}>
              <Pagination
                current={isPage}
                total={total_pages * 10}
                // showSizeChanger={true}
                onChange={changePage}
              />
            </Row>
          </>
        )}
      </Col>
    </>
  );
};
