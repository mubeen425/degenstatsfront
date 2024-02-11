import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Nav, Row, Modal } from "react-bootstrap";
import { ThemeContext } from "../../../context/ThemeContext";
import axios from "axios";
import axiosInstance from "../../../services/AxiosInstance";
const CreateTask = () => {
  const { changeBackground } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({
    task_title: "",
    task_description: "",
    reward_amount: 0,
    start_time_days: 0,
    start_time_hours: 0,
    start_time_minutes: 0,
    should_tweet: false,
    should_insta: false,
    should_tiktok: false,
    should_facebook: false,
    video: null,
    image: null,
    video_caption: "",
    image_caption: "", // Added caption field for image
  });

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log(task);
    try {
      const formData = new FormData();
      formData.append("task_title", task.task_title);
      formData.append("task_description", task.task_description);
      formData.append("video", task.video);
      formData.append("image", task.image);
      formData.append("video_caption", task.video_caption);
      formData.append("image_caption", task.image_caption);
      formData.append("reward_amount", task.reward_amount);
      formData.append("start_time_days", task.start_time_days);
      formData.append("start_time_hours", task.start_time_hours); // Include with default value
      formData.append("start_time_minutes", task.start_time_minutes); // Include with default value
      formData.append("should_tweet", task.should_tweet); // Include with default value
      formData.append("should_insta", task.should_insta); // Include with default value
      formData.append("should_tiktok", task.should_tiktok); // Include with default value
      formData.append("should_facebook", task.should_facebook); // Include with default value
      
      // formData.append("task_title", task.task_title);
      // formData.append("task_description", task.task_description);
      // formData.append("video", task.video);
      // formData.append("image", task.image);
      // formData.append("video_caption", task.video_caption); // Append video caption
      // formData.append("image_caption", task.image_caption); // Append image caption
      //  const jwtToken = '';
      const response = await axiosInstance
        .post("/api/tasks/addtask", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            //Authorization: `Bearer ${jwtToken}`,
          },
        })
        .catch((error) => console.log(error.response.data));
      console.log(response.data);

      setShowModal(true);
    } catch (error) {
      console.error(error);
      // if (error.response) {
      //   // The request was made, but the server responded with an error status code
      //   console.error("Response data:", error.response.data);
      //   console.error("Response status:", error.response.status);
      // } else if (error.request) {
      //   // The request was made, but no response was received
      //   console.error("No response received from the server");
      // } else {
      //   // Something else went wrong
      //   console.error("Error:", error.message);
      // }
    }
  };

  const handleCloseModal = () => {
    // Close the modal and reset the form if needed
    setShowModal(false);
    // You can also reset the form fields here
    setTask({
      task_title: "",
      task_description: "",
      reward_amount: 0,
      start_time_days: 0,
      start_time_hours: 0,
      start_time_minutes: 0,
      should_tweet: false,
      should_insta: false,
      should_tiktok: false,
      should_facebook: false,
      video: null,
      image: null,
      video_caption: "", // Added caption field for video
      image_caption: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "radio") {
      setTask((prevTask) => ({ ...prevTask, [name]: value === "true" }));
    } else if (type === "file") {
      const file = files[0];
      setTask((prevTask) => ({
        ...prevTask,
        [name]: file,
      }));
    } else {
      setTask((prevTask) => ({ ...prevTask, [name]: value }));
    }
  };

  return (
    <>
      {/* ---| Create tasks here |--- */}
      <h2>Create a task</h2>

      <Form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task title"
          className="form-control"
          name="task_title"
          value={task.task_title}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          className="form-control"
          name="task_description"
          value={task.task_description}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Reward amount"
          className="form-control"
          name="reward_amount"
          value={task.reward_amount}
          onChange={handleChange}
        />
        <br />
        <label className="heading text-white mr-4">Start Time</label>
        <input
          type="number"
          placeholder="Days"
          className="mt-3 form-control"
          name="start_time_days"
          value={task.start_time_days}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Hours"
          className="mt-3 form-control"
          name="start_time_hours"
          value={task.start_time_hours}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Minutes"
          className="mt-3 form-control"
          name="start_time_minutes"
          value={task.start_time_minutes}
          onChange={handleChange}
        />
        <br />
        <label className="heading text-white mr-4">Should tweet</label>
        <input
          type="radio"
          name="should_tweet"
          className="mr-2"
          value="true"
          checked={task.should_tweet === true}
          onChange={handleChange}
        />
        <label className="mr-4 text-white">Yes</label>
        <input
          type="radio"
          name="should_tweet"
          className="mr-2"
          value="false"
          checked={task.should_tweet === false}
          onChange={handleChange}
        />
        <label className="text-white">No</label>
        <br />

        <br />
        <label className="heading text-white mr-4">
          Should Post On Facebook
        </label>
        <input
          type="radio"
          name="should_facebook"
          className="mr-2"
          value="true"
          checked={task.should_facebook === true}
          onChange={handleChange}
        />

        <label className="mr-4 text-white">Yes</label>
        <input
          type="radio"
          name="should_facebook"
          className="mr-2"
          value="false"
          checked={task.should_facebook === false}
          onChange={handleChange}
        />
        <label className="text-white">No</label>
        <br />
        <label className="heading text-white mr-4">Video post on TikTok</label>
        <input
          type="radio"
          name="should_tiktok"
          className="mr-2"
          value="true"
          checked={task.should_tiktok === true}
          onChange={handleChange}
        />
        <label className="mr-4 text-white">Yes</label>
        <input
          type="radio"
          name="should_tiktok"
          className="mr-2"
          value="false"
          checked={task.should_tiktok === false}
          onChange={handleChange}
        />
        <label className="text-white">No</label>

        {/* Input field to select a video */}
        {task.should_tiktok && (
          <>
            <br />
            <label className="text-white">Select a video:</label>
            <input
              type="file"
              accept="video/*"
              name="video"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              placeholder="Video Caption"
              className="form-control"
              name="video_caption"
              value={task.video_caption}
              onChange={handleChange}
            />
          </>
        )}

        <br />

        <label className="heading text-white mr-4">Post on Instagram</label>
        <input
          type="radio"
          name="should_insta"
          className="mr-2"
          value="true"
          checked={task.should_insta === true}
          onChange={handleChange}
        />
        <label className="mr-4 text-white">Yes</label>
        <input
          type="radio"
          name="should_insta"
          className="mr-2"
          value="false"
          checked={task.should_insta === false}
          onChange={handleChange}
        />
        <label className="text-white">No</label>

        {/* Input field to select an image */}
        {task.should_insta && (
          <>
            <br />
            <label className="text-white">Select an image:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              placeholder="Image Caption"
              className="form-control"
              name="image_caption"
              value={task.image_caption}
              onChange={handleChange}
            />
          </>
        )}

        <br />

        <Button className="mt-4 px-5 text-capitalize" type="submit">
          create task
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Task Successfully Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your task has been created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTask;

// import React, { useContext, useEffect, useState } from "react";
// import { Button, Container, Form, Nav, Row } from "react-bootstrap";
// import { ThemeContext } from "../../../context/ThemeContext";
// import axios from "axios";

// const CreateTask = () => {
//   const { changeBackground } = useContext(ThemeContext);
//   const [task, setTask] = useState({
//     task_title: "",
//     task_description: "",
//     reward_amount: 0,
//     start_time_days: 0,
//     start_time_hours: 0,
//     start_time_minutes: 0,
//     should_tweet: false,
//     should_insta: false,
//     should_tiktok: false, // New property for TikTok
//     should_facebook: false, // New property for Facebook
//   });

//   useEffect(() => {
//     changeBackground({ value: "dark", label: "Dark" });
//   }, []);

//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://cryptojugend-bd0c060f0a83.herokuapp.com/api/tasks/addtask",
//         task
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "radio") {
//       setTask((prevTask) => ({ ...prevTask, [name]: value === "true" }));
//     } else {
//       setTask((prevTask) => ({ ...prevTask, [name]: value }));
//     }
//   };

//   return (
//     <>
//       {/* ---| Create tasks here |--- */}
//       <h2>Create a task</h2>

//       <Form onSubmit={handleCreateTask}>
//         <input
//           type="text"
//           placeholder="Task title"
//           className="form-control"
//           name="task_title"
//           value={task.task_title}
//           onChange={handleChange}
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Description"
//           className="form-control"
//           name="task_description"
//           value={task.task_description}
//           onChange={handleChange}
//         />
//         <br />
//         <input
//           type="number"
//           placeholder="Reward amount"
//           className="form-control"
//           name="reward_amount"
//           value={task.reward_amount}
//           onChange={handleChange}
//         />
//         <br />
//         <label className="heading text-white mr-4">Start Time</label>
//         <input
//           type="number"
//           placeholder="Days"
//           className="mt-3 form-control"
//           name="start_time_days"
//           value={task.start_time_days}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           placeholder="Hours"
//           className="mt-3 form-control"
//           name="start_time_hours"
//           value={task.start_time_hours}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           placeholder="Minutes"
//           className="mt-3 form-control"
//           name="start_time_minutes"
//           value={task.start_time_minutes}
//           onChange={handleChange}
//         />
//         <br />
//         <label className="heading text-white mr-4">Should tweet</label>
//         <input
//           type="radio"
//           name="should_tweet"
//           className="mr-2"
//           value="true"
//           checked={task.should_tweet === true}
//           onChange={handleChange}
//         />
//         <label className="mr-4 text-white">Yes</label>
//         <input
//           type="radio"
//           name="should_tweet"
//           className="mr-2"
//           value="false"
//           checked={task.should_tweet === false}
//           onChange={handleChange}
//         />
//         <label className="text-white">No</label>
//         <br />
//         <label className="heading text-white mr-4">Should Post On Instagram</label>
//         <input
//           type="radio"
//           name="should_insta"
//           className="mr-2"
//           value="true"
//           checked={task.should_insta === true}
//           onChange={handleChange}
//         />
//         <label className="mr-4 text-white">Yes</label>
//         <input
//           type="radio"
//           name="should_insta"
//           className="mr-2"
//           value="false"
//           checked={task.should_insta === false}
//           onChange={handleChange}
//         />
//         <label className="text-white">No</label>
//         <br />
//         <label className="heading text-white mr-4">Video post on TikTok</label>
//         <input
//           type="radio"
//           name="should_tiktok"
//           className="mr-2"
//           value="true"
//           checked={task.should_tiktok === true}
//           onChange={handleChange}
//         />
//         <label className="mr-4 text-white">Yes</label>
//         <input
//           type="radio"
//           name="should_tiktok"
//           className="mr-2"
//           value="false"
//           checked={task.should_tiktok === false}
//           onChange={handleChange}
//         />
//         <label className="text-white">No</label>
//         <br />
//         <label className="heading text-white mr-4">Post on Facebook</label>
//         <input
//           type="radio"
//           name="should_facebook"
//           className="mr-2"
//           value="true"
//           checked={task.should_facebook === true}
//           onChange={handleChange}
//         />
//         <label className="mr-4 text-white">Yes</label>
//         <input
//           type="radio"
//           name="should_facebook"
//           className="mr-2"
//           value="false"
//           checked={task.should_facebook === false}
//           onChange={handleChange}
//         />
//         <label className="text-white">No</label>
//         <br />

//         <Button className="mt-4 px-5 text-capitalize" type="submit">
//           create task
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default CreateTask;
