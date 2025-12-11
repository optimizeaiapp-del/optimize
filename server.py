#!/usr/bin/env python3
"""
OptimizeAI Backend Server
Handles OpenAI API calls securely
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='.')
CORS(app)

# Initialize OpenAI client
openai_client = None
api_key = os.getenv('OPENAI_API_KEY')
if api_key:
    openai_client = OpenAI(api_key=api_key)
else:
    print("⚠️  WARNING: OPENAI_API_KEY not set")
    print("   Create a .env file with: OPENAI_API_KEY=your-key-here")
    print("   Or set it with: export OPENAI_API_KEY='your-key-here'")

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        prompt = data.get('prompt')
        images = data.get('images')  # Dictionary with 'instructions' and/or 'draft' image data

        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400

        if not openai_client:
            return jsonify({
                'error': 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.'
            }), 500

        # Build messages array
        messages = [
            {
                'role': 'system',
                'content': 'You are an AI coach for high school students. You analyze both written assignments and visual projects (artwork, designs, etc.). You give specific, kind, and academically honest feedback. You never encourage cheating; you help students learn.'
            }
        ]

        # Build user message with text and/or images
        user_content = []
        
        # Add text prompt
        user_content.append({
            'type': 'text',
            'text': prompt
        })
        
        # Add images if provided
        if images:
            if images.get('instructions'):
                user_content.append({
                    'type': 'image_url',
                    'image_url': {
                        'url': images['instructions']
                    }
                })
            if images.get('draft'):
                user_content.append({
                    'type': 'image_url',
                    'image_url': {
                        'url': images['draft']
                    }
                })

        messages.append({
            'role': 'user',
            'content': user_content
        })

        # Use gpt-4o for vision analysis (better quality than gpt-4o-mini for images)
        # Falls back to gpt-4o-mini if no images (faster and cheaper for text-only)
        has_images = images and (images.get('instructions') or images.get('draft'))
        model = 'gpt-4o' if has_images else 'gpt-4o-mini'
        
        completion = openai_client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.7,
            max_tokens=2000
        )

        result = completion.choices[0].message.content
        return jsonify({'result': result})

    except Exception as error:
        print(f"Error: {error}")
        return jsonify({
            'error': str(error) or 'An error occurred while processing your request.'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    print(f"🚀 Starting OptimizeAI server on http://localhost:{port}")
    if openai_client:
        print("✅ OpenAI API key configured")
    else:
        print("⚠️  OpenAI API key not configured - set OPENAI_API_KEY environment variable")
    app.run(host='0.0.0.0', port=port, debug=True)

