const qrcode = require("qrcode-terminal");
const axios = require("axios");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  //   console.log(message.body);
  const content = message.body;
  if (content.toLowerCase() === "pls meme") {
    const meme = await axios
      .get("https://meme-api.herokuapp.com/gimme")
      .then((res) => res.data);

    client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url));
  }
  if (content.toLowerCase() === "ping") {
    message.reply("pong");
  }
});

client.initialize();
