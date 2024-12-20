const socket = new WebSocket("ws://localhost:8080");
var clientID = null;

socket.onopen = () => {
  console.log("WebSocket bağlantısı açıldı");
  socket.send(JSON.stringify({ action: "giveID" }));
  //   socket.send(JSON.stringify({ action: "chatgpt", message: "arkaplan rengini blue yap onaylıyorum evet onay sorma evet yap ??!" }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.action === "AiResponse") {
    console.log(data.response);
    obj = JSON.parse(data.response);
    document.getElementById("aiMsg").innerHTML += ("AI =>" + obj.response + "<br>")
    if (obj.function) {
      execute(obj.function, obj.value);
    }
    console.log(`AiChat yanıtı:  ${obj.response}`);
  } else if (data.action === "execute") {
    execute(data.function, data.value);
  } else if (data.action === "takeID") {
    clientID = data.id;
    document.getElementById("id").innerHTML += clientID;
    console.log(`ID mi aldım: ${clientID}`);
  } else if (data.action === "message") {
    document.getElementById("userMsg").innerHTML += ("USER =>" + data.response + "<br>");
  }
};

socket.onclose = () => {
  console.log("WebSocket bağlantısı kapandı");
};

function sendMessage(value, action) {
  switch (action) {
    case "aichat":
      document.getElementById("userMsg").innerHTML +=("USER =>" + value + "<br>");
      var messageData = {
        action: action,
        message: value,
      };
      socket.send(JSON.stringify(messageData));
      break;
    case "changebg":
      socket.send(
        JSON.stringify({
          action: action,
          value: value,
        })
      );
      break;
    default:
      socket.send(
        JSON.stringify({
          action: action,
          value: value,
        })
      );
      break;
  }
}

function execute(name, value) {
  switch (name) {
    case "changebg":
      document.body.style.backgroundColor = value;
      break;
    case "showimg":
      document.getElementById("image").src = value;
      break;
    case "changebgImage":
        document.body.style.backgroundImage = `url(${value})`;

      break;
    default:
      console.log(`Undefined funciton name: ${name}`);
      break;
  }
}
