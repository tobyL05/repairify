from flask import Flask, request, jsonify
import config
from dotenv import load_dotenv
from langchain import Bedrock

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize Llama model
llama_model = Bedrock(
    model_name="your-llama-model-id",  # Replace with your Llama model ID
    aws_access_key_id=config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
    region_name=config.AWS_DEFAULT_REGION,
)

def is_base64_image(data):
    """Check if the provided data is a base64 encoded image."""
    return bool(re.match(r"^data:image/.+;base64,", data))

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        # Process the input prompt through the Llama model
        if is_base64_image(prompt):
            # Handle base64 image processing (if applicable)
            # Here you would decode the image and potentially pass it to the Llama model
            processed_text = llama_model(prompt)  # Adjust as needed for image input
        else:
            # Process the text prompt through Llama
            processed_text = llama_model(prompt)

        return jsonify({
            'llama_response': processed_text,
        }), 200

    except Exception as e:
        return jsonify({'error': f'Failed to process request: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
