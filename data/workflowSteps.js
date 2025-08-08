import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const workflowSteps = [
  
  {
    title: "Build Job-Ready Documents",
    description: "Generate polished, ATS-friendly resumes and cover letters.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Get Started with Your Profile",
    description: "Tell us about your background to tailor your career path.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Measure Your Progress",
    description: "Track growth and readiness with performance insights.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
  {
    title: "Practice Real-World Interviews",
    description: "Use AI simulations to rehearse and refine your responses.",
    icon: <Users className="w-8 h-8 text-primary" />,
  }
];
