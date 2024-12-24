"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CreatePasteFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}

export function CreatePasteForm({ onSubmit, loading }: CreatePasteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [expiration, setExpiration] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      content,
      password_hash: isProtected ? password : null,
      expires_at: expiration && expiration !== "0" 
      ? new Date(Date.now() + parseInt(expiration) * 1000).toISOString() 
      : null,
      is_public: !isProtected,
    };
    await onSubmit(formData);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isProtected}
                onCheckedChange={setIsProtected}
                id="protected"
              />
              <Label htmlFor="protected">Password Protected</Label>
            </div>

            {isProtected && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={isProtected}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiration">Expiration</Label>
            <Select value={expiration} onValueChange={setExpiration}>
              <SelectTrigger>
                <SelectValue placeholder="Select expiration time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Never</SelectItem>
                <SelectItem value="3600">1 Hour</SelectItem>
                <SelectItem value="86400">1 Day</SelectItem>
                <SelectItem value="604800">1 Week</SelectItem>
                <SelectItem value="2592000">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Paste"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
