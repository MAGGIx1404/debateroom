import { useRepliesStore } from "#imports";
import { useWebSocket } from "@vueuse/core";

export default function useSocket() {
  const store = useRepliesStore();

  let wsURL = "";

  if (import.meta.client) {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    wsURL = `${protocol}://${window.location.host}/_ws/debate`;
  }

  const { data, send, status, open, close, error } = useWebSocket(wsURL, {
    onMessage: (_, event) => {
      try {
        const payload = JSON.parse(event.data);

        console.log("WebSocket message received:", payload);

        if (payload?.type === "reply") {
          store.addReply(payload);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    }
  });

  const sendMessage = (message) => {
    send(message);
  };

  return {
    data,
    sendMessage,
    status,
    open,
    close,
    error
  };
}
