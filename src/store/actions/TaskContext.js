// // TaskContext.js
// import { createContext, useReducer } from "react";

// // Define your initial state and reducer function here
// const initialState = {
//   tasks: [],
// };

// const taskReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TASK":
//       return {
//         ...state,
//         tasks: [...state.tasks, action.payload],
//       };
//     // Add other cases for handling different actions
//     default:
//       return state;
//   }
// };

// // Create the TaskContext
// export const TaskContext = createContext();

// // Create a TaskProvider component to wrap your application with
// export const TaskProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(taskReducer, initialState);

//   return (
//     <TaskContext.Provider value={{ state, dispatch }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };
// // taskActions.js
// export const ADD_TASK = "ADD_TASK";
