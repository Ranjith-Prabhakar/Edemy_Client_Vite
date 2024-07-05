import { FcGoogle } from "react-icons/fc";
import GeneralButton from "./GeneralButton";
function GoogleButton() {

  function navigate(url: string) {
    window.location.href = url;
  }
  async function auth() {
    const response = await fetch("http://127.0.0.1:8000/api/v1/gauth_url", {
      method: "post",
    });
    // const response = await fetch("https://digi-world.online/api/v1/gauth_url", {
    //   method: "post",
    // });
    const data = await response.json();
    navigate(data.url);
  }
  return (
    <GeneralButton
      onClick={() => {
        auth();
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
