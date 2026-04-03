import { useState, useEffect } from "react";

export interface TeamStats {
  departmentAttrition: { name: string; attrition: number; total: number }[];
  jobRoleRisk: { role: string; risk: number }[];
  overtimeImpact: { status: string; attritionRate: number }[];
  salaryDistribution: { range: string; count: number; attrition: number }[];
  globalShapValues: { feature: string; importance: number }[];
  globalFeatureImpact: { feature: string; riskIncrease: number; riskDecrease: number }[];
}

export function useTeamStats() {
  const [stats, setStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch team stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load insights");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return { stats, loading, error };
}
