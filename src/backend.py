from flask import Flask, request, jsonify
import config
from dotenv import load_dotenv
from langchain import Bedrock

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set up the Bedrock model using LangChain
bedrock_model = Bedrock(
    model_name="us.meta.llama3-2-90b-instruct-v1:0",
    aws_access_key_id=config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
    region_name=config.AWS_DEFAULT_REGION,
)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        # Call the Bedrock model with the prompt
        generated_text = bedrock_model(prompt)

        return jsonify({'generated_text': generated_text}), 200

    except Exception as e:
        return jsonify({'error': f'Failed to generate response: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
