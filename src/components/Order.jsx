import React, { useState } from "react";
import { Col, Row, Form, Input, Button, Spin, Divider } from "antd";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <h3>PLACE AN ORDER</h3>
        </div>

        <Row style={{ height: "100%", marginBottom: "3rem" }} gutter={16}>
          {loading ? (
            <Spin />
          ) : (
            <Col
              style={{ backgroundColor: "#fff", padding: "1rem" }}
              span={12}
              offset={6}
            >
              <Form
                //form={form}
                layout="vertical"
              >
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
          )}
        </Row>
      </div>
    </div>
  );
};

export default Order;
