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
  InputNumber,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { apiInstance } from "../utils/api";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const Order = () => {
  const navigate = useNavigate();

  const onPanelChange = (value) => {
    setDate(value.format("YYYY-MM-DD"));
  };

  //const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loadingService, setLoadingService] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [date, setDate] = useState("");
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    const body = { ...values, date }; //combining and conversion to milliseconds
    console.log("Received values of form:", body);
    try {
      setFormSubmitting(true);
      const response = await apiInstance.post("/bookings", body);
      if (response.data.success) {
        message.success("Booking successful");
        setTimeout(() => {
          navigate("/bookings");
        }, 1000);
      } else {
        message.error("Error in booking.");
      }
    } catch (error) {
      message.error("Error, try again.");
      console.log(error);
    }
    setFormSubmitting(false);
  };

  const onSelectService = (value) => {
    console.log(value);
    setSelectedServices((prev) => [...prev, value]);
  };

  const removeService = (name) => {
    //console.log(name);
    //console.log(form.getFieldValue("services"));
    const removedId = form.getFieldValue("services")[+name].service_id;
    setSelectedServices((prev) =>
      prev.filter((service) => service !== removedId)
    );
  };

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

        <div style={{ height: "100%", marginBottom: "3rem", display:"flex", justifyContent:"center" }}>
          <div
            style={{ backgroundColor: "#fff", padding: "1rem" }}           
            
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
                onSelect={onPanelChange}
              />
              <Form.Item
                label="Raivaussiivous osoite"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Give an address",
                  },
                ]}
              >
                <Input placeholder="Raivaussiivous osoite" />
              </Form.Item>
              <Form.Item
                label="Description/Viesti"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Viesti kenttään",
                  },
                ]}
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
                          name={[name, "service_id"]}
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Atleast one service is required",
                            },
                          ]}
                        >
                          {loadingService ? (
                            <Spin />
                          ) : (
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
                                  key={service.id}
                                  disabled={selectedServices.includes(
                                    service.id
                                  )}
                                  value={service.id}
                                >
                                  {service.name}
                                </Option>
                              ))}
                            </Select>
                          )}
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
                          <InputNumber min={1} placeholder="Quantity/Määrä" />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            removeService(name);
                            remove(name);
                          }}
                        />
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
                <Button
                  loading={formSubmitting}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
