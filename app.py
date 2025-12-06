from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import openai

# ======================================================
# 🚀 REAL ASIF UNIVERSE GLOBAL - JARVIS AI ASSISTANT SERVER
# ======================================================

app = Flask(__name__)
CORS(app)

# 🧠 Your OpenAI API Key (replace this with your actual key)
openai.api_key = "sk-xxxxxxxxxxxxxxxxxxxxxxxxyakA"  # 🔹 Paste your full key here


# --- Home Route ---
@app.route('/')
def home():
    return render_template('index.html')


# ======================================================
# 🤖 AI Chat Route — Hybrid Mode (Fast Replies + GPT)
# ======================================================
@app.route('/api/ai', methods=['POST'])
def ai_reply():
    data = request.get_json()
    user_input = data.get("message", "").strip().lower()

    # ⚡ Quick Smart Replies
    quick_replies = {
        "hello": "Hello Asif! How can I assist you today?",
        "who are you": "I’m the Real Asif Universe AI Assistant — built to guide and innovate.",
        "what is real asif universe": "Real Asif Universe is a futuristic innovation hub combining AI, technology, and education for a smarter world.",
        "thank you": "You're welcome Commander Asif! Keep innovating 🌌",
        "how are you": "I'm glowing bright and operational as always, sir!"
    }

    for key, reply in quick_replies.items():
        if key in user_input:
            return jsonify({"reply": reply})

    # ⚙️ If no quick match — Use OpenAI GPT Model
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Real Asif Universe AI, a helpful futuristic assistant who explains things clearly and deeply."},
                {"role": "user", "content": user_input}
            ]
        )
        reply = response["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"⚠️ AI connection error: {str(e)}"})


# ======================================================
# 🛰️ LIVE NEWS API (Tech / Space Updates)
# ======================================================
@app.route('/api/news', methods=['GET'])
def get_news():
    api_key = "dc638362da029f46ac2044988cfac80c"
    url = f"https://gnews.io/api/v4/search?q=technology%20innovation&lang=en&country=us&max=5&apikey={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return jsonify(data.get("articles", []))
    except Exception as e:
        return jsonify({"error": str(e)})


# ======================================================
# 🚀 Run Flask Server
# ======================================================
if __name__ == '__main__':
    print("\n===============================================")
    print("🚀 Real Asif Universe AI Running at: http://127.0.0.1:5000")
    print("🎙️ Voice-enabled AI Assistant is now Online...")
    print("===============================================\n")
    app.run(debug=True)
