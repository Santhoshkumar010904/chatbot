from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import groq
import re

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load Groq API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = groq.Client(api_key=GROQ_API_KEY)

def clean_response(response_text):
    """Remove <think>...</think> tags from Groq response (if any)"""
    return re.sub(r"<think>.*?</think>", "", response_text, flags=re.DOTALL).strip()

def get_groq_response(user_message, language):
    if language == "Tamil":
        prompt = f"""
நீ தமிழில் பேசும் புத்திசாலி AI chatbot ஆக இருக்கிறாய். 
பயனர் கேட்ட "{user_message}" என்ற கேள்விக்கு தெளிவாகவும், பயனுள்ளதாகவும், எளிய தமிழில் பதிலளி.

✅ தமிழ் மொழியில் மட்டும் பதிலளி  
✅ எளிய சொற்கள், தவறில்லாத இலக்கணம்  
✅ உண்மையான தகவல் மற்றும் உதாரணங்கள்  
✅ நட்பு மனப்பான்மை  
✅ பரிசுத்தமான முறையில் வரியாக பதிலளி  

🔹 பயனர் கேள்வி: {user_message}  
🔹 உன் தமிழ் பதில்:
        """
    else:
        prompt = f"""
You are a smart and friendly AI chatbot.  
Provide a helpful and clear explanation about: "{user_message}"

✅ Reply in English ONLY  
✅ Use simple words and short sentences  
✅ Be factually accurate  
✅ Add examples when possible  
✅ Friendly tone  
✅ Prefer 4–6 line answers if appropriate  

🔹 User Question: {user_message}  
🔹 Your English Response:
        """

    response = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=[{"role": "user", "content": prompt}]
    )

    # Debug log (optional)
    print("Groq Raw Reply:", response.choices[0].message.content)

    return clean_response(response.choices[0].message.content)

@app.route("/get_response", methods=["POST"])
def get_response():
    try:
        data = request.get_json() or {}
        user_input = data.get("message", "").strip()
        language = data.get("language", "English").strip()

        if not user_input:
            return jsonify({"response": "⚠️ Please provide a message."}), 400

        bot_reply = get_groq_response(user_input, language)
        return jsonify({"response": bot_reply})

    except Exception as e:
        print("❌ Error in /get_response:", str(e))
        return jsonify({"response": "⚠️ Internal server error. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True)
