"use client";

import { useState } from "react";
import { Mic, Stop, Upload, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { noteTypes } from "@/lib/note-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecordingPanel() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedNoteType, setSelectedNoteType] = useState("");

  const startRecording = () => {
    setIsRecording(true);
    // Implement recording logic
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Implement stop recording logic
  };

  const handleUpload = () => {
    // Implement file upload logic
  };

  const generateTemplate = () => {
    // Implement template generation logic
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Start Recording</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select value={selectedNoteType} onValueChange={setSelectedNoteType}>
          <SelectTrigger>
            <SelectValue placeholder="Select note type" />
          </SelectTrigger>
          <SelectContent>
            {noteTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex justify-center space-x-4">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="icon"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <Stop className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleUpload}>
            <Upload className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Transcript</label>
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Transcribed text will appear here..."
            rows={4}
          />
        </div>

        <Button className="w-full" onClick={generateTemplate}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Template
        </Button>

        <div className="space-y-2">
          <label className="text-sm font-medium">Chat with Daisy</label>
          <Textarea placeholder="Type your message here..." rows={3} />
          <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}