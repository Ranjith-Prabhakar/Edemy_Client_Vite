import { useLocation } from "react-router-dom";

const CoursePreview = () => {
  const location = useLocation();
  const courseData = location.state.courseData;

  console.log("courseData", courseData);

  return (
    <>
      {courseData ? (
        <div className="flex gap-2 justify-between items-center">
          <ul>
            <li>{courseData.category}</li>
            <li>{courseData.courseName}</li>
            <li>{courseData.discription}</li>
            <li>{courseData.duration}</li>
            <li>{courseData.instructor}</li>
          </ul>
          <div></div>
          <div>
            {courseData.modules.map((item) => (
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <h1>{item.moduleNo}</h1>
                  <h1>{`${item.moduleTittle}(${item.videos.length})`}</h1>
                  <h1>dropdown</h1>
                </div>
                {item.videos.map((videos) => (
                  <div className="flex gap-2">
                    <h1>{videos.videoNo}</h1>
                    <h1>{videos.videoTittle}</h1>
                    <h1>play</h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>hello</div>
      )}
    </>
  );
};

export default CoursePreview;
