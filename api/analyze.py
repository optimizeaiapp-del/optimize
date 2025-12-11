from http.server import BaseHTTPRequestHandler
import json
import os
from openai import OpenAI

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            prompt = data.get('prompt')
            images = data.get('images')
            
            if not prompt:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Prompt is required'}).encode())
                return
            
            api_key = os.environ.get('OPENAI_API_KEY')
            if not api_key:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'error': 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.'
                }).encode())
                return
            
            openai_client = OpenAI(api_key=api_key)
            
            # Build messages array
            messages = [
                {
                    'role': 'system',
                    'content': 'You are an AI coach for high school students. You analyze both written assignments and visual projects (artwork, designs, etc.). You give specific, kind, and academically honest feedback. You never encourage cheating; you help students learn. CRITICAL: When grading, you MUST match the teacher\'s marking style exactly. If a teacher is described as "very strict" or "hard marker", you must be correspondingly strict. For severely incomplete work (e.g., only a few words when hundreds/thousands are required), strict markers would give 0% or very close to 0%. Do not give partial credit to incomplete work when the teacher is strict.'
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
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'result': result}).encode())
            
        except Exception as error:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': str(error) or 'An error occurred while processing your request.'
            }).encode())
