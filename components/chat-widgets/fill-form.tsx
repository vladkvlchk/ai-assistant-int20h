"use client";

import React, { FC, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "../ui/card";

export interface IField {
  type: "text" | "email" | "password" | "textarea" | "select";
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  value?: string;
}

interface FillFormProps {
  title: string;
  fields: IField[];
  onChange?: (formData: Record<string, string>) => void;
}

const FillForm: FC<FillFormProps> = ({ title, fields, onChange }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialData: Record<string, string> = {};
    fields.forEach((field) => {
      initialData[field.name] = field.value ?? "";
    });
    setFormData(initialData);
    onChange?.(initialData);
  }, [fields]);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [fieldName]: value };
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <Card className="space-y-4 p-4 w-max">
      <h1>Ordering {title}</h1>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col space-y-1 w-[300px]">
          <Label htmlFor={field.name}>{field.label}</Label>

          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] ?? ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            />
          ) : field.type === "select" ? (
            <Select
              onValueChange={(value) => handleFieldChange(field.name, value)}
              value={formData[field.name] ?? ""}
            >
              <SelectTrigger id={field.name}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] ?? ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}
    </Card>
  );
};

export default FillForm;
