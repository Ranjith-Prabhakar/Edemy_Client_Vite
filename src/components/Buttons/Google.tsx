import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../lib/firebase";
import { FcGoogle } from "react-icons/fc";
import GeneralButton from "./GeneralButton";
// import axios from "axios";
function GoogleButton() {
  const handleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("result", result);
      // const data: string = {data:result.user.uid}
      const data: { data: string } = { data: result.user.uid };
      console.log("result", data);
      // const serverResult = await axios.post(
      //   `http://localhost:3500/gauth`,
      //   data
      // );
      // console.log("serverResult", serverResult);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GeneralButton
      onClick={() => {
        handleSignup();
      }}
    >
      <p className="inline">
        Login with
        <span>
          <FcGoogle className="inline ms-2" size={25} />
        </span>
      </p>
    </GeneralButton>
  );
}

export default GoogleButton;
