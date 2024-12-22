from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import T5Tokenizer, T5ForConditionalGeneration

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Load the model and tokenizer
tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-large")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-large")

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        # Get the input text from the request
        input_text = request.json.get('input_text', '')
        if not input_text:
            return jsonify({'error': 'Input text is required'}), 400

        # Tokenize and generate the output
        input_ids = tokenizer(input_text, return_tensors="pt").input_ids
        outputs = model.generate(input_ids, max_new_tokens=50)
        translated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({'output': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

