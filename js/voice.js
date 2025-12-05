 const micButton = document.getElementById("micButton");
const aiResponse = document.getElementById("aiResponse");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-IN";

micButton.addEventListener("click", () => {
  aiResponse.innerText = "🎧 Listening...";
  recognition.start();
});

recognition.onresult = function (event) {
  const userSpeech = event.results[0][0].transcript.toLowerCase();
  aiResponse.innerText = "You said: " + userSpeech;
  processCommand(userSpeech);
};

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  speechSynthesis.speak(utterance);
}

function processCommand(command) {
  if (command.includes("hello")) {
    speak("Hello! I am Real Asif Universe Global AI. How can I help you?");
  } else if (command.includes("time")) {
    const time = new Date().toLocaleTimeString();
    speak("The time is " + time);
  } else if (command.includes("youtube")) {
    speak("Opening YouTube!");
    window.open("https://youtube.com", "_blank");
  } else if (command.includes("weather")) {
    speak("Sorry, weather service is under maintenance for now.");
  } else if (command.includes("joke")) {
    speak("Here’s a cosmic joke! Why did the astronaut break up with the moon? Because it needed space!");
  } else if (command.includes("bye") || command.includes("exit")) {
    speak("Goodbye from Real Asif Universe Global AI. Keep shining like a star!");
  } else {
    speak("I didn’t quite get that. Can you repeat?");
  }
}
const micButton = document.getElementById("micButton");
const aiResponse = document.getElementById("aiResponse");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  aiResponse.innerText = "❌ Voice recognition not supported in this browser.";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  micButton.addEventListener("click", () => {
    aiResponse.innerText = "🎧 Listening...";
    recognition.start();
  });

  recognition.onresult = function (event) {
    const userSpeech = event.results[0][0].transcript.toLowerCase();
    aiResponse.innerText = "You said: " + userSpeech;
    processCommand(userSpeech);
  };

  recognition.onerror = function (event) {
    aiResponse.innerText = "⚠️ Error: " + event.error;
  };
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

function processCommand(command) {
  if (command.includes("hello")) {
    speak("Hello! I am Real Asif Universe Global AI. How can I help you?");
  } else if (command.includes("time")) {
    const time = new Date().toLocaleTimeString();
    speak("The time is " + time);
  } else if (command.includes("youtube")) {
    speak("Opening YouTube!");
    window.open("https://youtube.com", "_blank");
  } else if (command.includes("weather")) {
    speak("Sorry, weather service is under maintenance for now.");
  } else if (command.includes("joke")) {
    speak("Here’s a cosmic joke! Why did the astronaut break up with the moon? Because it needed space!");
  } else if (command.includes("bye") || command.includes("exit")) {
    speak("Goodbye from Real Asif Universe Global AI. Keep shining like a star!");
  } else {
    speak("I didn’t quite get that. Can you repeat?");
  }
}
