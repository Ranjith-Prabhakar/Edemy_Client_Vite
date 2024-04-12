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
  const [setVideoTrack, { isSuccess, data }] = useSetVideoTrackMutation();
  const reactRef = useRef<ReactPlayer>(null);
  // const [track, setTrack] = useState(0);
  const [progress, setProgress] = useState(false);
  const [end, setEnd] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoUrl !== "") {
      // Only seek to the currentTime if the videoUrl is not empty and playing
      reactRef.current?.seekTo(parseInt(position)); // Start from 10 seconds
      setProgress(false);
      setEnd(false);
      console.log("videoUrl", videoUrl);
      console.log("progress", progress);
      console.log("end", end);
    }
  }, [videoUrl, position]); // Trigger when videoUrl or playing state changes

  // const onPause = () => {
  //   const currentTime = reactRef.current?.getCurrentTime() || 0;
  //   setTrack(currentTime);
  // };

  useEffect(() => {
    let time: number;
    let intervalIdOut: NodeJS.Timeout;
    if (progress && !end) {
      const intervalId = setInterval(() => {
        // Get the current time every 30 seconds
        const currentTime = reactRef.current?.getCurrentTime() || 0;
        // setTrack(currentTime);
        time = currentTime;
        intervalIdOut = intervalId;
        const lastTenSecond = duration - time < 20;
        if (lastTenSecond) {
          console.log("Last 10 sec !!!!!");
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
          console.log("setInterval");
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
      console.log("time from cleanup", time);
    };
  }, [progress, end]); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    if (isSuccess) {
      console.log("data from video player", data);
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   console.log("track", track);
  // }, [track]);

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

// ----------------------------------------------
// import ReactPlayer from "react-player";
// type Props = {
//   videoUrl: string;
//   width?: string;
//   height?: string;
// };
// const VideoPlayer = ({
//   videoUrl = "",
//   width = "550px",
//   height = "260px",
// }: Props) => {
//   return (
//     <div>
//       {videoUrl !== "" && (
//         <ReactPlayer
//           url={videoUrl}
//           width={width}
//           height={height}
//           controls
//         />
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;

// import { useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player";
// import { useSetVideoTrackMutation } from "../../redux/features/course/courseApi";

// type Props = {
//   position: string;
//   videoUrl: string;
//   userId: string;
//   courseId: string;
//   moduleNo: string;
//   moduleTittle: string;
//   videoNo: string;
//   videoTittle: string;
//   width?: string;
//   height?: string;
// };

// const VideoPlayer = ({
//   position,
//   videoUrl = "",
//   userId,
//   courseId,
//   moduleNo,
//   moduleTittle,
//   videoNo,
//   videoTittle,
//   width = "550px",
//   height = "260px",
// }: Props) => {
//   console.log("position", position);
//   const [setVideoTrack, { isSuccess, data }] = useSetVideoTrackMutation();
//   const reactRef = useRef<ReactPlayer>(null);
//   // const [track, setTrack] = useState(0);
//   const [progress, setProgress] = useState(false);
//   const [end, setEnd] = useState(false);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     if (videoUrl !== "") {
//       // Only seek to the currentTime if the videoUrl is not empty and playing
//       reactRef.current?.seekTo(parseInt(position)); // Start from 10 seconds
//       setProgress(false);
//       setEnd(false);
//       console.log("videoUrl", videoUrl);
//       console.log("progress", progress);
//       console.log("end", end);
//     }
//   }, [videoUrl, position]); // Trigger when videoUrl or playing state changes

//   // const onPause = () => {
//   //   const currentTime = reactRef.current?.getCurrentTime() || 0;
//   //   setTrack(currentTime);
//   // };

//   useEffect(() => {
//     let time: number;
//     let intervalIdOut: NodeJS.Timeout;
//     if (progress && !end) {
//       const intervalId = setInterval(() => {
//         // Get the current time every 30 seconds
//         const currentTime = reactRef.current?.getCurrentTime() || 0;
//         // setTrack(currentTime);
//         time = currentTime;
//         intervalIdOut = intervalId;
//         const lastTenSecond = duration - time < 20;
//         if (lastTenSecond) {
//           console.log("Last 10 sec !!!!!");
//           setVideoTrack({
//             userId,
//             courseId,
//             moduleNo,
//             moduleTittle,
//             videoNo,
//             videoTittle,
//             position: time.toString(),
//             complete: "completed",
//           });
//         } else {
//           console.log("setInterval");
//           setVideoTrack({
//             userId,
//             courseId,
//             moduleNo,
//             moduleTittle,
//             videoNo,
//             videoTittle,
//             position: time.toString(),
//             complete: "inProgress",
//           });
//         }
//       }, 15000); // Interval set to 30 seconds
//     }
//     return () => {
//       // Cleanup function to clear the interval
//       clearInterval(intervalIdOut);
//       console.log("time from cleanup", time);
//     };
//   }, [progress, end]); // Empty dependency array to ensure the effect runs only once

//   useEffect(() => {
//     if (isSuccess) {
//       console.log("data from video player", data);
//     }
//   }, [isSuccess]);

//   // useEffect(() => {
//   //   console.log("track", track);
//   // }, [track]);

//   return (
//     <div>
//       {videoUrl !== "" && (
//         <ReactPlayer
//           ref={reactRef}
//           url={videoUrl}
//           playing={true}
//           onPause={() => {
//             setProgress(false);
//           }}
//           width={width}
//           height={height}
//           onDuration={(duration) => {
//             setDuration(duration);
//           }}
//           onProgress={() => {
//             setProgress(true);
//           }}
//           onEnded={() => {
//             // setTrack(reactRef.current?.getCurrentTime() as number);
//             setEnd(true);
//             setProgress(false);
//           }}
//           controls
//         />
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;
