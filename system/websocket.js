const WebSocket = require("ws");
const ai = require("./groq");

module.exports.start = function () {
  const wss = new WebSocket.Server({ port: 8080 });

  function UID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  var lookup = {};
  var messageHistory = ai.start();

  wss.on("connection", (client) => {
    client.clientID ||= UID();
    lookup[client.clientID] ||= client;
    messageHistory[client.clientID] ||= [];
    console.log(`Client connected , assigned id:${client.clientID}`);


    client.on("message", async (message) => {
      const data = JSON.parse(message);
      switch (data.action) {
        case "aichat":
          const AiResponse = await ai.AiChat(
            client.clientID,
            data.message,
            messageHistory
          );
          console.log(`Ai cevap verdi:\n Client:${client.clientID}`);
          console.log(AiResponse);
          lookup[client.clientID].send(
            JSON.stringify({
              action: "AiResponse",
              response: JSON.stringify(AiResponse),
            })
          );
          break;
        case "giveID":
          lookup[client.clientID].send(
            JSON.stringify({ action: "takeID", id: client.clientID })
          );
          break;
        case "message":
          console.log(`action:${data.action} msg:${data.value}`);
          lookup[client.clientID].send(
            JSON.stringify({ action: "message", response: "Merhaba!!" })
          );
          break;
        case "changebg":
          lookup[client.clientID].send(
            JSON.stringify({
              action: "execute",
              function: "changebg",
              value: data.value,
            })
          );
          break;
        default:
          console.log("Unknown action:", data.action);
          break;
      }
    });
  });
};
