import ReactPlayer from "react-player";
type Props = {
  videoUrl: string;
};
const VideoPlayer = ({ videoUrl = "" }: Props) => {
  return (
    <div>
      {videoUrl !== "" && (
        <ReactPlayer url={videoUrl} width="550px" height="260px" controls />
      )}
    </div>
  );
};

export default VideoPlayer;
