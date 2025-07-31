export default defineWebSocketHandler({
  open(peer) {
    console.log("WebSocket connection opened:", peer.id);
    peer.subscribe("debate");
  },

  message(peer, message) {
    const msg = JSON.parse(message);

    if (msg.type === "join") {
      console.log(`Peer ${peer.id} joined debate ${msg.debateId}`);
      peer.subscribe(`debate:${msg.debateId}`);
    }

    if (msg.type === "message") {
      console.log(`Message from ${peer.id} in debate ${msg.debateId}:`, msg.content);

      //   send message to only the debate room of debateId's all peers
      peer.publish(
        `debate:${msg.debateId}`,
        JSON.stringify({
          type: "reply",
          content: msg.content,
          author: msg.author,
          createdAt: new Date().toISOString()
        })
      );
    }
  },

  close(peer) {
    console.log("WebSocket connection closed:", peer.id);
    peer.unsubscribe("debate");
  },

  error(peer, error) {
    console.error("WebSocket error from", peer.id, ":", error);
  }
});
