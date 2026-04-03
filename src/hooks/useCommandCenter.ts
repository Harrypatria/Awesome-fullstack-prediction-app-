import { useState, useEffect } from "react";

export interface CommandCenterData {
  insights: { id: string; segment: string; risk: number; count: number; driver: string }[];
  triggers: { id: string; name: string; threshold: string; status: string; recipient: string }[];
  decisions: { id: string; insightId: string; suggestion: string; impact: string; cost: string }[];
  tasks: { id: string; title: string; assignee: string; deadline: string; status: string }[];
}

export function useCommandCenter() {
  const [data, setData] = useState<CommandCenterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/command-center");
        if (!response.ok) throw new Error("Failed to fetch command center data");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load command center");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
