# Real-Time Posture Recognition in Exercise and Nutritional Analysis

## Abstract

This project implements a comprehensive full-stack application that combines real-time posture recognition for exercise analysis with nutritional assessment through image classification. Utilizing MediaPipe's BlazePose for accurate pose estimation and a Convolutional Neural Network (CNN) for food recognition, the system provides users with immediate feedback on exercise form and detailed nutritional information, promoting healthier lifestyles through technology-driven insights.

## Features

### Real-Time Posture Detection
- **Live Webcam Integration**: Seamless camera access with real-time video processing
- **Multi-Exercise Support**: Specialized analysis for Pushups, Squats, Biceps Curls, and Shoulder Press
- **Angle Calculation**: Precise joint angle measurements using pose landmarks
- **Repetition Counting**: Intelligent counting based on exercise stage transitions
- **Posture Feedback**: Real-time guidance for maintaining correct form
- **Stage Detection**: Clear UP/DOWN state identification for each exercise

### Nutritional Analysis
- **Image Classification**: CNN-based food recognition from uploaded images
- **Comprehensive Database**: Detailed nutritional information including calories, protein, carbs, and fats
- **User-Friendly Interface**: Intuitive upload and results display
- **Error Handling**: Robust error management for various input scenarios

## Tech Stack

### Frontend
- **HTML5**: Semantic markup and responsive design
- **CSS3**: Modern styling with gradients, animations, and responsive layouts
- **JavaScript (ES6+)**: Asynchronous programming and DOM manipulation
- **MediaPipe Pose**: Advanced pose estimation using BlazePose model
- **Canvas API**: Real-time landmark visualization

### Backend
- **Python Flask**: Lightweight REST API framework
- **TensorFlow/Keras**: Deep learning framework for CNN implementation
- **Pretrained Models**: MobileNet/EfficientNet architectures for food classification
- **JSON Database**: Structured nutritional data storage

### Additional Libraries
- **Flask-CORS**: Cross-origin resource sharing
- **Pillow**: Image processing capabilities
- **NumPy**: Numerical computations

## Architecture Overview

The application follows a modular client-server architecture:

1. **Frontend Layer**: Handles user interaction, camera access, and real-time pose processing
2. **Backend Layer**: Manages image processing, model inference, and data retrieval
3. **Data Layer**: JSON-based nutritional database for quick lookups

### Data Flow
1. User selects exercise or uploads food image
2. Frontend captures video/image and sends to backend (if applicable)
3. Backend processes data using ML models
4. Results are returned and displayed with visual feedback

## Screenshots

*(Add screenshots of the application in action)*

1. Main Interface with Exercise Selection
2. Real-time Pose Detection with Landmarks
3. Nutritional Analysis Results
4. Responsive Mobile View

## Installation Steps

### Prerequisites
- Python 3.8+
- Node.js (for potential frontend tooling)
- Webcam-enabled device
- Modern web browser with WebRTC support

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
1. Open `index.html` in a web browser
2. Ensure backend is running on `http://localhost:5000`
3. Grant camera permissions when prompted

### Running the Application
1. Start the Flask backend server
2. Open `index.html` for posture recognition
3. Open `nutrition.html` for nutritional analysis
4. Select an exercise and begin your workout
5. Upload food images for nutritional insights

## How to Run

### Local Development
1. **Clone the repository**
2. **Set up Python environment**
3. **Install dependencies**
4. **Run backend server**
5. **Open HTML files in browser**

### Production Deployment
See deployment guide below for cloud hosting options.

## Future Improvements

- **Enhanced Model Accuracy**: Fine-tune CNN on larger food datasets
- **Mobile Application**: Native iOS/Android apps using React Native
- **User Accounts**: Personalized workout tracking and meal logging
- **Advanced Analytics**: Progress charts and performance metrics
- **Integration APIs**: Connect with fitness trackers and nutrition apps
- **Real-time Collaboration**: Multi-user workout sessions
- **AI-Powered Coaching**: Personalized exercise recommendations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Ansh Gangwar**  
B.Tech Computer Science Engineering  
[GitHub](https://github.com/anshgangwar) | [LinkedIn](https://linkedin.com/in/anshgangwar)

---

*This project was developed as a Final Year B.Tech Major Project, demonstrating expertise in computer vision, machine learning, and full-stack development.*