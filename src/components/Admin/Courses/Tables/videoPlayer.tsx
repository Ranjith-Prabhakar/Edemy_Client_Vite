import ReactPlayer from "react-player";
type Props = {
  videoUrl: string;
};
const VideoPlayer = ({ videoUrl = "" }: Props) => {
  const getVideo = async () => {
    // try {
    //   const result = await axios.get(`${url}/getVideo`, {
    //     withCredentials: true,
    //   });
    //   setVideo(result.data);
    //   console.log("result", result);
    //   console.log("video", video);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  return (
    <div>
      <button onClick={getVideo}>Play</button>
      {videoUrl !== "" && (
        <ReactPlayer url={videoUrl} width="640px" height="360px" controls />
      )}
    </div>
  );
};

export default VideoPlayer;
