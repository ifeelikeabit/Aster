
const ai = require("../system/groq.js");

var messageHistory=ai.start()
messageHistory["1"] = []

ai.AI("1","merhaba arkaplan rengini mavi yap",messageHistory)
