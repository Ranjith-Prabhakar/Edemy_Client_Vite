import { useState } from "react";
import { useSocketContext } from "../../../context/SocketContextProvider";
import { useEditNotificationMutation } from "../../../redux/features/notifications/notificationsApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function useNotification() {
  const [notificationSideBar, setNotificationSideBar] = useState(false);
  const { notificationStore } = useSocketContext();
  const [editNotification] = useEditNotificationMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return {
    notificationSideBar,
    setNotificationSideBar,
    notificationStore,
    editNotification,
    navigate,
    dispatch,
  };
}
