import React from "react";
//import { useNavigate } from "react-router-dom";

import {
  getProfile,
} from "../../services/ProfileService";

export const Profile_CONFIRMED_ACTION = "[getProfile action] confirmed getProfile";
export const Profile_FAILED_ACTION = "[getProfile action] failed getProfile";

export function signupAction() {
  return (dispatch) => {
    getProfile()
      .then((response) => {
        
      })
      .catch((error) => {
       
      });
  };
}


//Create function for requesting to connect with MetaMask
