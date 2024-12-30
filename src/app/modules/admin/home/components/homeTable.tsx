import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Col, Image, Pagination, Row, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
interface listCameraProps {
  data: any;
  isLoading: any;
  total_pages: any;
  setIsPage: any;
  isPage: any;
  setIsRtsp: any;
  setShowFirstTable: any;
  setIsModalDeleteCamera: any;
  setIsCameraSelect: any;
  setIsModalChangeStatusCamera: any;
  setValueChangeStatusCamera: any;
  setDataUpdateCamera: any;
  setIsModalOpenEditCamera: any;
  form: any;
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
  setIsModalDeleteCamera,
  setIsCameraSelect,
  setIsModalChangeStatusCamera,
  setValueChangeStatusCamera,
  setDataUpdateCamera,
  setIsModalOpenEditCamera,
  form,
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const changePage = (page: any) => {
    setIsPage(page);
  };
  const handleRtsp = (value: any) => {
    setIsRtsp(value.rtsp_cam);
    setShowFirstTable(false);
  };

  const handleEditSegment = (value: any) => {
    console.log(value);
    setIsModalOpenEditCamera(true);
    setDataUpdateCamera(value);
    form.setFieldsValue({
      location: value?.location,
    });
  };
  const columCamera: ColumnsType<ReportCameraHistory> = [
    {
      title: "STT",
      align: "center",
      render: (_value, _record, index) => {
        return (isPage - 1) * 10 + index + 1;
      },
    },
    {
      title: "Link rtsp camera",
      align: "center",
      dataIndex: "rtsp_cam",
    },
    {
      title: "Ngày thêm",
      align: "center",
      dataIndex: "date_added",
      render: (text) => (
        <span>
          {dayjs.unix(text).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Vị trí",
      align: "center",
      dataIndex: "location",
    },
    {
      title: "Thêm bởi",
      align: "center",
      dataIndex: "add_by",
    },
    {
      title: "Hình ảnh",
      align: "center",
      dataIndex: "origin_image",
      render: (text) => (
        <Image
          src={text}
          alt="Origin"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Trạng thái camera",
      align: "center",
      render: (_, data: any) => {
        return (
          <>
            <div className="checkbox-wrapper-55">
              <label className="rocker rocker-small">
                <input
                  type="checkbox"
                  checked={data?.is_activate}
                  onChange={(event) => handleToggleCamera(event, data)}
                />
                <span className="switch-left">Bật</span>
                <span className="switch-right">Tắt</span>
              </label>
            </div>
          </>
        );
        function handleToggleCamera(
          event: React.ChangeEvent<HTMLInputElement>,
          data: any
        ) {
          const isChecked = event.target.checked;
          setValueChangeStatusCamera(isChecked);
          setIsModalChangeStatusCamera(true);
          setIsCameraSelect(data);
        }
      },
    },
    {
      title: "Chức năng",
      align: "center",
      render: (_, data: any) => {
        return (
          <>
            <HistoryOutlined
              className="history-button"
              onClick={() => handleRtsp(data)}
            />{" "}
            <>
              {localStorage.getItem("role") === "admin" && (
                <>
                  <EditOutlined
                    className="edit-button"
                    onClick={() => handleEditSegment(data)}
                  />
                  <DeleteOutlined
                    className="delete-button"
                    onClick={() => handleDeteteSegment(data)}
                  />
                </>
              )}
            </>
          </>
        );
        function handleDeteteSegment(data: any) {
          setIsCameraSelect(data);
          setIsModalDeleteCamera(true);
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
