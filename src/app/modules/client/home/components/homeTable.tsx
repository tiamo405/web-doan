import { Col, Row, Spin, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
interface listCameraProps {
  data: any;
  isLoading:any;
}

interface ReportCameraHistory {
  key: React.Key;
  name: string;
}

export const ListCameraTable: React.FC<listCameraProps> = ({
  data,
  isLoading,
}) => {
  console.log(data);
  
  const columCamera: ColumnsType<ReportCameraHistory> = [
    {
      title: "_id",
      align: "center",
      dataIndex: "",
    },
    {
      title: "rtsp_cam",
      align: "center",
      dataIndex: "rtsp_cam",
    },
    {
      title: "Is Activate",
      align: "center",
      dataIndex: "is_activate",
      render: (text) => (
        <Tag color={text ? 'green' : 'red'}>
          {text ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: "Date Added",
      align: "center",
      dataIndex: "date_added",
      render: (text) => (
        <span>
          {dayjs(text).format('DD/MM/YYYY')} {/* Định dạng ngày */}
        </span>
      ),
    },
    {
      title: "location",
      align: "center",
      dataIndex: "location",
    },
    {
      title: "add_by_customer_id",
      align: "center",
      dataIndex: "add_by_customer_id",
    },
    {
      title: "Origin Image",
      align: "center",
      dataIndex: "origin_image",
      render: (text) => (
        <img 
          src={text} 
          alt="Origin" 
          style={{ width: 100, height: 100, objectFit: 'cover' }} 
        />
      ),
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
            />
            {/* <Row justify={"end"} style={{ marginTop: "20px" }}>
              <Pagination
                current={pageReportCategoryHistory}
                total={totalPage * 10}
                showSizeChanger={true}
                onChange={changePage}
              />
            </Row> */}
          </>
        )}
      </Col>
    </>
  );
};
