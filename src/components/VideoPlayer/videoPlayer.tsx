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
  const [setVideoTrack] = useSetVideoTrackMutation();
  const reactRef = useRef<ReactPlayer>(null);
  const [progress, setProgress] = useState(false);
  const [end, setEnd] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoUrl !== "") {
      reactRef.current?.seekTo(parseInt(position));
      setProgress(false); // for working of next useEffect immediatly it is relevent
      setEnd(false); // for working of next useEffect immediatly it is relevent
    }
  }, [videoUrl, position]);

  useEffect(() => {
    if (end) {
      setVideoTrack({
        // updating the time immediatly because this useEffect will call even after resume also
        userId,
        courseId,
        moduleNo,
        moduleTittle,
        videoNo,
        videoTittle,
        position: duration.toString(),
        complete: "inProgress",
      });
    } else {
      setVideoTrack({
        // updating the time immediatly because this useEffect will call even after resume also
        userId,
        courseId,
        moduleNo,
        moduleTittle,
        videoNo,
        videoTittle,
        position: position.toString(),
        complete: "inProgress",
      });
    }

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
          clearInterval(intervalIdOut);
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
      }, 15000); // Interval set to 15 seconds
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
          onPlay={
            // it will triger onStart as well as onResume
            () => {
              position = reactRef.current?.getCurrentTime()?.toString() || "0";
            }
          }
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
