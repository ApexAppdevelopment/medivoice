"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Scribe {
  id: string;
  noteType: string;
  transcription: string;
  template: string;
  timestamp: string;
}

export function ScribeList() {
  const [scribes, setScribes] = useState<Scribe[]>([]);

  useEffect(() => {
    const scribeRef = ref(database, 'templates');
    const unsubscribe = onValue(scribeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const scribesArray = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          ...value,
        }));
        setScribes(scribesArray.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card className="h-[calc(100vh-6rem)]">
      <CardHeader>
        <CardTitle>Generated Scribes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-4">
            {scribes.map((scribe) => (
              <Card key={scribe.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{scribe.noteType}</h3>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(scribe.timestamp), "PPp")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {scribe.template}
                </p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}