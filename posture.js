const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

const repsElement = document.getElementById('reps');
const stageElement = document.getElementById('stage');
const angleElement = document.getElementById('angle');
const feedbackElement = document.getElementById('feedback');

// App state
let appState = {
  currentExercise: null,
  reps: 0,
  stage: 'UP',
  angle: null,
  feedback: '',
  landmarks: null
};

// Pose model
let pose;

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  if (results.poseLandmarks) {
    appState.landmarks = results.poseLandmarks;
    
    // Draw landmarks
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4});
    drawLandmarks(canvasCtx, results.poseLandmarks, {color: '#FF0000', lineWidth: 2});
    
    // Process exercise
    if (appState.currentExercise) {
      processExercise();
    }
  }
  
  canvasCtx.restore();
}

function processExercise() {
  if (!appState.landmarks) return;
  
  let angle = null;
  let isCorrect = false;
  
  switch (appState.currentExercise) {
    case 'pushup':
      angle = calculatePushupAngle();
      isCorrect = angle > 160 && angle < 180; // UP position
      break;
    case 'squat':
      angle = calculateSquatAngle();
      isCorrect = angle > 160 && angle < 180; // UP position
      break;
    case 'biceps_curl':
      angle = calculateBicepsCurlAngle();
      isCorrect = angle > 160 && angle < 180; // UP position
      break;
    case 'shoulder_press':
      angle = calculateShoulderPressAngle();
      isCorrect = angle > 160 && angle < 180; // UP position
      break;
  }
  
  appState.angle = angle;
  
  // Update stage
  if (angle !== null) {
    const prevStage = appState.stage;
    if (angle < 90) {
      appState.stage = 'DOWN';
    } else if (angle > 160) {
      appState.stage = 'UP';
    }
    
    // Count rep on transition from DOWN to UP
    if (prevStage === 'DOWN' && appState.stage === 'UP') {
      appState.reps++;
    }
  }
  
  // Feedback
  if (isCorrect) {
    appState.feedback = 'Good form!';
    feedbackElement.className = 'feedback correct';
  } else {
    appState.feedback = 'Adjust your posture';
    feedbackElement.className = 'feedback incorrect';
  }
  
  updateUI();
}

function calculatePushupAngle() {
  const landmarks = appState.landmarks;
  const shoulder = landmarks[11]; // left shoulder
  const elbow = landmarks[13]; // left elbow
  const wrist = landmarks[15]; // left wrist
  
  return calculateAngle(shoulder, elbow, wrist);
}

function calculateSquatAngle() {
  const landmarks = appState.landmarks;
  const hip = landmarks[23]; // left hip
  const knee = landmarks[25]; // left knee
  const ankle = landmarks[27]; // left ankle
  
  return calculateAngle(hip, knee, ankle);
}

function calculateBicepsCurlAngle() {
  const landmarks = appState.landmarks;
  const shoulder = landmarks[11]; // left shoulder
  const elbow = landmarks[13]; // left elbow
  const wrist = landmarks[15]; // left wrist
  
  return calculateAngle(shoulder, elbow, wrist);
}

function calculateShoulderPressAngle() {
  const landmarks = appState.landmarks;
  const shoulder = landmarks[11]; // left shoulder
  const elbow = landmarks[13]; // left elbow
  const wrist = landmarks[15]; // left wrist
  
  return calculateAngle(shoulder, elbow, wrist);
}

function calculateAngle(a, b, c) {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

function updateUI() {
  repsElement.textContent = appState.reps;
  stageElement.textContent = appState.stage;
  angleElement.textContent = appState.angle ? appState.angle.toFixed(1) : '--';
  feedbackElement.textContent = appState.feedback;
}

function selectExercise(exercise) {
  // Reset state
  appState.currentExercise = exercise;
  appState.reps = 0;
  appState.stage = 'UP';
  appState.angle = null;
  appState.feedback = '';
  
  // Update UI
  document.querySelectorAll('.exercise-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  updateUI();
}

function showSection(section) {
  // For navigation
}

async function init() {
  pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
  });
  
  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  
  pose.onResults(onResults);
  
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({image: videoElement});
    },
    width: 640,
    height: 480
  });
  
  await camera.start();
  
  // Set canvas size
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
}

init();