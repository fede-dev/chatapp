import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadNotificationsFunc } from "../../utils/unReadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationsAsRead,
  } = useContext(ChatContext);
  const unReadNotifications = unReadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id == n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  //console.log("unread ", unReadNotifications);
  //console.log("modified ", modifiedNotifications);

  return (
    <div className="notifications">
      <div
        className="notifications-icon"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chat-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
        </svg>
        {unReadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unReadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div
              className="mark-as-red"
              onClick={() => {
                markAllNotificationsAsRead(notifications);
              }}
            >
              Mark all as red
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className="notification">No notifications</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                  onClick={() => {
                    markNotificationsAsRead(n, userChats, user, notifications);
                    setIsOpen(false);
                  }}
                >
                  <span>{`${n.senderName} send you a new message`}</span>
                  <span className="notificaton-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
