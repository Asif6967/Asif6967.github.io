from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests

# --- Flask App Setup ---
app = Flask(__name__)
CORS(app)

# --- Home Route ---
@app.route('/')
def home():
    return render_template('index.html')


# 🤖 AI Reply Route
@app.route('/api/ai', methods=['POST'])
def ai_reply():
    data = request.get_json()
    user_input = data.get("message", "")

    # Simple AI Logic (Testing)
    if "hello" in user_input.lower():
        return jsonify({"reply": "Hello! How can I help you today?"})
    elif "who are you" in user_input.lower():
        return jsonify({"reply": "I’m your AI Assistant from Real Asif Universe 🌌"})
    else:
        return jsonify({"reply": f"You said: {user_input}"})


# 🛰️ News API Route — Fetch space/tech news from GNews
@app.route('/api/news', methods=['GET'])
def get_news():
    api_key = "dc638362da029f46ac2044988cfac80c"  # ✅ Your GNews API key
    url = f"https://gnews.io/api/v4/search?q=space%20technology&lang=en&country=us&max=5&apikey={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status()  # check for request errors
        data = response.json()
        articles = data.get("articles", [])
        return jsonify(articles)
    except Exception as e:
        return jsonify({"error": str(e)})


# 🚀 Run Flask app
if __name__ == '__main__':
    print("🚀 Real Asif Universe AI Server Running on http://127.0.0.1:5000")
    app.run(debug=True)
 