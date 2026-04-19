"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layers, Plus, Settings, Sparkles, User, LayoutDashboard, Monitor, Star } from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { SIDEBAR_SPACES } from "@/constants";

export function GlobalCommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search for spaces..." />
            <CommandList className="no-scrollbar">
                <CommandEmpty>No results found.</CommandEmpty>
                
                <CommandGroup heading="Your Spaces">
                    {SIDEBAR_SPACES.map(space => (
                        <CommandItem 
                            key={space.value} 
                            onSelect={() => runCommand(() => router.push(`/dashboard/${space.value.toLowerCase().replace(/\s+/g, '-')}`))}
                        >
                            <Layers className="mr-2 h-4 w-4 text-blue-500" />
                            <span>{space.label}</span>
                        </CommandItem>
                    ))}
                    <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/create-space"))} className="text-emerald-600 dark:text-[#65E3AD]">
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create New Space</span>
                    </CommandItem>
                </CommandGroup>
                
                <CommandSeparator />
                
                <CommandGroup heading="Quick Links">
                    <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                        <LayoutDashboard className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Dashboard Home</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => console.log("Inbox navigation"))}>
                        <Monitor className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Inbox</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => console.log("Integrations navigation"))}>
                        <Sparkles className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Integrations</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Settings">
                    <CommandItem onSelect={() => runCommand(() => console.log("Profile settings"))}>
                        <User className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Profile Settings</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => console.log("Workspace settings"))}>
                        <Settings className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Workspace Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
                
            </CommandList>
        </CommandDialog>
    );
}
