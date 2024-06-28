import { useEffect, useState, useContext } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";

const useFetchLatestMessage = (chat) => {
  const { newMeesage, notifications } = useContext(ChatContext);
  const [lastestMessage, setLastestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
      if (response.error) {
        return console.log("Error getting meesage ", error);
      }
      const lastestMessage = response[response?.length - 1];
      setLastestMessage(lastestMessage);
    };
    getMessages();
  }, [newMeesage, notifications]);

  return { lastestMessage };
};

export default useFetchLatestMessage;
