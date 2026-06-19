'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { Briefcase, FileText, FolderGit2, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const commands = [
  {
    heading: 'Navigation',
    items: [
      {
        title: 'Go to Home',
        description: 'Navigate to the homepage',
        icon: Home,
        href: '/',
        shortcut: 'H',
      },
      {
        title: 'Go to Work',
        description: 'View work experience',
        icon: Briefcase,
        href: '/work-experience',
        shortcut: 'W',
      },
      {
        title: 'Go to Projects',
        description: 'Browse all projects',
        icon: FolderGit2,
        href: '/projects',
        shortcut: 'P',
      },
      {
        title: 'Go to Resume',
        description: 'View and download resume',
        icon: FileText,
        href: '/resume',
        shortcut: 'R',
      },
    ],
  },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Listen to custom event for clicking the search button
  useEffect(() => {
    const handleOpenSearch = () => setOpen(true);
    window.addEventListener('open-search', handleOpenSearch);
    return () => window.removeEventListener('open-search', handleOpenSearch);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {commands.map((group) => (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.items.map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => runCommand(() => router.push(item.href))}
                className="flex items-center gap-3 py-3"
              >
                <div className="border-border bg-background flex size-8 items-center justify-center rounded-md border">
                  <item.icon className="text-muted-foreground size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {item.description}
                  </span>
                </div>
                {item.shortcut && (
                  <CommandShortcut className="ml-auto">
                    {item.shortcut}
                  </CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
