import {signIn} from "../utils/auths/authPopup.js";

const Login = () => {    
    // call the popup function from MS Azure AD
    signIn();   
};

export default Login;
