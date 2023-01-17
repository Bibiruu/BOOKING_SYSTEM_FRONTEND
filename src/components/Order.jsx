import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Spin,
  Divider,
  Calendar,
  Space,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { apiInstance } from "../utils/api";
//import { useNavigate } from "react-router-dom";
const { Option } = Select;

const Order = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  //const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loadingService, setLoadingService] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [form]=Form.useForm()


  const getServices = async () => {
    try {
      setLoadingService(true);
      const response = await apiInstance.get("/services");
      const data = response.data; // getting the data
      console.log("THIS THE DATA", data);
      if (response.data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingService(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const onSelectService = (value) => {
    console.log(value);
    setSelectedServices((prev) => [...prev, value]);
  };

  const removeService = (name) => {
    console.log(form.getFieldValue([name, "id"]))
  }

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
            <Form form={form} onFinish={onFinish} layout="vertical">
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
                name="address"
                required
              >
                <Input placeholder="Raivaussiivous osoite" />
              </Form.Item>
              <Form.Item
                label="Description/Viesti"
                name="description"
                required
                tooltip="Tähän voi antaa lisää infoa tai huomioita/ohjeita"
              >
                <Input.TextArea rows={3} placeholder="Huomio/Viestikenttä" />
              </Form.Item>
              <Divider />

              <Form.List name="services">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "id"]}
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Service",
                            },
                          ]}
                        >
                          <Select
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                            onChange={onSelectService}
                            placeholder="Select Service"
                          >
                            {services.map((service) => (
                              <Option
                                disabled={selectedServices.includes(service.id)}
                                value={service.id}
                              >
                                {service.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Quantity/Määrä Puuttuu",
                            },
                          ]}
                        >
                          <Input placeholder="Quantity/Määrä" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => {remove(name); removeService(name)}} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Service / Lisää Palvelu
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Order;
