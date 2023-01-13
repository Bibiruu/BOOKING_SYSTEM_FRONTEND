import React, { useState } from "react";
import { Col, Row, Form, Input, Button, Spin, Divider, Calendar } from "antd";
//import { apiInstance } from "../utils/api";
//import { useNavigate } from "react-router-dom";

const Order = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  //const navigate = useNavigate();
  //const [order, setOrder] = useState([]);
  //const [loading, setLoading] = useState(false);

  /*const getServices = async (values) => {
    console.log("Form values", values);
    try {
      setLoading(true);
      const response = await apiInstance.get("/services", values);
      const data = response.data; // getting the data
      console.log("THIS THE DATA", data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        setOrder(data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };*/

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "4rem",
        backgroundColor: "#eee",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <h3>TILAUS</h3>
        </div>

        <Row style={{ height: "100%", marginBottom: "3rem" }} gutter={16}>
          <Col
            style={{ backgroundColor: "#fff", padding: "1rem" }}
            span={12}
            offset={6}
          >
            <Form layout="vertical">
              <Calendar
                style={{
                  width: "300px",
                  border: "1px",
                  backgroundColor: "#f0f0f0",
                  borderradius: "8px",
                }}
                fullscreen={false}
                onPanelChange={onPanelChange}
              />
              <Form.Item
                label="Raivaussiivous osoite"
                name="requiredMarkValue"
                required
              >
                <Input placeholder="Raivaussiivous osoite" />
              </Form.Item>
              <Form.Item
                label="Description/Viesti"
                required
                tooltip="Tähän voi antaa lisää infoa tai huomioita/ohjeita"
              >
                <Input.TextArea rows={3} placeholder="Huomio/Viestikenttä" />
              </Form.Item>
              <Divider />

              <Button type="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Order;
