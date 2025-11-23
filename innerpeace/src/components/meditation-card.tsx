'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

interface MeditationCardProps {
  id: string;
  title: string;
  imageUrl: string;
  imageHint: string;
}

export default function MeditationCard({ id, title, imageUrl, imageHint }: MeditationCardProps) {
  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    data-ai-hint={imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <Button variant="default" size="icon" className="absolute bottom-4 right-4 rounded-full h-10 w-10">
                    <Play className="h-5 w-5 fill-primary-foreground" />
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
