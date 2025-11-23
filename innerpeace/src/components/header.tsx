'use client';

import { Button } from '@/components/ui/button';
import { LogOut, Wind } from 'lucide-react';

interface HeaderProps {
    onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold font-headline text-foreground">
                InnerPeace
            </h1>
        </div>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
