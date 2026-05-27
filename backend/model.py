import json
import random
import os

# Load nutrition database
with open(os.path.join(os.path.dirname(__file__), 'nutrition_db.json'), 'r') as f:
    NUTRITION_DB = json.load(f)

FOOD_LIST = list(NUTRITION_DB.keys())

def classify_food(image_path):
    """
    Mock food classification function.
    In a real implementation, load a pretrained CNN model (e.g., MobileNet or EfficientNet)
    trained on food images, preprocess the image, and predict the class.

    For this demo, returns a random food from the database.
    """
    # Simulate classification
    predicted_food = random.choice(FOOD_LIST)
    return predicted_food

def get_nutrition_info(food_name):
    """
    Get nutrition information for a food item.
    """
    return NUTRITION_DB.get(food_name.lower(), None)