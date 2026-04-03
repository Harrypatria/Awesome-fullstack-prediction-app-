import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler, OrdinalEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import os

# Configuration
DATA_PATH = "backend/data/raw/HR-Employee-Attrition.csv"
MODELS_DIR = "backend/models"
os.makedirs(MODELS_DIR, exist_ok=True)

NUMERICAL_FEATURES = [
    'Age', 'DailyRate', 'DistanceFromHome', 'Education',
    'EnvironmentSatisfaction', 'HourlyRate', 'JobInvolvement',
    'JobLevel', 'JobSatisfaction', 'MonthlyIncome', 'MonthlyRate',
    'NumCompaniesWorked', 'PercentSalaryHike', 'PerformanceRating',
    'RelationshipSatisfaction', 'StockOptionLevel', 'TotalWorkingYears',
    'TrainingTimesLastYear', 'WorkLifeBalance', 'YearsAtCompany',
    'YearsInCurrentRole', 'YearsSinceLastPromotion', 'YearsWithCurrManager',
]

CATEGORICAL_FEATURES = [
    'BusinessTravel', 'Department', 'EducationField',
    'Gender', 'JobRole', 'MaritalStatus',
]

BOOLEAN_FEATURES = ['OverTime']

CATEGORICAL_OPTIONS = [
    ['Non-Travel', 'Travel_Rarely', 'Travel_Frequently'],
    ['Human Resources', 'Research & Development', 'Sales'],
    ['Human Resources', 'Life Sciences', 'Marketing', 'Medical', 'Other', 'Technical Degree'],
    ['Female', 'Male'],
    ['Healthcare Representative', 'Human Resources', 'Laboratory Technician',
     'Manager', 'Manufacturing Director', 'Research Director',
     'Research Scientist', 'Sales Executive', 'Sales Representative'],
    ['Divorced', 'Married', 'Single'],
]

def train():
    print("Loading data...")
    df = pd.read_csv(DATA_PATH)
    
    # Preprocessing
    df['Attrition'] = (df['Attrition'] == 'Yes').astype(int)
    df['OverTime'] = (df['OverTime'] == 'Yes').astype(int)
    
    X = df[NUMERICAL_FEATURES + CATEGORICAL_FEATURES + BOOLEAN_FEATURES]
    y = df['Attrition']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), NUMERICAL_FEATURES),
            ('cat', OrdinalEncoder(categories=CATEGORICAL_OPTIONS), CATEGORICAL_FEATURES),
            ('bool', 'passthrough', BOOLEAN_FEATURES),
        ]
    )
    
    model = GradientBoostingClassifier(
        n_estimators=300, 
        max_depth=4, 
        learning_rate=0.05,
        random_state=42
    )
    
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', model)
    ])
    
    print("Training model...")
    pipeline.fit(X, y)
    
    print("Saving artefacts...")
    joblib.dump(pipeline, os.path.join(MODELS_DIR, "model.pkl"))
    
    # Save background for SHAP
    X_proc = preprocessor.fit_transform(X)
    np.save(os.path.join(MODELS_DIR, "background.npy"), X_proc[:100])
    
    print("Training complete!")

if __name__ == "__main__":
    # In this environment, we might not have all dependencies installed for Python
    # This is a placeholder for the requested repository structure
    print("Train script initialized")
