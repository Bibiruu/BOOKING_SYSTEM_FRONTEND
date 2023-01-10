import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { instance } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      setLoading(true);
      const result = await instance.post("/auth/login", values);
      if (result.data.success) {
        localStorage.setItem("token", result.data.data); // saving data in the local storage
        message.success("Login Successful");
        setTimeout(() => {
          navigate("/bookings");
        }, 3000);
      } else {
      message.error("Wrong credentials"); // antdesign error handling
      }
      setLoading(false);
    } catch (error) {
      message.error("Error in login"); // antdesign error handling
      setLoading(false);
    }
  };

  return (
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
            prefix={<UserOutlined className="site-form-item-icon" />}
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="#">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
