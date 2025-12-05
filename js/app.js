 document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const revealSections = () => {
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight * 0.8) {
        section.classList.add("visible");
      }
    });
  };

  revealSections();
  window.addEventListener("scroll", revealSections);
});
// 🌠 Animated Galaxy Background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 200;

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.3 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
      alpha: Math.random()
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 170, 255, 0.8)";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.globalAlpha = star.alpha;
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}

initStars();
animate();

window.addEventListener("resize", initStars);

// ✨ Scroll animation for sections
const sections = document.querySelectorAll("section");
function revealSections() {
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.8) section.classList.add("visible");
  });
}
window.addEventListener("scroll", revealSections);
revealSections();
// 🧠 Typewriter Text Effect
const typewriterText = "Welcome to Real Asif Universe Global";
const typewriterElement = document.getElementById("typewriter");
let i = 0;

function typeEffect() {
  if (i < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeEffect, 80);
  } else {
    typewriterElement.style.textShadow = "0 0 25px #00ffff, 0 0 50px #00aaff";
  }
}
window.addEventListener("load", typeEffect);
// 🔊 Voice Greeting
window.addEventListener("load", () => {
  const message = new SpeechSynthesisUtterance("Welcome to Real Asif Universe Global");
  message.pitch = 1.2;
  message.rate = 1;
  message.volume = 1;
  setTimeout(() => speechSynthesis.speak(message), 1500);
});
// ⚡ Cursor Trail Effect
const trailCanvas = document.getElementById("cursorTrail");
const tCtx = trailCanvas.getContext("2d");
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random() * 60 + 180}, 100%, 60%)`; // नीला-सा glow
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.94; // धीरे-धीरे fade-out
  }
  draw() {
    tCtx.beginPath();
    tCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    tCtx.fillStyle = this.color;
    tCtx.shadowColor = this.color;
    tCtx.shadowBlur = 20;
    tCtx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].size <= 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animateTrail() {
  tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  handleParticles();
  requestAnimationFrame(animateTrail);
}
animateTrail();

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.x, e.y));
  }
});

window.addEventListener("resize", () => {
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
});
// ===========================================================
// 🎧 LIGHT BEAM + SOUND INTRO
// ===========================================================
window.addEventListener("load", () => {
  const beam = document.getElementById("light-beam");
  const sound = document.getElementById("introSound");

  // Wait a moment, then play intro sound
  setTimeout(() => {
    sound.volume = 0.5;
    sound.play().catch(err => console.log("Sound blocked:", err));
  }, 500);
});
// ===========================================================
// 🎙️ AI VOICE ACTIVATION SYSTEM
// ===========================================================
const micBtn = document.getElementById("micBtn");
const synth = window.speechSynthesis;
let recognition;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  micBtn.addEventListener("click", () => {
    recognition.start();
    micBtn.textContent = "🎧 Listening...";
    micBtn.style.background = "radial-gradient(circle at 30% 30%, #ff00ff, #6600ff)";
  });

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    micBtn.textContent = "🎤 Speak to Universe";
    micBtn.style.background = "radial-gradient(circle at 30% 30%, #00ffff, #0066ff)";

    if (command.includes("hello")) {
      speak("Welcome back, Commander Asif!");
    } else if (command.includes("how are you")) {
      speak("I am glowing bright and ready for the universe, sir.");
    } else if (command.includes("open services")) {
      speak("Opening the services section for you.");
      window.scrollTo({ top: 1000, behavior: "smooth" });
    } else {
      speak("Sorry, I didn’t understand. Try again, Asif.");
    }
  };

  recognition.onerror = () => {
    micBtn.textContent = "🎤 Speak to Universe";
    speak("Sorry, I could not hear you clearly.");
  };
} else {
  alert("Voice recognition not supported on this browser.");
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1.2;
  utter.volume = 1;
  utter.voice = synth.getVoices()[0];
  synth.speak(utter);
}
// ===========================================================
// 🧠 UNIVERSAL SPEAK FUNCTION (Edge + Chrome Compatible)
// ===========================================================
function speak(text) {
  const synth = window.speechSynthesis;
  let voices = synth.getVoices();

  // Wait for voices to load if Chrome hasn’t yet initialized
  if (!voices.length) {
    window.speechSynthesis.onvoiceschanged = () => {
      voices = synth.getVoices();
      speak(text); // recall function after voices are loaded
    };
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1.1;
  utter.volume = 1;

  // Select best English voice
  const selectedVoice =
    voices.find(v => v.lang.includes("en") && v.name.toLowerCase().includes("female")) ||
    voices.find(v => v.lang.includes("en")) ||
    voices[0];
  utter.voice = selectedVoice;

  // Play the voice
  synth.cancel(); // stop any queued voices
  synth.speak(utter);
}
// ✅ Voice Activation System
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert("Speech not supported in this browser!");
    return;
  }

  // Stop any previous speech
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1.1;
  speech.volume = 1;

  // Speak after short delay to avoid bug
  setTimeout(() => {
    window.speechSynthesis.speak(speech);
  }, 500);
}

// ✅ Button control
document.querySelector('.speak-btn').addEventListener('click', () => {
  speakText("Voice system is online, Commander Asif. Awaiting your command.");
});
// ✨ Fade-in animation on scroll
const fadeSections = document.querySelectorAll(".fade-section");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  fadeSections.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      section.classList.add("visible");
    } else {
      section.classList.remove("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Run once at start
// 🌟 Floating Chat Toggle
const chatBubble = document.getElementById("chatBubble");
const chatPopup = document.getElementById("chatPopup");
const closeChat = document.getElementById("closeChat");

chatBubble.addEventListener("click", () => {
  chatPopup.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
  chatPopup.classList.add("hidden");
});
// 🌟 Floating Chat Toggle - Final Working Version
document.addEventListener("DOMContentLoaded", () => {
  const chatBubble = document.getElementById("chatBubble");
  const chatPopup = document.getElementById("chatPopup");
  const closeChat = document.getElementById("closeChat");

  // 💬 Open Chat Popup
  chatBubble.addEventListener("click", () => {
    chatPopup.classList.remove("hidden");
    chatBubble.style.display = "none";
  });

  // ❌ Close Chat Popup
  closeChat.addEventListener("click", () => {
    chatPopup.classList.add("hidden");
    chatBubble.style.display = "flex";
  });
});
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// 🧠 Function to send message
sendBtn.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  try {
    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    addMessage("ai", data.reply);
  } catch (err) {
    addMessage("ai", "⚠️ Server not responding.");
  }
});

// 🗨️ Add message to chat box
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "ai-msg";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
// 🌍 Universe & Tech Live News System

const apiKey = "dc638362da029f46ac2044988cfac80c"; // ✅ teri key
const newsContainer = document.getElementById("newsContainer");

async function fetchNews() {
  try {
    const res = await fetch(`https://gnews.io/api/v4/search?q=space&lang=en&country=us&max=6&apikey=${apiKey}`);
    const data = await res.json();
    newsContainer.innerHTML = "";

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More →</a>
      `;
      newsContainer.appendChild(card);
    });
  } catch (error) {
    newsContainer.innerHTML = "<p>⚠️ Failed to load news. Please try again later.</p>";
  }
}

// Pehli baar run hone par news load karega
fetchNews();

// Har 30 minute me news refresh
setInterval(fetchNews, 30 * 60 * 1000);

