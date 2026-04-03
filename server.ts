import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock Prediction API (In a real app, this would call a Python script or Gemini)
  app.post("/api/predict", async (req, res) => {
    try {
      const data = req.body;
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simple heuristic for demo purposes (calibrated from notebook insights)
      let risk = 0.16;
      if (data.OverTime === "Yes") risk += 0.18;
      if (data.MonthlyIncome < 5000) risk += 0.12;
      if (data.JobSatisfaction < 2) risk += 0.14;
      if (data.WorkLifeBalance < 2) risk += 0.11;
      if (data.Age < 26) risk += 0.07;
      if (data.BusinessTravel === "Travel_Frequently") risk += 0.08;

      risk = Math.min(0.97, Math.max(0.02, risk));

      // Mock SHAP values
      const shapValues = [
        { feature: "OverTime", value: data.OverTime === "Yes" ? 0.18 : -0.05 },
        { feature: "MonthlyIncome", value: data.MonthlyIncome < 5000 ? 0.12 : -0.06 },
        { feature: "JobSatisfaction", value: data.JobSatisfaction < 2 ? 0.14 : -0.05 },
        { feature: "WorkLifeBalance", value: data.WorkLifeBalance < 2 ? 0.11 : -0.04 },
        { feature: "Age", value: data.Age < 26 ? 0.07 : -0.04 },
      ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

      res.json({
        prediction: risk > 0.5 ? "Yes" : "No",
        probability: risk,
        shapValues,
        baseValue: 0.16
      });
    } catch (error) {
      res.status(500).json({ error: "Prediction failed" });
    }
  });

  // Team Stats API
  app.get("/api/stats", (req, res) => {
    res.json({
      departmentAttrition: [
        { name: "Sales", attrition: 25, total: 100 },
        { name: "R&D", attrition: 12, total: 250 },
        { name: "HR", attrition: 18, total: 50 },
      ],
      jobRoleRisk: [
        { role: "Sales Rep", risk: 0.45 },
        { role: "Lab Tech", risk: 0.38 },
        { role: "Manager", risk: 0.12 },
        { role: "Research Director", risk: 0.08 },
        { role: "Manufacturing Director", risk: 0.15 },
      ],
      overtimeImpact: [
        { status: "Overtime", attritionRate: 0.31 },
        { status: "No Overtime", attritionRate: 0.10 },
      ],
      salaryDistribution: [
        { range: "1k-5k", count: 450, attrition: 120 },
        { range: "5k-10k", count: 600, attrition: 80 },
        { range: "10k-15k", count: 300, attrition: 30 },
        { range: "15k+", count: 120, attrition: 10 },
      ],
      globalShapValues: [
        { feature: "OverTime", importance: 0.22 },
        { feature: "MonthlyIncome", importance: 0.18 },
        { feature: "JobSatisfaction", importance: 0.15 },
        { feature: "StockOptionLevel", importance: 0.12 },
        { feature: "YearsAtCompany", importance: 0.10 },
        { feature: "WorkLifeBalance", importance: 0.09 },
        { feature: "Age", importance: 0.08 },
        { feature: "DistanceFromHome", importance: 0.06 },
      ],
      globalFeatureImpact: [
        { feature: "OverTime", riskIncrease: 0.25, riskDecrease: -0.03 },
        { feature: "MonthlyIncome", riskIncrease: 0.04, riskDecrease: -0.22 },
        { feature: "JobSatisfaction", riskIncrease: 0.02, riskDecrease: -0.18 },
        { feature: "StockOptionLevel", riskIncrease: 0.05, riskDecrease: -0.15 },
        { feature: "YearsAtCompany", riskIncrease: 0.08, riskDecrease: -0.12 },
        { feature: "WorkLifeBalance", riskIncrease: 0.03, riskDecrease: -0.10 },
        { feature: "Age", riskIncrease: 0.06, riskDecrease: -0.09 },
        { feature: "DistanceFromHome", riskIncrease: 0.07, riskDecrease: -0.02 },
      ]
    });
  });

  // In-memory state for Command Center
  let commandCenterData = {
    insights: [
      { id: "1", segment: "High-Potential Sales Reps", risk: 0.72, count: 12, driver: "Overtime & Low Stock Options" },
      { id: "2", segment: "Early Career R&D", risk: 0.58, count: 24, driver: "Distance from Home" },
      { id: "3", segment: "Mid-Level Managers", risk: 0.41, count: 8, driver: "Stalled Promotion" },
    ],
    triggers: [
      { id: "t1", name: "High Risk Alert", threshold: "> 60% Probability", status: "Active", recipient: "HR Business Partners" },
      { id: "t2", name: "Overtime Burnout", threshold: "Overtime = Yes AND Satisfaction < 2", status: "Active", recipient: "Department Heads" },
    ],
    decisions: [
      { id: "d1", insightId: "1", suggestion: "Implement Equity Refresh Program", impact: "High", cost: "Medium" },
      { id: "d2", insightId: "2", suggestion: "Hybrid Work Policy Expansion", impact: "Medium", cost: "Low" },
      { id: "d3", insightId: "3", suggestion: "Leadership Fast-Track Review", impact: "High", cost: "Low" },
    ],
    tasks: [
      { id: "tk1", title: "Review Sales Rep Equity", assignee: "Sarah Chen", deadline: "2026-04-15", status: "In Progress" },
      { id: "tk2", title: "R&D Commute Survey", assignee: "James Wilson", deadline: "2026-04-10", status: "Pending" },
    ]
  };

  // Command Center API
  app.get("/api/command-center", (req, res) => {
    res.json(commandCenterData);
  });

  app.post("/api/command-center/:type", (req, res) => {
    const { type } = req.params;
    const newItem = { ...req.body, id: Math.random().toString(36).substr(2, 9) };
    if (commandCenterData[type as keyof typeof commandCenterData]) {
      (commandCenterData[type as keyof typeof commandCenterData] as any[]).push(newItem);
      res.json(newItem);
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  });

  app.delete("/api/command-center/:type/:id", (req, res) => {
    const { type, id } = req.params;
    if (commandCenterData[type as keyof typeof commandCenterData]) {
      commandCenterData[type as keyof typeof commandCenterData] = (commandCenterData[type as keyof typeof commandCenterData] as any[]).filter(item => item.id !== id);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
