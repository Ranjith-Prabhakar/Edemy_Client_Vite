import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContextProvider";
import { useGetNotificationsQuery } from "../redux/features/notifications/notificationsApi";

export enum ENotification {
  "instructorRequests" = "instructorRequests",
  "instructorRequestApproval" = "instructorRequestApproval",
  "courseApprovalRequest" = "courseApprovalRequest",
  "courseApprovalApprovance" = "courseApprovalApprovance",
  "broadCasting" = "broadCasting",
}

const useInitialNotificationLoader = () => {
  const { isSuccess, data } = useGetNotificationsQuery();
  const { setNotificationStore, notificationStore } = useSocketContext();

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      if (data.data) {
        const notifications = Object.entries(data.data);

        console.log("notifications", notifications);
        const trueNotifications = notifications
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value === "true")
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(([key, _]) => key);
        console.log("trueNotifications", trueNotifications);
        trueNotifications.map((notification) =>
          setNotificationStore([
            {
              message:
                notification === ENotification.instructorRequests
                  ? "A Request from a user to be instructor has been registered"
                  : notification === ENotification.courseApprovalRequest
                  ? "A Request from a instructor for new course approval has been recorded"
                  : notification === ENotification.instructorRequestApproval
                  ? "Request for being instructor has been approved"
                  : notification === ENotification.courseApprovalApprovance
                  ? "Request for new course has been approved"
                  : "",
              url:
                notification === ENotification.instructorRequests
                  ? `/admin/dash_bord/instructors`
                  : notification === ENotification.courseApprovalRequest
                  ? `/admin/dash_bord/courses`
                  : notification === ENotification.instructorRequestApproval
                  ? `/admin/dash_bord/courses`
                  : notification === ENotification.courseApprovalApprovance
                  ? `/admin/dash_bord/courses`
                  : "",
            },
            ...notificationStore,
          ])
        );
      }
    }
  }, [isSuccess]);
};

export default useInitialNotificationLoader;
