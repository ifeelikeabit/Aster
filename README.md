# Aster
For now, Aster aims to use LLM to understand the message from the user and execute the functions requested by the user in real-time on the website via WebSocket.

[English](#english) | [Turkish](#turkish)

## English

**Project Description:**

With the help of an LLM, the request from the user is processed in a JSON format. For example a response is expected from the LLM in this format. Might look like this:

```js
 {
 function: 'changebg',
 value: 'red',
 response: 'Background color changed to red.'
 }

```

TThe received response is converted into an object and sent to the client using WebSocket in real-time. The **execute** function on the client side processes the object and performs the requested action on the page. The functions used in the project are listed below.

---

## Important Functions

```js
groq.start(client); //Returns a variable for storing the chat history.

groq.AiChat(clientID, message, messageHistory); // Returns a JSON object in the required format.

saveMessage(clientID, role, message, messageHistory); // Saves chat history to allow the LLM model to continue the conversation.

AddFunction(fname, isNeedValue, intent); // Creates an object to be provided to the LLM model at the beginning.
```

---

### Requirements

To run the project, you'll need the following software and tools:

- **LLM model** I use Groq free api in this project
- **Node.js** (v14 or higher)
- **NPM**
- **Web Browser** (Chrome, Firefox, etc.)

### Step-by-Step Installation

0. **NOTE**
   Currently the system rules are set to respond in Turkish. But you can change the system rules to speak a specific language or say it during a chat with ai.
   **Set all files as you wish**

1. **Groq**
   Create an account https://console.groq.com/login. Generate API key and place it inside qroq.js apiKey variable

2. **Clone the repository:**

   ```bash
   git clone https://github.com/ifeelikeabit/aster.git
   ```

3. **Go to the project folder:**

   ```bash
   cd aster
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Start the app:**

   ```bash
   npm run start
   ```

   This command will start the local development server and the app will open in your browser. The WebSocket is set to port 8080, and the server runs on port 8000 by default.

---

## Usage

Open the link at http://localhost:8000/

1. **Open the console:** Use the console to send messages and view the responses.
2. **sendMessage(value,action):** Send a message to the AI with action="aichat"
3. **You can ask the AI for a list of available functions:**

```javascript
sendMessage("can you say availible function list ?", "aichat");
```

---

## Structures and Technologies

The following technologies were used in this project:

- **Backend:** Node.js, Express.js , groq-sdk

---

## Not

This project is currently a learning project. The file structure and the provided setup might not be great, so please bear with me. Feel free to reach out via email if you have any feedback.

---

## Lisans

This project is licensed under the **GNU Licence** For more information, check the [LICENSE](LICENSE) file.

---

## İletişim

If you have any questions about the project, feel free to reach out to me through the following:

- **Email:** aktasesat80@gmail.com
- **GitHub:** [https://github.com/ifeelikeabit](https://github.com/ifeelikeabit)

## Turkish

**Proje Açıklaması:**

Bir LLM yardımıyla kullanıcıdan gelen istek bir JSON yapısında,  örneğin şu şekilde beklenmekte:

```js
 {
 function: 'changebg',
 value: 'red',
 response: 'Background color changed to red.'
 }

```

Gelen yanıt bir objeye dönüştürülüp kullanıcın bulunduğu cliente websocket yardımıyla eşzamanlı olarak gönderilir. Clientte bulunan **execute** fonksiyonu ile gönderilen obje , sayfada istenilen işlemi gerçekleştirir. Projede kullanılan fonksiyonlar aşağıda bulunuyor.

---

## Önemli Fonksiyonlar

```js
groq.start(client); //sohbetin kaydını tutmak için bir değişken return eder.

groq.AiChat(clientID, message, messageHistory); //Return değeri olarak istenilen json yapısında bir obje döndür.

saveMessage(clientID, role, message, messageHistory); //LLM modelinin sohbetin geçmişine erişmesi ve devam ettirmesi için sohbet kaydını tutar.

AddFunction(fname, isNeedValue, intent); //LLM modeline başlangıçta verilmek üzere bir obje oluşturur.
```

---

### Gereksinimler

Projenin çalışabilmesi için aşağıdaki yazılım ve araçlara ihtiyacınız olacak:

- **Node.js** (v14 ve üzeri)
- **NPM**
- **Bir web tarayıcısı** (Chrome, Firefox, vb.)

### Adım Adım Kurulum

0. **NOTE**
   Şu anda sistem kuralları Türkçe yanıt verecek şekilde ayarlandı. Fakat belirli bir dili konuşmak için sistem kurallarını değiştirebilir veya ai ile sohber sırasında söyleyebilirsiniz.
   **Tüm dosyaları dilediğiniz gibi ayarlayın**

1. **Groq**
   Bir hesap oluşturun https://console.groq.com/login. API anahtarı oluşturun ve qroq.js apiKey değişkeninin içine yerleştirin
2. **Depoyu klonlayın:**

   ```bash
   git clone https://github.com/ifeelikeabit/aster.git
   ```

3. **Proje klasörüne gidin:**

   ```bash
   cd aster
   ```

4. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

5. **Uygulamayı başlatın:**

   ```bash
   npm run start
   ```

   Bu komut, uygulamanın yerel geliştirme sunucusunu başlatır ve uygulama tarayıcınızda açılacaktır. Websocker için 8080 portu , sunucu için 8000 portu default olarak tanımlıdır.

---

## Kullanım

Linki açın http://localhost:8000/

1. **Consolu açın:** Mesaj göndermek ve geri bildirimleri takip etmek için konsolu kullanın.
2. **sendMessage(value,action):** Ai'a mesaj göndermek için action="aichat"
3. **Fonksiyon listesini ai dan isteyebilirsiniz:**

```javascript
sendMessage("can you say availible function list ?", "aichat");
```

---

## Yapılar ve Teknolojiler

Bu projede aşağıdaki teknolojiler kullanılmıştır:

- **Backend:** Node.js, Express.js , groq-sdk

---

## Not

Bu proje şimdilik bir öğrenme projesidir. Dosya hiyerarşisi ve sunulan yapılar kötü olabilir bundan dolayı kusura bakmayın.Geri bildirimde bulunmak isterseniz email yoluyla ulaşabilirsiniz.

---

## Lisans

Bu proje **GNU Lisansı** ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

---

## İletişim

Proje hakkında herhangi bir sorunuz varsa, aşağıdaki iletişim yolları ile bana ulaşabilirsiniz:

- **Email:** aktasesat80@gmail.com
- **GitHub:** [https://github.com/ifeelikeabit](https://github.com/ifeelikeabit)
