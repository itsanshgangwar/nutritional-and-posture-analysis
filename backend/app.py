import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from model import classify_food, get_nutrition_info

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/analyze_nutrition', methods=['POST'])
def analyze_nutrition():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Classify the food
        predicted_food = classify_food(filepath)
        
        # Get nutrition info
        nutrition = get_nutrition_info(predicted_food)
        
        if nutrition:
            result = {
                'food': predicted_food,
                'nutrition': nutrition
            }
            return jsonify(result)
        else:
            return jsonify({'error': 'Nutrition data not found'}), 404
    else:
        return jsonify({'error': 'Invalid file type'}), 400

@app.route('/')
def index():
    return "Nutrition Analysis API"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)