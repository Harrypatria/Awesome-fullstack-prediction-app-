<div align="center">

# Attrition Predictor Pro

### Agentic People Analytics & Retention Strategy Command Center

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4-F7931E?logo=scikitlearn&logoColor=white)](https://scikit-learn.org/)
[![XGBoost](https://img.shields.io/badge/XGBoost-2.0-FF6600?logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Stars](https://img.shields.io/github/stars/Harrypatria/Awesome-fullstack-prediction-app-?style=social)](https://github.com/Harrypatria/Awesome-fullstack-prediction-app-/stargazers)

**Transform employee retention from reactive reporting into proactive intelligence.**

[🚀 Live Demo](https://ais-pre-dtiotfvpg4lsnhfux7dgfg-205102116537.europe-west3.run.app) · [📓 Google Colab](https://colab.research.google.com/drive/13519TfQXrX-YwUWF_gIAnoM2mK_2CZAk?usp=sharing) · [📄 Prompt](./prompt.txt) · [🐛 Issues](https://github.com/Harrypatria/Awesome-fullstack-prediction-app-/issues)

</div>

---

## Table of Contents

1. [Overview](#-overview)
2. [The ITDO Framework](#-the-itdo-framework)
3. [End-to-End ML Lifecycle](#-end-to-end-ml-lifecycle)
   - [Step 1 — Problem Definition](#step-1--problem-definition)
   - [Step 2 — Data Processing](#step-2--data-processing)
   - [Step 3 — Modelling](#step-3--modelling)
   - [Step 4 — Evaluation](#step-4--evaluation)
   - [Step 5 — Deployment](#step-5--deployment)
4. [Building with Google AI Studio](#-building-with-google-ai-studio)
5. [Prompt Engineering Guide](#-prompt-engineering-guide)
6. [Tech Stack](#-tech-stack)
7. [Repository Structure](#-repository-structure)
8. [Setup & Installation](#-setup--installation)
9. [API Reference](#-api-reference)
10. [Stars History](#-stars-history)
11. [Contributing](#-contributing)
12. [Author](#-author)

---

## 🌟 Overview

**Attrition Predictor Pro** is a production-grade, full-stack HR analytics platform that bridges the gap between machine learning insights and operational HR execution. Built on the **ITDO Framework** (Insights → Triggers → Decisions → Operations), it enables HR leaders to move from asking *"Why did they leave?"* to *"How do we stop them from leaving?"*

> *"The future of HR isn't just about reporting what happened. It's about predicting what will happen — and having the operational command center to change the outcome."*
> — **Dr. Harry Patria**, Chief Data & AI Officer, Patria & Co.

### Key Capabilities

| Capability | Description |
|---|---|
| 🎯 **Risk Prediction** | Gradient Boosting model predicts individual attrition probability (AUC-ROC ≥ 0.85) |
| 🔍 **SHAP Interpretability** | Waterfall explanations per employee — no black box |
| ⚡ **Automated Alerts** | Threshold-based triggers fire when risk exceeds configurable limit |
| 🧠 **AI Interventions** | Rule-based + LLM-augmented retention recommendations |
| 📋 **Task Operations** | Kanban board converts decisions into assigned, deadline-driven HR actions |
| 📊 **Batch Analytics** | Upload CSV of 500+ employees for fleet-wide risk assessment |

---

## 🛠️ The ITDO Framework

The ITDO Framework is the architectural backbone of this platform. Every feature maps to one layer:

```
┌────────────────────────────────────────────────────────────────┐
│                     ITDO FRAMEWORK                             │
├────────────┬──────────────────┬────────────────────────────────┤
│ Layer      │ Tool             │ Function                       │
├────────────┼──────────────────┼────────────────────────────────┤
│ INSIGHTS   │ /predict page    │ SHAP + GBM risk scores per     │
│ 🔍         │ /model page      │ employee; feature importance   │
├────────────┼──────────────────┼────────────────────────────────┤
│ TRIGGERS   │ /alerts page     │ Auto-alerts when P(attrition)  │
│ ⚡         │ Supabase         │ exceeds configurable threshold │
├────────────┼──────────────────┼────────────────────────────────┤
│ DECISIONS  │ Intervention     │ AI-suggested actions based on  │
│ 🧠         │ Engine           │ each employee's top SHAP drivers│
├────────────┼──────────────────┼────────────────────────────────┤
│ OPERATIONS │ /tasks page      │ Kanban board: assign → track → │
│ 📋         │ (Kanban)         │ resolve retention actions      │
└────────────┴──────────────────┴────────────────────────────────┘
```

---

## 🔄 End-to-End ML Lifecycle

This project follows a rigorous, reproducible machine learning lifecycle — from raw problem statement to deployed full-stack application. Each step is documented with exact code artifacts.

---

### Step 1 — Problem Definition

**Business Problem:**
Organizations lose 1.5–2× annual salary per voluntary departure. Exit interviews capture data *after* the fact. We need a system that:
- Predicts **who** will leave before they resign
- Explains **why** they are at risk (interpretable, not black-box)
- Recommends **what** HR can do to retain them
- Tracks **whether** interventions were executed

**Framing the ML Task:**
```
Type:      Binary Classification
Target:    Attrition (Yes=1, No=0)
Unit:      Individual employee
Output:    P(attrition) ∈ [0,1] + SHAP explanation
Class ratio: ~84% No / ~16% Yes  →  imbalanced dataset
```

**Success Criteria:**

| Metric | Threshold |
|---|---|
| AUC-ROC | ≥ 0.85 |
| F1-Score (macro) | ≥ 0.75 |
| SHAP top-5 features | Aligned with HR domain knowledge |
| Alert latency | < 500 ms per prediction |

---

### Step 2 — Data Processing

**Dataset:** IBM HR Analytics Employee Attrition (1,470 rows, 35 columns)

**Feature Groups:**

```
┌─────────────────────┬──────────────────────────────────────────────────┐
│ Group               │ Features                                         │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Demographics        │ Age, Gender, MaritalStatus, DistanceFromHome     │
│ Job Characteristics │ JobRole, Department, JobLevel, JobInvolvement    │
│ Compensation        │ MonthlyIncome, StockOptionLevel, SalaryHike%    │
│ Satisfaction Scores │ JobSatisfaction, WorkLifeBalance, EnvironmentSat │
│ Tenure              │ YearsAtCompany, YearsInCurrentRole, TotalExpYrs  │
│ Performance         │ PerformanceRating, TrainingTimesLastYear         │
│ Workload            │ OverTime, BusinessTravel                         │
└─────────────────────┴──────────────────────────────────────────────────┘
```

**Preprocessing Pipeline** (`backend/preprocessing.py`):

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split

# Step 1: Drop constants and identifiers
DROP_COLS = ['EmployeeCount', 'Over18', 'StandardHours', 'EmployeeNumber']

# Step 2: Define transformers
numeric_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(drop='first', sparse_output=False)

preprocessor = ColumnTransformer(transformers=[
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

# Step 3: Encode target
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(df['Attrition'])  # Yes→1, No→0

# Step 4: Stratified 80/20 split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
```

**Run EDA in Google Colab:**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/13519TfQXrX-YwUWF_gIAnoM2mK_2CZAk?usp=sharing)

---

### Step 3 — Modelling

Three candidate models are trained and compared:

```python
from sklearn.ensemble import GradientBoostingClassifier
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_validate

MODELS = {
    "GradientBoosting": GradientBoostingClassifier(
        n_estimators=200, learning_rate=0.05,
        max_depth=4, random_state=42
    ),
    "XGBoost": XGBClassifier(
        n_estimators=200, learning_rate=0.05,
        use_label_encoder=False, eval_metric='logloss',
        random_state=42
    ),
    "LogisticRegression": LogisticRegression(
        class_weight='balanced', max_iter=1000
    )
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

for name, model in MODELS.items():
    pipeline = Pipeline([('preprocessor', preprocessor), ('model', model)])
    scores = cross_validate(
        pipeline, X_train, y_train, cv=cv,
        scoring=['roc_auc', 'f1_macro', 'precision_macro', 'recall_macro']
    )
    print(f"{name}: AUC={scores['test_roc_auc'].mean():.3f}")
```

**Hyperparameter Tuning** (best model):

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'model__n_estimators': [100, 200, 300],
    'model__max_depth': [3, 4, 5],
    'model__learning_rate': [0.01, 0.05, 0.1],
    'model__subsample': [0.8, 1.0]
}

grid_search = GridSearchCV(
    best_pipeline, param_grid,
    cv=cv, scoring='roc_auc', n_jobs=-1, verbose=1
)
grid_search.fit(X_train, y_train)
```

**SHAP Integration:**

```python
import shap

explainer = shap.TreeExplainer(best_model)
shap_values = explainer.shap_values(X_test_transformed)

# SHAP waterfall for individual employee
shap.waterfall_plot(shap.Explanation(
    values=shap_values[i],
    base_values=explainer.expected_value,
    data=X_test_transformed[i],
    feature_names=feature_names
))
```

**Model Serialisation:**

```python
import joblib, pickle, json

# Primary (recommended)
joblib.dump(best_pipeline, 'models/model.pkl')

# Backup format
pickle.dump(best_pipeline, open('models/model.sav', 'wb'))

# Metadata
json.dump(feature_names, open('models/feature_names.json', 'w'))
json.dump(metrics_dict, open('models/metrics.json', 'w'))
```

---

### Step 4 — Evaluation

**Evaluation Notebook:** `notebooks/02_evaluation.ipynb`

Metrics produced and stored in `reports/model_report.md`:

```
┌──────────────────┬──────────────────────────────────────────────────┐
│ Metric           │ Value (GradientBoosting, holdout)                │
├──────────────────┼──────────────────────────────────────────────────┤
│ AUC-ROC          │ 0.873                                            │
│ F1-Score (macro) │ 0.782                                            │
│ Precision        │ 0.801                                            │
│ Recall           │ 0.765                                            │
│ Accuracy         │ 0.884                                            │
└──────────────────┴──────────────────────────────────────────────────┘

Top 5 SHAP Features (by mean |SHAP value|):
  1. OverTime_Yes              0.31
  2. MonthlyIncome             0.24
  3. YearsAtCompany            0.19
  4. JobSatisfaction           0.17
  5. StockOptionLevel          0.14
```

**Evaluation Visuals generated:**
- `reports/eda/attrition_distribution.png`
- `reports/eda/correlation_heatmap.png`
- `reports/eval/roc_curve.png`
- `reports/eval/confusion_matrix.png`
- `reports/eval/shap_summary.png`
- `reports/eval/feature_importance.png`

---

### Step 5 — Deployment

**Architecture:**

```
┌───────────────────────────────────────────────────────────────┐
│                        PRODUCTION ARCHITECTURE                │
├──────────────────┬────────────────────────────────────────────┤
│  USER BROWSER    │  React 18 + Vite (Vercel CDN)             │
│                  │  → /predict → /alerts → /tasks            │
├──────────────────┼────────────────────────────────────────────┤
│  API LAYER       │  FastAPI (Render.com)                      │
│                  │  POST /predict  |  GET /model-metrics      │
│                  │  POST /batch-predict  |  GET /health       │
├──────────────────┼────────────────────────────────────────────┤
│  ML ENGINE       │  model.pkl (GradientBoosting + SHAP)      │
│                  │  Loaded at startup; sub-50ms inference     │
├──────────────────┼────────────────────────────────────────────┤
│  DATABASE        │  Supabase (PostgreSQL + RLS)              │
│                  │  employees / predictions / alerts / tasks  │
├──────────────────┼────────────────────────────────────────────┤
│  AUTH            │  Supabase Auth (email/password + OAuth)   │
└──────────────────┴────────────────────────────────────────────┘
```

---

## 🤖 Building with Google AI Studio

This project was architected and generated using **Google AI Studio** with **Gemini 2.5 Pro**, following a structured agentic development workflow. The `prompt.txt` file in this repository contains the complete system prompt used.

### Agentic Development Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AGENTIC DEVELOPMENT LIFECYCLE                            │
└─────────────────────────────────────────────────────────────────────────────┘

  ╔══════════════╗     ╔══════════════╗     ╔══════════════╗
  ║  1. PROBLEM  ║────▶║   2. DATA    ║────▶║  3. MODELLING║
  ║  DEFINITION  ║     ║  PROCESSING  ║     ║  (Colab)     ║
  ║              ║     ║  (Colab)     ║     ║              ║
  ║ Business KPIs║     ║ EDA + Pipeline║    ║ GBM+XGB+LR  ║
  ║ ML framing   ║     ║ SMOTE / scale ║    ║ SHAP + CV   ║
  ╚══════════════╝     ╚══════════════╝     ╚══════════════╝
                                                   │
  ╔══════════════╗     ╔══════════════╗     ╔══════╨═══════╗
  ║  6. MONITOR  ║◀────║  5. DEPLOY   ║◀────║  4. EVALUATE ║
  ║  & ITERATE   ║     ║  (Vercel +   ║     ║  (Colab)     ║
  ║              ║     ║   Render)    ║     ║              ║
  ║ Drift alerts ║     ║ CI/CD GitHub ║     ║ ROC, F1,    ║
  ║ Retraining   ║     ║ Actions      ║     ║ Confusion Mx ║
  ╚══════════════╝     ╚══════════════╝     ╚══════════════╝

  ┌─────────────────────────────────────────────────────────┐
  │  GENERATION LAYER: Google AI Studio + Gemini 2.5 Pro    │
  │  Each phase above maps to a distinct prompt turn        │
  │  (see prompt.txt Section 8 for exact turn sequence)     │
  └─────────────────────────────────────────────────────────┘
```

### Google AI Studio Setup

1. Open [Google AI Studio](https://aistudio.google.com/)
2. Create a **New Prompt** → set Model to **Gemini 2.5 Pro**
3. Paste `prompt.txt` into **System Instructions**
4. Attach files to context: `HR-Employee-Attrition.csv`, `SKILL.md`
5. Follow the 6-turn generation sequence (detailed in `prompt.txt` Section 8)

---

## 📋 Prompt Engineering Guide

The `prompt.txt` in this repository is a production-grade system prompt following the **fullstack-analytics-builder** SKILL framework. Here is how it is structured:

```
prompt.txt
│
├── SECTION 1  — Role & Context
│   └── Defines LLM persona: senior HR + full-stack engineer
│
├── SECTION 2  — Problem Statement
│   └── Business KPIs, target users, success metrics
│
├── SECTION 3  — Dataset & Feature Specification
│   └── Column groups, target encoding, class imbalance strategy
│
├── SECTION 4  — Data Pipeline Specification
│   └── Phase-by-phase pipeline (ingest → EDA → preprocess)
│
├── SECTION 5  — Backend API Specification
│   └── FastAPI routes, Pydantic schemas, SHAP integration
│   └── Intervention rule mapping (feature → HR action)
│
├── SECTION 6  — Database Schema
│   └── PostgreSQL DDL: employees, predictions, alerts, tasks
│   └── RLS policies, indexes, soft-delete pattern
│
├── SECTION 7  — Frontend UI Specification
│   └── Pages, routes, slicer component spec, design tokens
│
├── SECTION 8  — Google AI Studio Deployment Instructions
│   └── Turn-by-turn generation sequence
│
├── SECTION 9  — Environment Variables
│   └── Complete .env.example with inline security notes
│
└── SECTION 10 — Final Delivery Format
    └── Standard output structure Claude/Gemini must follow
```

**Prompt Design Principles Applied:**

| Principle | Application in prompt.txt |
|---|---|
| **Role priming** | Dual persona: HR domain expert + software engineer |
| **Structured output** | Explicit delivery format in Section 10 |
| **Silent execution** | "Execute SILENTLY without asking questions" |
| **Phase decomposition** | Numbered turns for Google AI Studio context management |
| **Constraint injection** | AUC ≥ 0.85, no `any` TypeScript, no bare `except` |
| **Schema-first** | Full SQL DDL before API routes before UI |
| **Example-driven** | Exact code blocks per phase, not abstract descriptions |

---

## 📦 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite + TypeScript | SPA with fast HMR |
| **Styling** | Tailwind CSS 4.0 + shadcn/ui | Design system |
| **State** | Zustand | Client state management |
| **Charts** | Recharts + custom SHAP waterfall | Risk visualisation |
| **Animation** | Framer Motion | Page transitions, stagger |
| **Backend** | FastAPI (Python 3.10) | ML inference API |
| **Validation** | Pydantic v2 | Request/response schemas |
| **ML Models** | scikit-learn, XGBoost, LightGBM | Attrition classification |
| **Explainability** | SHAP (TreeExplainer) | Waterfall + beeswarm plots |
| **Database** | Supabase (PostgreSQL) | Structured data + RLS |
| **Auth** | Supabase Auth | Role-based access |
| **Realtime** | Supabase Realtime | Live alert updates |
| **Testing** | Playwright (E2E), pytest, Vitest | Full test coverage |
| **CI/CD** | GitHub Actions → Vercel + Render | Continuous deployment |
| **Containers** | Docker + docker-compose | Portable local dev |

---

## 📁 Repository Structure

```
Awesome-fullstack-prediction-app-/
│
├── 📓 notebooks/
│   ├── 01_eda.ipynb                  # Exploratory Data Analysis (Colab)
│   └── 02_evaluation.ipynb           # Model evaluation + SHAP plots (Colab)
│
├── 🐍 backend/
│   ├── main.py                       # FastAPI app + routes
│   ├── schemas.py                    # Pydantic v2 request/response models
│   ├── data_pipeline.py              # Data ingestion and cleaning
│   ├── preprocessing.py              # sklearn Pipeline (scale + encode)
│   ├── train.py                      # Model training + serialisation
│   ├── interventions.py              # SHAP feature → HR intervention rules
│   └── requirements.txt              # Python dependencies
│
├── 🤖 models/
│   ├── model.pkl                     # Best model (joblib)
│   ├── model.sav                     # Backup (pickle)
│   ├── feature_names.json            # Feature list for slicer UI
│   └── metrics.json                  # AUC-ROC, F1, etc.
│
├── ⚛️ src/
│   ├── pages/
│   │   ├── Dashboard.tsx             # KPI overview + risk heatmap
│   │   ├── Predict.tsx               # Slicer UI (single employee)
│   │   ├── Batch.tsx                 # CSV upload + batch predict
│   │   ├── Alerts.tsx                # Triggers management
│   │   ├── Tasks.tsx                 # Kanban operations board
│   │   ├── ModelInsights.tsx         # ROC, SHAP, feature importance
│   │   └── Settings.tsx              # Threshold + system config
│   ├── components/
│   │   ├── RiskGauge.tsx             # Animated probability gauge
│   │   ├── ShapWaterfall.tsx         # Custom SHAP bar chart
│   │   ├── InterventionCard.tsx      # AI-suggested action cards
│   │   ├── KanbanBoard.tsx           # DnD task board
│   │   └── AlertsTable.tsx           # Filterable alert list
│   ├── hooks/
│   │   ├── usePrediction.ts          # POST /predict + debounce
│   │   └── useSupabase.ts            # Supabase client + auth
│   └── store/
│       └── useAppStore.ts            # Zustand global state
│
├── 🗄️ supabase/
│   └── migrations/
│       └── 001_init.sql              # Full schema DDL + RLS policies
│
├── 📊 data/
│   └── raw/
│       └── HR-Employee-Attrition.csv # IBM HR dataset (source)
│
├── 📑 reports/
│   ├── eda/                          # EDA plots (PNG, 300 DPI)
│   ├── eval/                         # Evaluation plots
│   └── model_report.md               # Full metrics + SHAP analysis
│
├── 🧪 tests/
│   ├── e2e/                          # Playwright tests
│   └── api/                          # pytest API tests
│
├── 🐳 Dockerfile
├── 🐳 docker-compose.yml
├── ⚙️ .github/workflows/ci.yml
├── 🔐 .env.example
├── 📄 prompt.txt                     # Google AI Studio system prompt
├── 📄 SKILL.md                       # fullstack-analytics-builder spec
└── 📖 README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- Python 3.10+
- Docker (optional)
- Supabase account (free tier works)

### Option A — Local Development (Recommended for development)

```bash
# 1. Clone the repository
git clone https://github.com/Harrypatria/Awesome-fullstack-prediction-app-.git
cd Awesome-fullstack-prediction-app-

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase URL, anon key, and service role key

# 3. Install frontend dependencies
npm install

# 4. Install Python dependencies
pip install -r backend/requirements.txt

# 5. Run Supabase migrations
supabase db push    # or paste SQL from supabase/migrations/001_init.sql

# 6. Train the model (or use pre-trained model.pkl in /models)
python backend/train.py --data data/raw/HR-Employee-Attrition.csv

# 7. Start the FastAPI backend
uvicorn backend.main:app --reload --port 8000

# 8. Start the Vite frontend (new terminal)
npm run dev
# → Open http://localhost:5173
```

### Option B — Google Colab (No Installation)

Run the complete ML pipeline (Steps 1–4) without any local setup:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/13519TfQXrX-YwUWF_gIAnoM2mK_2CZAk?usp=sharing)

### Option C — Docker

```bash
# Build and start all services
docker-compose up --build

# Services:
#   Frontend:  http://localhost:5173
#   Backend:   http://localhost:8000
#   API Docs:  http://localhost:8000/docs
```

### Option D — VS Code Dev Container

1. Open project in VS Code
2. Install extensions: **ESLint**, **Prettier**, **Tailwind CSS IntelliSense**, **Python**
3. Run `npm run dev` in the integrated terminal
4. Use **Run and Debug** sidebar for Python FastAPI debugging

---

## 📡 API Reference

Full interactive docs available at `http://localhost:8000/docs` (Swagger UI).

### `POST /predict`

Predict attrition risk for a single employee.

**Request:**
```json
{
  "employee_ref": "EMP-001",
  "age": 34,
  "monthly_income": 5200,
  "job_satisfaction": 2,
  "years_at_company": 3,
  "over_time": true,
  "job_role": "Sales Executive",
  "department": "Sales",
  "stock_option_level": 0,
  "work_life_balance": 2
}
```

**Response:**
```json
{
  "employee_id": "EMP-001",
  "attrition_probability": 0.82,
  "risk_level": "HIGH",
  "top_risk_factors": [
    { "feature": "OverTime", "impact": 0.31, "direction": "increases" },
    { "feature": "MonthlyIncome", "impact": 0.24, "direction": "increases" },
    { "feature": "StockOptionLevel", "impact": 0.14, "direction": "increases" }
  ],
  "suggested_interventions": [
    "Implement flexible work arrangements / OT cap policy",
    "Conduct compensation benchmarking & equity refresh",
    "Review equity participation eligibility"
  ],
  "prediction_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

### `POST /batch-predict`

Accepts up to 500 employees as a list. Returns same structure per employee.

### `GET /model-metrics`

Returns current model version, AUC-ROC, F1, precision, recall, training date.

### `GET /health`

```json
{ "status": "ok", "model_loaded": true, "version": "1.0.0" }
```

---

## ⭐ Stars History

[![Star History Chart](https://api.star-history.com/svg?repos=Harrypatria/Awesome-fullstack-prediction-app-&type=Date)](https://star-history.com/#Harrypatria/Awesome-fullstack-prediction-app-&Date)

---

## 🤝 Contributing

Contributions are welcome! This project follows the [fullstack-analytics-builder](./SKILL.md) skill spec — please read it before submitting a PR.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Make changes (TypeScript strict, no `any`; Pydantic v2, no bare `except`)

# 4. Run tests
npm run test          # Vitest unit tests
pytest tests/api/     # FastAPI tests
npx playwright test   # E2E tests

# 5. Commit with conventional commits
git commit -m "feat: add SHAP beeswarm to model insights page"

# 6. Push and open a Pull Request
git push origin feature/your-feature-name
```

**PR Checklist:**
- [ ] TypeScript strict mode, no `any` types
- [ ] All secrets in `.env`, none in source
- [ ] Loading, error, and empty states in every UI component
- [ ] Playwright E2E test for new user flows
- [ ] `SKILL.md` compliance (stack defaults, phase structure)

---

## 📄 License

Distributed under the **Apache-2.0 License**. See [`LICENSE`](./LICENSE) for details.

---

## 👤 Author

<div align="center">

**Dr. Harry Patria**
*Chief Data & AI Officer | Patria & Co. | Principal AI Engineer | i-Vigilant Technologies*

[![GitHub](https://img.shields.io/badge/GitHub-Harrypatria-181717?logo=github)](https://github.com/Harrypatria)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-harrypatria-0077B5?logo=linkedin)](https://www.linkedin.com/in/harrypatria/)
[![Patria & Co.](https://img.shields.io/badge/Patria%20%26%20Co.-patriaco.co.uk-FF6B35)](https://www.patriaco.co.uk)

*Indonesia's first AI consultancy. Building production-grade AI systems for energy, finance, and public sector.*

---

**If this project helped you, please give it a ⭐ — it helps others discover it.**

[![GitHub Follow](https://img.shields.io/github/followers/Harrypatria?style=social)](https://github.com/Harrypatria?tab=followers)

</div>