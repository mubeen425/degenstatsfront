import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Row, Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import axiosInstance, { addReward } from "../../services/AxiosInstance";
import SingleTask from "../components/tasks/SingleTask";
import SingleReward from "../components/tasks/SingleReward";

const CompleteTask = () => {
  const { changeBackground } = useContext(ThemeContext);
  const [tasksData, setTasksData] = useState([]);

  const [tweetStatus, setTweetStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, [changeBackground]);

  useEffect(() => {
    // Fetch tasks when the component mounts
    const getTasks = async () => {
      try {
        const response = await axiosInstance.get("/api/tasks");
        setTasksData(response.data); // Set the retrieved task data in state
      } catch (error) {
        console.error("Error while fetching tasks: ", error);
      }
    };

    getTasks(); // Call the function when the component mounts
  }, []);

  // const getTasks = async () => {
  //   try {
  //     const response = await axiosInstance.get("/api/tasks");
  //     setTasksData(response.data); // Set the retrieved task data in state
  //   } catch (error) {
  //     console.error("Error while fetching tasks: ", error);
  //   }
  // };
  // getTasks();
  // const getTasks = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/api/tasks");
  //     setTasksData(response.data);
  //   } catch (error) {
  //     console.error("Error while fetching tasks: ", error);
  //   }
  // };
  // getTasks();

  useEffect(() => {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("status")) {
      setTweetStatus(urlParams.get("status"));
      localStorage.setItem("status", tweetStatus);
      window.location.href = "/complete-task";
    }
  }, [tweetStatus]);

  // useEffect(() => {
  //   if (localStorage.getItem("status") === "success") {
  //     toast.success("Tweet Successfull.");
  //   }
  //   localStorage.removeItem("status");
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("status") === "success") {
      toast.success("Tweet Successful.");
      setShowModal(true);
      const storedJsonString = localStorage.getItem("userDetails");
      const storedJsonObject = JSON.parse(storedJsonString);
      const storedWalletAddress = storedJsonObject.walletaddress;
      addReward(storedWalletAddress);
      // Show the modal on successful tweet
    }
    localStorage.removeItem("status");
  }, []);

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    // Close the modal
  };

  useEffect(() => {
    if (localStorage.getItem("status") === "success") {
      toast.success("Instagram posted  Successfully..!.");
      setShowModal2(true); // Show the modal on successful action
      localStorage.removeItem("status"); // Clear the status
    }
  }, []);

  // const tasksData = [
  //   {
  //     amount: 10,
  //     currency: "memes",
  //     heading: "verify your identity to get 20 MEME token voucher",
  //     leftDays: 4,
  //     leftHours: 15,
  //     leftMinutes: 15,
  //     countOne: "",
  //     countTwo: "",
  //     // image: "../../images/metaverse.png", // Add image URL here
  //     // caption: "I have brought this memes ", // Add caption here

  //   },
  //   {
  //     amount: 50,
  //     currency: "MEME",
  //     heading: "deposit 10 USD to get 20 MEME 0% interest voucher",
  //     leftDays: 3,
  //     leftHours: 20,
  //     leftMinutes: 10,
  //     countOne: 0,
  //     countTwo: 20,

  //     // caption: "Caption for task 1", // Add caption here
  //   },
  //   {
  //     amount: 50,
  //     currency: "usd",
  //     heading: "deposit 20 USD to get 50 MEME 0% interest voucher",
  //     leftDays: 4,
  //     leftHours: 18,
  //     leftMinutes: 18,
  //     countOne: 0,
  //     countTwo: 20,
  //   },
  //   {
  //     amount: 40,
  //     currency: "eur",
  //     heading: "deposit 30 USD to get 30 MEME 0% interest voucher",
  //     leftDays: 8,
  //     leftHours: 14,
  //     leftMinutes: 49,
  //     countOne: 0,
  //     countTwo: 30,
  //   },
  // ];

  return (
    <>
      <Toaster />
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
        {!tasksData && (
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

        {/* ---| if there is no available task then show this |--- */}
        <div className="row my-2">
          <Container>
            <Row>
              {tasksData.map((item, index) => (
                // <SingleTask taskData={item} />
                <SingleTask key={index} taskData={item} />
              ))}
            </Row>
          </Container>
        </div>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Congratulations Task Accomplished. You have earned 20 MEME rewards
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CompleteTask;
