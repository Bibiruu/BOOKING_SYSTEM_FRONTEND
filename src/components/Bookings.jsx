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
        padding: "1rem",
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
          ) : !bookings.length ? (
            <p>No bookings yet</p>
          ) : (
            bookings.map((booking) => (
              <Col
                key={booking.id}
                style={{ paddingBottom: "1rem" }}
                xs={24}
                sm={12}
                md={6}
                lg={6}
              >
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
                    {booking.booking_has_service.map((bService, i) => (
                      <li key={i}>
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
