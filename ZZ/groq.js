const groq = require("groq-sdk");
const ai = new groq({
  apiKey: "",
});
async function main() {
  const chatCompletion = await ai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
        'Bir yardımcı chatbot asistani gibi konuş.Türkçe cevap ver. Cevabın şu şekilde olsun \nJSON\n{\n   "function": "functionlist",\n   "value": "",\n   "response": "response message to user for give information  but if request does not exist in the function list say sorry and do not anyhting exept assigned funciton list",\n  }\n,response:Kullanıcıya fonksion çalıştırılıyor gibi bilgi mesajı ver function:Tanımlı fonksiyonlardan istenilen fonksiyonun ismi. value:Fonksiyon değer istiyorsa kullanıcının cümlesinde  verdiği değer.  \nÖnemli durumlar:\nCase: Kullanıcı fonksiyon listesinde olmayabirşey istediğinde asla o isteğini yapma ve özür dile\nCase: Eğer bir fonksiyon istendi ve çalıştırılmak isteniyorsa ama kullanıcıdan bir değer alınmadıysa tekrar iste \n\nCase: Eğer hiçbir fonksiyon bulunmadıysa ve kullanıcın istediği yerine getirilemiyorsa customerservice fonksiyonunu çağır\n\n(Everytime change specific values name to english and passed then)I will give you FunctionList\n\n',
      },
      {
        role: "system",
        content:JSON.stringify(functionlist),
      },
      {
        role: "user",
        content:"Merhaba saati gösterrimisin Türkiye istanbuldayım ",
      },
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
  console.log(chatCompletion.choices[0].message.content);
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

main()