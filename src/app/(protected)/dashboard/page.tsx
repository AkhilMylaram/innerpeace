'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import MeditationCard from '@/components/meditation-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect } from 'react';

interface UserProfile {
  username: string;
  email: string;
}

const welcomeMessages = [
  "Looking great today!",
  "Hope you're doing well!",
  "This InnerPeace gives you peace.",
  "Ready to find your zen?",
  "Time for some mindful moments!",
  "Your peaceful journey continues.",
  "Breathe in calm, breathe out stress.",
  "Today is perfect for meditation.",
  "Let tranquility fill your soul.",
  "Embrace the serenity within you."
];

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [randomMessage, setRandomMessage] = useState('');

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userDocRef);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setRandomMessage(welcomeMessages[randomIndex]);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline text-foreground md:text-4xl">
          Welcome back, {userProfile?.username || 'friend'} 😊
        </h1>
        <p className="mt-2 text-lg text-muted-foreground md:text-xl">
          {randomMessage}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PlaceHolderImages.map((image) => (
            <MeditationCard
                key={image.id}
                id={image.id}
                title={image.description}
                imageUrl={image.imageUrl}
                imageHint={image.imageHint}
            />
        ))}
      </div>
    </div>
  );
}
