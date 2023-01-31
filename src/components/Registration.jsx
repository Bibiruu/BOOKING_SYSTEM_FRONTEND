import React, { useState } from "react";
import { LockOutlined, UserOutlined, HomeOutlined, PhoneOutlined, NumberOutlined, MailOutlined  } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { instance } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      setLoading(true);
      const result = await instance.post("/auth/register", values);
      if (result.data.success) {
        localStorage.setItem("token", result.data.accessToken); // saving data in the local storage
        message.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        message.error("Wrong credentials"); // antdesign error handling
      }
      setLoading(false);
    } catch (error) {
      message.error("Error in registration"); // antdesign error handling
      setLoading(false);
    }
  };

  

  return (
    <>
    <div className="header">
      REKISTERÖINTI
    </div>
    <div className="auth-container">
      <Form
        name="normal_login"
        className="auth-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input your surname",
            },
          ]}
        >
          
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Surname"
          />
        </Form.Item>

        <Form.Item
          name="cell_phone"
          rules={[
            {
              required: true,
              message: "Please input your cellphone number",
            },
          ]}
        >
          
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Cellphone"
          />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Give Your Address",
            },
          ]}
        >
          
          <Input
            prefix={<HomeOutlined className="site-form-item-icon" />}
            placeholder="Address"
          />
        </Form.Item>

        <Form.Item
          name="postal_code"
          rules={[
            {
              required: true,
              message: "Enter postal code",
            },
          ]}
        >
          
          <Input
            prefix={<NumberOutlined className="site-form-item-icon" />}
            placeholder="Postal code"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
          Or <a href="/login">register now!</a>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default Registration;
