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
export enum ENotificationMsg{
"instructorRequests"= "A Request from a user to be instructor has been registered",
"instructorRequestApproval"="Request for being instructor has been approved",
"courseApprovalRequest"="A Request from a instructor for new course approval has been recorded",
"courseApprovalApprovance"="Request for new course has been approved",
"courseApprovalApprovanceForAllUsers"="A new course has been added"
}

const useInitialNotificationLoader = () => {
  const { isSuccess, data } = useGetNotificationsQuery();
  const { setNotificationStore } = useSocketContext();

  useEffect(() => {
    if (isSuccess) {
      if (data.data) {
        
        const notifications = Object.entries(data.data);

        const trueNotifications = notifications
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value === "true")
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(([key, _]) => key);
        trueNotifications.map((notification) =>
          setNotificationStore([
            {
              message:
                notification === ENotification.instructorRequests
                  ? ENotificationMsg.instructorRequests
                  : notification === ENotification.courseApprovalRequest
                  ? ENotificationMsg.courseApprovalRequest
                  : notification === ENotification.instructorRequestApproval
                  ? ENotificationMsg.instructorRequestApproval
                  : notification === ENotification.courseApprovalApprovance
                  ? ENotificationMsg.courseApprovalApprovance
                  : "",
              url:
                notification === ENotification.instructorRequests
                  ? `/admin/dash_bord/instructors`
                  : notification === ENotification.courseApprovalRequest
                  ? `/admin/dash_bord/courses`
                  : notification === ENotification.instructorRequestApproval
                  ? `/instructor/profile`
                  : notification === ENotification.courseApprovalApprovance
                  ? `/instructor/profile/mytutorials`
                  : "",
            },
          ])
        );
      }
    }
  }, [isSuccess]);
};

export default useInitialNotificationLoader;
