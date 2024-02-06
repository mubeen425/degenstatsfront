import React from "react";
import {
  Button,
  Col,
  Container,
  Image,
  ProgressBar,
  Row,
} from "react-bootstrap";
import loaderGif from "../../../images/loader-small.gif";

const SingleReward = () => {
  return (
    <div className="row my-2">
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Col xs={12} md={6} className="mb-4" style={{ height: "100%" }}>
            <div
              className="p-4"
              style={{
                width: "100%",
                background: "#15073a",
                borderRadius: "1.25rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div style={{ width: "25%" }}>
                <h6 className="heading text-center">300</h6>
                <p className="text-white text-center text-uppercase">usd</p>
              </div>
              <div className="my-1" style={{ width: "75%" }}>
                <h6 className="heading text-capitalize">
                  complete 2 tasks to get 300 USD token voucher
                </h6>
                <div
                  className="my-3"
                  style={{
                    width: "85%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "white",
                          fontWeight: "semibold",
                          fontSize: "16px",
                        }}
                      >
                        3
                      </span>
                    </div>
                    <div>Days</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "white",
                          fontWeight: "semibold",
                          fontSize: "16px",
                        }}
                      >
                        22
                      </span>
                    </div>
                    <div>Hours</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "white",
                          fontWeight: "semibold",
                          fontSize: "16px",
                        }}
                      >
                        12
                      </span>
                    </div>
                    <div>Min</div>
                  </div>
                </div>
                <div className="my-4">
                  <ProgressBar striped now={50} />
                </div>
                <div className="mt-2">
                  <Button className="px-5 text-capitalize disabled">
                    claim reward
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={6} md={3} style={{ height: "100%" }}>
            <div
              className="py-4 px-2"
              style={{
                width: "100%",
                background: "#15073a",
                borderRadius: "1.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Image src={loaderGif} width="40%" />
              </div>

              <div className="my-2" style={{ textAlign: "center" }}>
                <h6
                  className="text-capitalize"
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  1. deposit 20 USDT
                </h6>
                <span>20/20 USDT</span>
              </div>
              <div style={{ width: "85%" }}>
                <Button
                  className="text-capitalize text-center disabled"
                  style={{ width: "100%" }}
                >
                  completed
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={6} md={3} style={{ height: "100%" }}>
            <div
              className="py-4 px-2"
              style={{
                width: "100%",
                background: "#15073a",
                borderRadius: "1.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Image src={loaderGif} width="40%" />
              </div>

              <div className="my-2" style={{ textAlign: "center" }}>
                <h6
                  className="text-capitalize"
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  2. deposit 30 BUSD
                </h6>
                <span>0/30 BUSD</span>
              </div>
              <div style={{ width: "85%" }}>
                <Button
                  className="text-capitalize text-center"
                  style={{ width: "100%" }}
                >
                  do task
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleReward;
