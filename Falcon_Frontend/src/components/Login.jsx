import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/loginvideo.mp4";
import { client } from "../Client";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import mainlogo from "../assets/mainlogo.png";

export const Login = () => {
  const navigate = useNavigate();

  const clientId =
    "768073421137-vmiksmplbput64ojjnmhibt45jcqr44v.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center text-center top-0 right-0 left-0 bottom-0 bg-blackOverlay ">
          <div className="bg-white md:w-96 p-3 m-3 rounded-lg shadow-2xl">
            <div className="flex flex-wrap flex-col justify-center items-center">
              <img
                className="mb-10 w-20 h-20 max-[300px]:mb-5"
                src={mainlogo}
                width="100px"
                height="100px"
                alt=""
              />
              <h1 className="text-4xl max-[300px]:text-2xl font-medium pb-5">Login to your Falcon account</h1>
            </div>
            <div className=" flex flex-wrap flex-col justify-center items-center">
              <GoogleLogin
                clientId={
                  "768073421137-vmiksmplbput64ojjnmhibt45jcqr44v.apps.googleusercontent.com"
                }
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-[#4285f4] text-white flex justify-center items-center p-3 max-[300px]:p-2 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle
                      size={30}
                      className="mr-4 bg-white p-[0.1rem] rounded-md"
                    />{" "}
                    Sign in with google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
              <p className="bg-white mt-10 max-[300px]:text-[10px] max-[300px]:mt-5">
                By signing up you agree with our{" "}
                <span className="text-blue-400">terms of service</span> &{" "}
                <span className="text-blue-400">privacy policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
