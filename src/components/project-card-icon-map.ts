
// src/components/project-card-icon-map.ts
import { ShoppingCart, Smartphone, Palette, PenTool, Briefcase, FileText, Cog, BarChart } from "lucide-react";

// Map icon names to Lucide components
export const iconMap: { [key: string]: React.ComponentType<any> } = {
  ShoppingCart,
  Smartphone,
  Palette,
  PenTool,
  Briefcase, // Default/generic
  FileText, // For content writing etc.
  Cog, // For technical projects
  BarChart, // For data/analytics projects
  // Add more icons as needed based on categories used in project data
};
