const SoftSPI = require("rpi-softspi");
const MFRC522 = require("./index.js")

// Konfigurasi SPI
const softSPI = new SoftSPI({
  clock: 23, // Pin GPIO untuk clock
  mosi: 19, // Pin GPIO untuk MOSI
  miso: 21, // Pin GPIO untuk MISO
  client: 24, // Pin GPIO untuk CS
});

// Inisialisasi RFID reader
const mfrc522 = new MFRC522(softSPI);

console.log("Silakan tempatkan kartu RFID di pembaca...");

(async () => {
  while (true) {
    mfrc522.reset();
    
    const response = mfrc522.findCard();
    if (!response.status) {
      console.log("error find card", response.status);
    } else {
      console.log("Kartu terdeteksi!");
      const uid = mfrc522.getUid();
      if (!uid.status) {
        console.log("error uid", uid.status);
      } else {
        console.log("UID:", Buffer.from(uid.data).toString("hex").toUpperCase().substring(0,8));
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000)); // Tunggu 2 detik sebelum baca ulang
  }
})();
