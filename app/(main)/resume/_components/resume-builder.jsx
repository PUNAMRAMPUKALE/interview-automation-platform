// app/(main)/resume/_components/resume-builder.jsx
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";           // ✅ client hook OK here
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save } from "lucide-react";

export default function ResumeBuilder({ initialContent }) {
  const { user } = useUser();
  const [previewContent, setPreviewContent] = useState(initialContent);
  const [resumeMode, setResumeMode] = useState("preview");
  const [activeTab, setActiveTab] = useState("edit");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent || initialContent);
    }
  }, [formValues, activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (saveResult && !isSaving) toast.success("Resume saved successfully!");
    if (saveError) toast.error(saveError.message || "Failed to save resume");
  }, [saveResult, saveError, isSaving]);

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent || "");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin) parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    const name = user?.fullName || user?.username || "Your Name";

    return parts.length
      ? `## <div align="center">${name}</div>\n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : `## <div align="center">${name}</div>`;
  };

  const entriesToSection = (entries, title) =>
    entries?.length ? entriesToMarkdown(entries, title) : "";

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToSection(experience, "Work Experience"),
      entriesToSection(education, "Education"),
      entriesToSection(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // your html2pdf code here (client-side)
      console.log("ClickedDownload");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div data-color-mode="light" className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">Resume Builder</h1>
        <div className="space-x-2">
          <Button variant="destructive" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : (<><Save className="h-4 w-4" />Save</>)}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (<><Loader2 className="h-4 w-4 animate-spin" />Generating PDF...</>) : (<><Download className="h-4 w-4" />Download PDF</>)}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          {/* form fields... keep your existing JSX exactly as you had it */}
        </TabsContent>

        <TabsContent value="preview">
          {/* preview & editor... keep your existing JSX exactly as you had it */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
