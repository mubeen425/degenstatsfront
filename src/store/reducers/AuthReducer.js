import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  CONNECTED_TO_METAMASK,
  CONNECTED_TO_Token,
  CONNECTED_TO_WALLET,
} from "../actions/AuthActions";

const initialState = {
  adminwalletaddress: "0xAE05E2f1750c6C9eaC6596e85aE453DbC50cbee1",
  //adminwalletaddress: "0x93B261501412bFadF9E6Daa5fa977DA27FC133dd",
  defultReffer: "0x97A760EeD672A22c0B782F813F30598B8f994038",
  auth: {
    email: "",
    idToken: "",
    localId: "",
    expiresIn: "",
    refreshToken: "",
  },
  errorMessage: "",
  successMessage: "",
  showLoading: false,
  tokenData: {},
  signer: {},
  account: "",
  provider: {},
  isLoggedInFromMobile: "",
};

export function AuthReducer(state = initialState, action) {
  if (action.type === SIGNUP_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMessage: "",
      successMessage: "Signup Successfully Completed",
      showLoading: false,
    };
  }
  if (action.type === LOGIN_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: {
        idToken: action.payload.token,
        walletaddress: action.payload.address,
        isAdmin: action.payload.isAdmin,
      },
      errorMessage: "",
      successMessage: "Login Successfully Completed",
      showLoading: false,
    };
  }

  if (action.type === LOGOUT_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      auth: {
        email: "",
        idToken: "",
        localId: "",
        expiresIn: "",
        refreshToken: "",
      },
      signer: {},
      account: "",
      provider: {},
      isLoggedInFromMobile: "",
    };
  }

  if (
    action.type === SIGNUP_FAILED_ACTION ||
    action.type === LOGIN_FAILED_ACTION
  ) {
    return {
      ...state,
      errorMessage: action.payload,
      successMessage: "",
      showLoading: false,
    };
  }

  if (action.type === LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
    };
  }
  if (action.type === CONNECTED_TO_METAMASK) {
    return {
      ...state,
      auth: {
        idToken: action.payload.token,
        walletaddress: action.payload.address,
        isAdmin: action.payload.isAdmin,
      },
      errorMessage: "",
      successMessage: "Login Successfully Completed",
      showLoading: false,
    };
  }
  if (action.type === CONNECTED_TO_Token) {
    return {
      ...state,
      tokenData: action.payload,
    };
  }
  if (action.type === CONNECTED_TO_WALLET) {
    //console.log("signer & account & provider during login", action.payload);
    return {
      ...state,
      signer: action.payload.signer,
      account: action.payload.account,
      provider: action.payload.provider,
      isLoggedInFromMobile: action.payload.isLoggedInFromMobile,
    };
  }
  return state;
}
