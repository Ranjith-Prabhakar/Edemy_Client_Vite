import ReactPlayer from "react-player";
type Props = {
  videoUrl: string;
  width?:string;
  height?:string;
};
const VideoPlayer = ({ videoUrl = "",width="550px",height="260px" }: Props) => {
  return (
    <div>
      {videoUrl !== "" && (
        <ReactPlayer url={videoUrl} width={width} height={height} controls />
      )}
    </div>
  );
};

export default VideoPlayer;
