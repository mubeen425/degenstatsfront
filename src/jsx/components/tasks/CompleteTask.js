import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Row } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext";
import SingleTask from "../components/tasks/SingleTask";
import SingleReward from "../components/tasks/SingleReward";
import axios from "axios";

const CompleteTask = () => {
  const { changeBackground } = useContext(ThemeContext);
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
    const getTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/tasks");
        setTasksData(response.data);
      } catch (error) {
        console.error("Error while fetching tasks: ", error);
      }
    };
    getTasks();
  }, [changeBackground]);

  return (
    <>
      {/* ---| Show tasks here |--- */}
      <div
        className="mb-5 p-4"
        style={{ background: "#25164F", borderRadius: "1.25rem" }}
      >
        <div className="row">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 className="heading">Complete Tasks</h4>
            <Nav className="order nav nav-tabs">
              <Nav.Link as="button" eventKey="Order" type="button">
                More
              </Nav.Link>
            </Nav>
          </div>
        </div>

        {/* ---| if there is no available task then show this |--- */}
        {tasksData.length === "0" && (
          <div className="row my-2">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="dataTables_info">
                Unfortunately, No tasks are available
              </div>
            </div>
          </div>
        )}

        {/* ---| if there are available tasks then show this |--- */}
        {tasksData.length > 0 && (
          <div className="row my-2">
            <Container>
              <Row>
                {tasksData.map((item, index) => (
                  <SingleTask taskData={item} />
                ))}
              </Row>
            </Container>
          </div>
        )}
      </div>

      {/* ---| Show rewards here |--- */}
      <div
        className="mb-5 p-4"
        style={{ background: "#25164F", borderRadius: "1.25rem" }}
      >
        <div className="row">
          <h4 className="heading text-capitalize">bigger rewards</h4>
        </div>
        {/* ---| if there is no available reward then show this |--- */}
        <div className="row my-2">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="dataTables_info">
              Unfortunately, There are no available rewads now
            </div>
          </div>
        </div>
        {/* ---| if there are available rewards then show this |--- */}
        <SingleReward />
      </div>
    </>
  );
};
export default CompleteTask;
