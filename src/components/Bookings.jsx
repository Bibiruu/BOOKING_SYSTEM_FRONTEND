import React, { useState, useEffect } from "react";
import { Col, Row, Card, Spin, Divider, Button } from "antd";
import { apiInstance } from "../utils/api";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  //closure excecution
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get("/bookings");
        const data = response.data; // getting data
        if (data.success) {
          setBookings(data.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

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
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <h3>My Bookings</h3>
          <Link to="/order">
            <Button type="primary">Order</Button>
          </Link>
        </div>

        <Row gutter={16}>
          {loading ? (
            <Spin />
          ) : (
            bookings.map((booking) => (
              <Col span={6} style={{ paddingBottom: "1rem" }}>
                <Card
                  title={booking.date}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      color: "red",
                      padding: "0.5rem 1rem",
                      boxShadow: "2px 2px 2px 2px #eeee",
                      borderRadius: "10px",
                    }}
                  >
                    {booking.status}
                  </p>
                  <p>{booking.description}</p>
                  <Divider />

                  <h4>SERVICES</h4>
                  <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                    {booking.booking_has_service.map((bService) => (
                      <li>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{bService.service.name}</span>
                          <strong>
                            {bService.quantity} m<sup>2</sup>
                          </strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </div>
  );
};

export default Bookings;
