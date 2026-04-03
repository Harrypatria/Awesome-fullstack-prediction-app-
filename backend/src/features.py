FEATURE_CONFIG = {
    "Age": {"min": 18, "max": 60, "default": 35},
    "DailyRate": {"min": 100, "max": 1500, "default": 800},
    "DistanceFromHome": {"min": 1, "max": 30, "default": 10},
    "Education": {"min": 1, "max": 5, "default": 3},
    "EnvironmentSatisfaction": {"min": 1, "max": 4, "default": 3},
    "HourlyRate": {"min": 30, "max": 100, "default": 65},
    "JobInvolvement": {"min": 1, "max": 4, "default": 3},
    "JobLevel": {"min": 1, "max": 5, "default": 2},
    "JobSatisfaction": {"min": 1, "max": 4, "default": 3},
    "MonthlyIncome": {"min": 1000, "max": 20000, "default": 6500},
    "MonthlyRate": {"min": 2000, "max": 27000, "default": 14000},
    "NumCompaniesWorked": {"min": 0, "max": 9, "default": 2},
    "PercentSalaryHike": {"min": 11, "max": 25, "default": 15},
    "PerformanceRating": {"min": 3, "max": 4, "default": 3},
    "RelationshipSatisfaction": {"min": 1, "max": 4, "default": 3},
    "StockOptionLevel": {"min": 0, "max": 3, "default": 1},
    "TotalWorkingYears": {"min": 0, "max": 40, "default": 10},
    "TrainingTimesLastYear": {"min": 0, "max": 6, "default": 2},
    "WorkLifeBalance": {"min": 1, "max": 4, "default": 3},
    "YearsAtCompany": {"min": 0, "max": 40, "default": 5},
    "YearsInCurrentRole": {"min": 0, "max": 20, "default": 3},
    "YearsSinceLastPromotion": {"min": 0, "max": 15, "default": 1},
    "YearsWithCurrManager": {"min": 0, "max": 20, "default": 3}
}

FEATURE_GROUPS = {
    "Personal": ["Age", "Gender", "MaritalStatus", "DistanceFromHome", "Education", "EducationField"],
    "Job": ["JobRole", "Department", "JobLevel", "JobInvolvement", "JobSatisfaction"],
    "Compensation": ["MonthlyIncome", "DailyRate", "HourlyRate", "MonthlyRate", "PercentSalaryHike", "StockOptionLevel"],
    "WorkConditions": ["BusinessTravel", "OverTime", "WorkLifeBalance", "EnvironmentSatisfaction", "RelationshipSatisfaction"],
    "Experience": ["TotalWorkingYears", "YearsAtCompany", "YearsInCurrentRole", "YearsSinceLastPromotion", "YearsWithCurrManager", "NumCompaniesWorked", "TrainingTimesLastYear", "PerformanceRating"]
}
