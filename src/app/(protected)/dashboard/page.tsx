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

const welcomeData = [
  {
    message: "You're absolutely glowing today! ✨",
    healthTip: "Start your day with warm lemon water to boost vitamin C and aid digestion."
  },
  {
    message: "Your positive energy is contagious! 🌟",
    healthTip: "Eat a handful of almonds for healthy fats and vitamin E to nourish your brain."
  },
  {
    message: "InnerPeace is flowing through you beautifully! 🧘‍♀️",
    healthTip: "Try green tea with honey - it's packed with antioxidants and natural energy."
  },
  {
    message: "You're radiating pure zen vibes! 🌸",
    healthTip: "Include blueberries in your breakfast for brain-boosting antioxidants."
  },
  {
    message: "Your mindful journey is truly inspiring! 🦋",
    healthTip: "Snack on walnuts for omega-3 fatty acids that support heart health."
  },
  {
    message: "Serenity looks amazing on you! 🌺",
    healthTip: "Add turmeric to your meals - it's a powerful anti-inflammatory spice."
  },
  {
    message: "Your inner light is shining bright! ☀️",
    healthTip: "Enjoy dark leafy greens like spinach for iron and folate nutrients."
  },
  {
    message: "Peace and tranquility suit you perfectly! 🕊️",
    healthTip: "Sip chamomile tea before bed for natural relaxation and better sleep."
  },
  {
    message: "You're embracing wellness wonderfully! 🌿",
    healthTip: "Eat an avocado for healthy monounsaturated fats and potassium."
  },
  {
    message: "Your calm presence is truly refreshing! 🌊",
    healthTip: "Try ginger tea to soothe digestion and reduce inflammation naturally."
  }
];

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [welcomeContent, setWelcomeContent] = useState({ message: '', healthTip: '' });

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userDocRef);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomeData.length);
    setWelcomeContent(welcomeData[randomIndex]);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline text-foreground md:text-4xl">
          Welcome back, {userProfile?.username || 'friend'}!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground md:text-xl">
          {welcomeContent.message}
        </p>
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="text-sm text-green-800 font-medium">💡 Health Tip:</p>
          <p className="text-sm text-green-700 mt-1">{welcomeContent.healthTip}</p>
        </div>
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
