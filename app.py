 from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

# 🔐 Load environment (.env file)
load_dotenv()

app = Flask(__name__)
CORS(app)

# 🧠 Load API key safely
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

@app.route("/")
def home():
    return jsonify({"message": "🚀 Real Asif Universe AI is Running!"})

@app.route("/api/ai", methods=["POST"])
def chat_ai():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"reply": "⚠️ Please ask something!"})

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Real Asif Universe AI Assistant, professional and futuristic."},
                {"role": "user", "content": user_message}
            ]
        )

        ai_reply = response.choices[0].message.content
        return jsonify({"reply": ai_reply})

    except Exception as e:
        return jsonify({"reply": f"⚠️ AI connection error: {str(e)}"})

if __name__ == "__main__":
    print("🚀 Real Asif Universe AI Running at: http://127.0.0.1:5000")
    app.run(debug=True)
from flask import Flask, render_template, request, send_from_directory, redirect, url_for
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Folder automatically create if not present
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def home():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return render_template('locker.html', files=files)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('home'))

    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return redirect(url_for('home'))

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/delete/<filename>')
def delete_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
