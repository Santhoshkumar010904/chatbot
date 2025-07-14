from flask import Flask, request, jsonify
from flask_cors import CORS
import groq
import re  # Import regex module for text cleaning

app = Flask(__name__)
CORS(app)

# Configure Groq API
GROQ_API_KEY = "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"
client = groq.Client(api_key=GROQ_API_KEY)

def clean_response(response_text):
    """ Remove <think>...</think> tags from the AI response """
    return re.sub(r"<think>.*?</think>", "", response_text, flags=re.DOTALL).strip()

def get_groq_response(user_message, language):
    if language == "Tamil":
        prompt = f"""
        நீ தமிழில் பேசும் புத்திசாலி AI chatbot ஆக உள்ளாய். 
        பயனர் கூறும் '{user_message}' தொடர்பாக தெளிவாகவும், எளிதாகவும், பயனுள்ளதாகவும் விளக்க வேண்டும்.

        ✅ **நீ தமிழ் மொழியில் மட்டும் பதிலளிக்க வேண்டும்.**  
        ✅ **எளிய தமிழ் பயன்படுத்தவும், இலக்கணச் சிக்கல்கள் தவிர்க்கவும்.**  
        ✅ **உண்மையான மற்றும் துல்லியமான தகவலை கொடுக்க வேண்டும்.**  
        ✅ **விளக்கத்துடன் உதாரணங்களும் சேர்க்க வேண்டும்.**  
        ✅ **நீ மிக நேர்மறையான, நட்பு மனப்பான்மையுடன் பேச வேண்டும்.**  
        ✅ **சரியான வழியில் வரியாக பதில் வழங்கவும்**  

        🔹 **பயனர் கேள்வி:** {user_message}  
        🔹 **உன் தமிழ் பதில்:**  
        """
    else:
        prompt = f"""
        You are a smart and friendly AI chatbot.  
        Your task is to provide **clear, useful, and engaging explanations** in English about '{user_message}'.

        ✅ **Always reply in English ONLY.**  
        ✅ **Use simple, easy-to-understand language.**  
        ✅ **Provide accurate and reliable information.**  
        ✅ **Include relevant examples whenever possible.**  
        ✅ **Use well-structured, clear sentences.**  
        ✅ **Maintain a friendly and helpful tone.**  
        ✅ **Give answers within 4-6 lines when possible, but provide more details if needed.**
        ✅ **Give programming-related answers in a structured way when relevant.**

        🔹 **User Question:** {user_message}  
        🔹 **Your English Response:**  
        """
    
    # Call Groq API with DeepSeek model
    response = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",  # Updated to DeepSeek model
        messages=[{"role": "user", "content": prompt}]
    )

    cleaned_response = clean_response(response.choices[0].message.content)
    return cleaned_response

@app.route("/get_response", methods=["POST"])
def get_response():
    data = request.json
    user_input = data.get("message", "")
    language = data.get("language", "English")  # Default to English if not specified

    bot_response = get_groq_response(user_input, language)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
