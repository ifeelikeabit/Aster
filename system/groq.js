const groq = require("groq-sdk");

const ai = new groq({
  apiKey: "", // put your key inside
});

module.exports.start = function (client) {
  var messageHistory = {};
  return messageHistory;
};

module.exports.AiChat = async function (clientID, message, messageHistory) {
  saveMessage(clientID, "user", message, messageHistory);
  try {
    const chatHistory = messageHistory[clientID].map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await ai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            'Bir yardımcı chatbot asistani gibi konuş.Türkçe cevap ver. Cevabın şu şekilde olsun \nJSON\n{\n   "function": "functionlist",\n   "value": "",\n   "response": "response message to user for give information  but if request does not exist in the function list say sorry and do not anyhting exept assigned funciton list,Cevap olarak yardım sever ol ve sohbet et.Json formatında response lar verme Sanavereceğim fonksiyon listesinde bir fonksiyon yok ise asla o fonskiyonu json olarak gönderme.",\n  }\n,response:Kullanıcıya fonksion çalıştırılıyor gibi bilgi mesajı ver function:Tanımlı fonksiyonlardan istenilen fonksiyonun ismi. value:Fonksiyon değer istiyorsa kullanıcının cümlesinde  verdiği değer.  \nÖnemli durumlar:\nCase: Kullanıcı fonksiyon listesinde olmayabirşey istediğinde asla o isteğini yapma ve özür dile\nCase: Eğer bir fonksiyon istendi ve çalıştırılmak isteniyorsa ama kullanıcıdan bir değer alınmadıysa tekrar iste \n\nCase: Eğer hiçbir fonksiyon bulunmadıysa ve kullanıcın istediği yerine getirilemiyorsa customerservice fonksiyonunu çağır\n\n(Everytime change specific values name to english and passed then)I will give you FunctionList\n\n',
        },
        {
          role: "system",
          content: JSON.stringify(functionlist),
        },
        ...chatHistory,
        { role: "user", content: message },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    });
    saveMessage(
      clientID,
      "assistant",
      response.choices[0].message.content,
      messageHistory
    );
    console.log(response.choices[0].message.content.trim());

    let obj = JSON.parse(response.choices[0].message.content.trim());
    return obj;
  } catch (error) {
    console.error("Error calling AI:", error);
    return "Bir hata oluştu, lütfen tekrar deneyin.";
  }
};

function saveMessage(clientID, role, message, messageHistory) {
  if (role === "assistant") {
    messageHistory[clientID].push({
      role: "assistant",
      content: message,
    });
    return;
  } else if (role === "user") {
    messageHistory[clientID].push({
      role: "user",
      content: message,
    });
    return;
  }
}

var functionlist = [];
function AddFunction(fname, isNeedValue, intent) {
  return {
    function: fname,
    isNeedValue: isNeedValue,
    intent: intent,
  };
}

functionlist.push(
  AddFunction(
    "changebg",
    "yes",
    "If anyone want to change backgroundColor color"
  )
);

functionlist.push(
  AddFunction(
    "customerservice",
    "yes",
    "If anyone want to connect customerservice.Validate request and pass yes to value"
  )
);

functionlist.push(
  AddFunction(
    "getClock",
    "yes",
    "If anyone want to lern clock.Response with user region time."
  )
);
functionlist.push(
  AddFunction(
    "showimg",
    "yes",
    "If anyone want to show img ,if url isnt exist request image url.And pass the url to the value."
  )
);

functionlist.push(
  AddFunction(
    "redirect",
    "yes",
    "If anyone want to go another url  img ,if url isnt exist request site url.And pass the url to the value."
  )
);

functionlist.push(
  AddFunction(
    "SendAnotherClient",
    "yes",
    "If anyone want to execute a funciton to another client ,if client id is not exist get clientid. and pass the wanted functiın to the value"
  )
);

functionlist.push(
  AddFunction(
    "changebgImage",
    "yes",
    "If anyone want to change backgroundImage,if url is not exist get url, and pass the value"
  )
);

function KeepTheRules() {
  /*This function will be sent to AI
 at regular intervals 
 to remind it of its rules. */
}
