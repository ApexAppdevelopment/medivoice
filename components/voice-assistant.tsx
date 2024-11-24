"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioPlayerRef.current = new Audio();
    audioPlayerRef.current.addEventListener('ended', handleAudioEnded);
    
    return () => {
      audioPlayerRef.current?.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = handleRecordingStop;
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleRecordingStop = async () => {
    setIsProcessing(true);
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    
    try {
      // Convert speech to text using Deepgram
      const response = await fetch('https://api.deepgram.com/v1/listen', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/wav'
        },
        body: audioBlob
      });
      
      const data = await response.json();
      const transcript = data.results?.channels[0]?.alternatives[0]?.transcript;

      if (transcript) {
        // Get AI response using Together AI
        const aiResponse = await fetch('https://api.together.xyz/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOGETHER_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-2-70b-chat-hf",
            messages: [
              {
                role: "system",
                content: "You are Daisy, a medical assistant created by Aitek PH software. You help with scribing, note-taking, and medical documentation."
              },
              {
                role: "user",
                content: transcript
              }
            ],
            max_tokens: 150,
            temperature: 0.7
          })
        });

        const aiData = await aiResponse.json();
        const aiText = aiData.choices[0]?.message?.content;

        if (aiText) {
          // Convert AI response to speech using Neets.ai
          const ttsResponse = await fetch('https://api.neets.ai/v1/tts', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NEETS_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: aiText,
              voice_id: 'en-US-Neural2-F'
            })
          });

          const audioBlob = await ttsResponse.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          
          if (audioPlayerRef.current) {
            audioPlayerRef.current.src = audioUrl;
            audioPlayerRef.current.play();
          }
        }
      }
    } catch (error) {
      console.error('Error processing audio:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAudioEnded = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.play();
    }
  };

  return (
    <Card className="h-[calc(100vh-6rem)]">
      <CardHeader>
        <CardTitle>Voice Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <Button
          size="lg"
          variant={isRecording ? "destructive" : "default"}
          className="rounded-full w-24 h-24"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
        >
          {isRecording ? (
            <Square className="h-12 w-12" />
          ) : (
            <Mic className="h-12 w-12" />
          )}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {isRecording ? "Tap to stop recording" : 
           isProcessing ? "Processing..." : 
           "Tap to start speaking with Daisy"}
        </p>
      </CardContent>
    </Card>
  );
}