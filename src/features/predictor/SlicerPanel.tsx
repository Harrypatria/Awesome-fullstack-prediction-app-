import React from "react";
import { AttritionData } from "../../types/attrition";
import { FEATURE_GROUPS, CATEGORICAL_OPTIONS, NUMERICAL_CONFIG, FEATURE_DESCRIPTIONS } from "../../constants";
import { Slider } from "../../components/ui/Slider";
import { Switch } from "../../components/ui/Switch";
import { Label } from "@radix-ui/react-label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/Accordion";
import { 
  ChevronDown, 
  HelpCircle, 
  User, 
  Briefcase, 
  DollarSign, 
  Wind, 
  History 
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/Tooltip";

interface SlicerPanelProps {
  data: AttritionData;
  onChange: (data: AttritionData) => void;
}

const GROUP_ICONS: Record<string, React.ReactNode> = {
  Demographics: <User className="h-4 w-4" />,
  "Job & Role": <Briefcase className="h-4 w-4" />,
  "Compensation & Benefits": <DollarSign className="h-4 w-4" />,
  "Work Environment": <Wind className="h-4 w-4" />,
  "History & Performance": <History className="h-4 w-4" />
};

export function SlicerPanel({ data, onChange }: SlicerPanelProps) {
  const handleNumericalChange = (name: keyof AttritionData, value: number[]) => {
    onChange({ ...data, [name]: value[0] });
  };

  const handleCategoricalChange = (name: keyof AttritionData, value: string) => {
    onChange({ ...data, [name]: value });
  };

  const handleBooleanChange = (name: keyof AttritionData, checked: boolean) => {
    onChange({ ...data, [name]: checked ? "Yes" : "No" });
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-6 border-b border-slate-100 shrink-0">
        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Employee Profile</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Simulation Parameters</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <Accordion type="multiple" defaultValue={["Demographics"]} className="w-full space-y-3">
          {Object.entries(FEATURE_GROUPS).map(([group, features]) => (
            <AccordionItem key={group} value={group} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <AccordionTrigger className="flex w-full items-center justify-between p-4 text-sm font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm text-purple-600">
                    {GROUP_ICONS[group]}
                  </div>
                  {group}
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 opacity-40" />
              </AccordionTrigger>
              <AccordionContent className="p-5 space-y-8 bg-white">
                {features.map((feature) => {
                  const isCategorical = feature in CATEGORICAL_OPTIONS;
                  const isBoolean = feature === "OverTime";
                  const isNumerical = feature in NUMERICAL_CONFIG;
                  const description = FEATURE_DESCRIPTIONS[feature] || "No description available.";

                  const LabelWithTooltip = () => (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{feature}</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-slate-300 hover:text-purple-500 transition-colors">
                            <HelpCircle className="h-3 w-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[200px]">
                          <p className="text-[10px] font-medium leading-relaxed">{description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );

                  if (isBoolean) {
                    return (
                      <div key={feature} className="flex items-center justify-between group">
                        <LabelWithTooltip />
                        <Switch
                          checked={data[feature as keyof AttritionData] === "Yes"}
                          onCheckedChange={(checked) => handleBooleanChange(feature as keyof AttritionData, checked)}
                        />
                      </div>
                    );
                  }

                  if (isCategorical) {
                    return (
                      <div key={feature} className="space-y-1 group">
                        <LabelWithTooltip />
                        <select
                          className="w-full p-3 text-xs font-bold border border-slate-100 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none cursor-pointer"
                          value={data[feature as keyof AttritionData] as string}
                          onChange={(e) => handleCategoricalChange(feature as keyof AttritionData, e.target.value)}
                        >
                          {CATEGORICAL_OPTIONS[feature as keyof typeof CATEGORICAL_OPTIONS].map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (isNumerical) {
                    const config = NUMERICAL_CONFIG[feature as keyof typeof NUMERICAL_CONFIG];
                    return (
                      <div key={feature} className="space-y-4 group">
                        <div className="flex justify-between items-end">
                          <LabelWithTooltip />
                          <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                            {data[feature as keyof AttritionData]}
                          </span>
                        </div>
                        <Slider
                          min={config.min}
                          max={config.max}
                          step={config.step}
                          value={[data[feature as keyof AttritionData] as number]}
                          onValueChange={(val) => handleNumericalChange(feature as keyof AttritionData, val)}
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
