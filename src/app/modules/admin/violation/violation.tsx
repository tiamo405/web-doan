import { Col, Modal, Row, Select, Spin } from "antd";
import { ListViolationTable } from "./components/violationTable";
import {
  useGetAllListViolation,
  useGetALlLocationCamera,
} from "./violation.loader";
import { useState } from "react";
import "./violation.css";
import { useDeleteViolation } from "../home/home.loader";
export const ViolationList = () => {
  const [isPageHistory, setIsPageHistory] = useState(1);
  const [isViolationStatus, setIsViolationStatus] = useState(true);
  const [isLocation, setIsLocation] = useState("");
  const { data: dataListViolation, isLoading: isLoadingListViolation } =
    useGetAllListViolation({
      location: isLocation,
      is_violation: isViolationStatus,
      page: isPageHistory,
      limit: 5,
    });
  const { data: dataLocation } = useGetALlLocationCamera();
  const { mutate: mutateDeleteViolation, isLoading: isLoadingDeleteViolation } =
    useDeleteViolation();
  const handleSetIsViolation = (value: any) => {
    setIsViolationStatus(value);
  };
  const handleLocation = (index: any) => {
    setIsLocation(index);
  };
  return (
    <>
      <Row style={{ padding: "20px" }}>
        <Col span={24} xxl={24} xl={24}>
          <Row justify={"space-between"}>
            <Col>
              <span className="titleMainDashboard">DANH SÁCH VI PHẠM</span>{" "}
            </Col>
            <Col>
              <Row gutter={[10, 0]}>
                <Col>
                  <Select
                    style={{ width: 120 }}
                    placeholder="Chọn trạng thái"
                    defaultValue={isViolationStatus}
                    onChange={handleSetIsViolation}
                    options={[
                      { value: true, label: "True" },
                      { value: false, label: "False" },
                    ]}
                  />
                </Col>
                <Col>
                  <Select
                    style={{ width: 150 }}
                    placeholder="Chọn camera"
                    defaultValue=""
                    options={[
                      { value: "", label: "Chọn tất cả" },
                      ...(dataLocation?.entities?.locations ?? []).map(
                        (location: any) => ({
                          value: location,
                          label: location,
                        })
                      ),
                    ]}
                    onChange={handleLocation}
                  />
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
            <Col
              xl={24}
              xs={24}
              style={{ backgroundColor: "#fff", padding: "30px" }}
            >
              <Row justify={"space-between"} gutter={[0, 40]}>
                <>
                  <ListViolationTable
                    data={dataListViolation?.entities?.violations}
                    isLoading={isLoadingListViolation}
                    setIsPageHistory={setIsPageHistory}
                    isPageHistory={isPageHistory}
                    totalPageHistory={dataListViolation?.entities?.totalPage}
                    mutateDeleteViolation={mutateDeleteViolation}
                    isLoadingDeleteViolation={isLoadingDeleteViolation}
                  />
                </>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
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
