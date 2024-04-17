import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSetVideoTrackMutation } from "../../redux/features/course/courseApi";

type Props = {
  position?: string;
  videoUrl: string;
  userId?: string;
  courseId?: string;
  moduleNo?: string;
  moduleTittle?: string;
  videoNo?: string;
  videoTittle?: string;
  width?: string;
  height?: string;
};

const VideoPlayer = ({
  position = "",
  videoUrl = "",
  userId = "",
  courseId = "",
  moduleNo = "",
  moduleTittle = "",
  videoNo = "",
  videoTittle = "",
  width = "550px",
  height = "260px",
}: Props) => {
  console.log("position", position);
  const [setVideoTrack] = useSetVideoTrackMutation();
  const reactRef = useRef<ReactPlayer>(null);
  const [progress, setProgress] = useState(false);
  const [end, setEnd] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoUrl !== "") {
      reactRef.current?.seekTo(parseInt(position)); // Start from 10 seconds
      setProgress(false);
      setEnd(false);
    }
  }, [videoUrl, position]); // Trigger when videoUrl or playing state changes

  useEffect(() => {
    let time: number;
    let intervalIdOut: NodeJS.Timeout;
    if (progress && !end) {
      const intervalId = setInterval(() => {
        // Get the current time every 30 seconds
        const currentTime = reactRef.current?.getCurrentTime() || 0;
        time = currentTime;
        intervalIdOut = intervalId;
        const lastTenSecond = duration - time < 20;
        if (lastTenSecond) {
          setVideoTrack({
            userId,
            courseId,
            moduleNo,
            moduleTittle,
            videoNo,
            videoTittle,
            position: time.toString(),
            complete: "completed",
          });
        } else {
          setVideoTrack({
            userId,
            courseId,
            moduleNo,
            moduleTittle,
            videoNo,
            videoTittle,
            position: time.toString(),
            complete: "inProgress",
          });
        }
      }, 15000); // Interval set to 30 seconds
    }
    return () => {
      // Cleanup function to clear the interval
      clearInterval(intervalIdOut);
    };
  }, [progress, end]); // Empty dependency array to ensure the effect runs only once


  return (
    <div>
      {videoUrl !== "" && (
        <ReactPlayer
          ref={reactRef}
          url={videoUrl}
          playing={true}
          onPause={() => {
            setProgress(false);
          }}
          width={width}
          height={height}
          onDuration={(duration) => {
            setDuration(duration);
          }}
          onProgress={() => {
            setProgress(true);
          }}
          onEnded={() => {
            // setTrack(reactRef.current?.getCurrentTime() as number);
            setEnd(true);
            setProgress(false);
          }}
          controls
        />
      )}
    </div>
  );
};

export default VideoPlayer;

