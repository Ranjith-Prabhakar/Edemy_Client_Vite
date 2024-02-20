import ReactPlayer from "react-player";
type Props = {
  videoUrl: string;
};
const VideoPlayer = ({ videoUrl = "" }: Props) => {
  return (
    <div>
      {videoUrl !== "" && (
        <ReactPlayer url={videoUrl} width="740px" height="360px" controls />
      )}
    </div>
  );
};

export default VideoPlayer;
