import { IoIosArrowRoundForward, IoIosNotifications } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useNotification } from "./hook";
import {
  ENotification,
  ENotificationMsg,
} from "../../../hooks/useInitialNotificationLoader";
import { userRoleChange } from "../../../redux/features/auth/authSlice";

const Notification = () => {
  const {
    notificationSideBar,
    setNotificationSideBar,
    notificationStore,
    editNotification,
    navigate,
    dispatch,
  } = useNotification();
  return (
    <div className="relative">
      <IoIosNotifications
        size={25}
        className="cursor-pointer"
        onClick={() => {
          setNotificationSideBar(true);
        }}
      />
      {notificationStore.length > 1 && (
        <div className="w-[10px] h-[10px] rounded-full bg-red-500 absolute top-0 right-0" />
      )}
      {notificationSideBar && (
        <div className="absolute -right-4 top-10  h-[500px] min-w-[500px] shadow-2xl ">
          <div className="relative p-5 pt-10 w-full h-full border rounded-lg bg-c_color-colorSeven">
            <IoCloseCircleOutline
              size={25}
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setNotificationSideBar(false);
              }}
            />
            {notificationStore.length &&
              notificationStore.map((notification, index) => {
                if (notification.message !== "") {
                  return (
                    <h1
                      key={index}
                      onClick={async () => {
                        let result;
                        switch (notification.message) {
                          case ENotificationMsg.instructorRequests:
                            result = await editNotification({
                              notificationHead:
                                ENotification.instructorRequests,
                            });
                            if ("data" in result) {
                              if ("success" in result.data) {
                                navigate(`${notification.url}`, {
                                  state: { index: index },
                                });
                              }
                            }
                            break;
                          case ENotificationMsg.courseApprovalApprovance:
                            result = await editNotification({
                              notificationHead:
                                ENotification.courseApprovalApprovance,
                            });

                            if ("data" in result) {
                              if ("success" in result.data) {
                                navigate(`${notification.url}`);
                              }
                            }
                            break;
                          case ENotificationMsg.courseApprovalRejection:
                            result = await editNotification({
                              notificationHead:
                                ENotification.courseApprovalRejection,
                            });

                            if ("data" in result) {
                              if ("success" in result.data) {
                                navigate(`${notification.url}`);
                              }
                            }
                            break;

                          case ENotificationMsg.courseApprovalRequest:
                            result = await editNotification({
                              notificationHead:
                                ENotification.courseApprovalRequest,
                            });

                            if ("data" in result) {
                              if ("success" in result.data) {
                                navigate(`${notification.url}`);
                              }
                            }
                            break;
                          case ENotificationMsg.instructorRequestApproval:
                            result = await editNotification({
                              notificationHead:
                                ENotification.instructorRequestApproval,
                            });

                            dispatch(userRoleChange());

                            if ("data" in result) {
                              if ("success" in result.data) {
                                navigate(`${notification.url}`);
                              }
                            }
                            break;
                          case ENotificationMsg.instructorRequestRejection:
                            result = await editNotification({
                              notificationHead:
                                ENotification.instructorRequestRejection,
                            });
                            if ("data" in result) {
                              if ("success" in result.data) {
                                setNotificationSideBar(!notificationSideBar);
                              }
                            }
                            break;
                          case ENotificationMsg.courseApprovalApprovanceForAllUsers:
                            navigate(`${notification.url}`, {
                              state: {
                                sort: "A-Z",
                                filter: "date",
                              },
                            });
                            break;
                        }
                      }}
                      className="cursor-pointer bg-gradient-to-r from-body-gradient-one to-body-gradient-two text-white p-3 rounded-lg text-sm border"
                    >
                      {notification.message}{" "}
                      <IoIosArrowRoundForward className="inline" />
                    </h1>
                  );
                } else if (
                  notification.message === "" &&
                  notificationStore.length === 1
                ) {
                  return <h1>No notifications . . . . </h1>;
                }
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
