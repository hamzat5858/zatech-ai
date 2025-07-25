const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loginMsg = document.getElementById('login-msg');
const loginContainer = document.getElementById('login-container');

const chatContainer = document.getElementById('chat-container');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

const correctPassword = '1158';
let loginAttempts = 0;

loginBtn.addEventListener('click', () => {
  const entered = passwordInput.value.trim();
  if (entered === correctPassword) {
    loginContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    addMessage('ai', 'Hoşgeldin! ZATECH AI ile projelerini konuşabiliriz 😊');
  } else {
    loginAttempts++;
    loginMsg.textContent = 'Yanlış şifre! Tekrar deneyin.';
    if (loginAttempts >= 3) {
      alert('3 kez yanlış şifre girdin. Hamzatanriverdi42@gmail.com adresine uyarı gönderiliyor!');
      // Mail gönderme işlevi buraya eklenebilir
    }
  }
  passwordInput.value = '';
});

sendBtn.addEventListener('click', sendUserMessage);
chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendUserMessage();
});

function addMessage(who, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', who);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendUserMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage('user', text);
  chatInput.value = '';

  setTimeout(() => {
    let response = "Hmm, güzel soru! Bunu birlikte çözelim.";
    if (text.toLowerCase().includes('nasıl')) response = "Sakın pes etme, azimle her şey mümkün!";
    else if (text.toLowerCase().includes('yardım')) response = "Tabii ki buradayım, sorabilirsin!";
    else if (text.toLowerCase().includes('tamam')) response = "Harika, devam edelim o zaman!";
    addMessage('ai', response);
  }, 800);
}
