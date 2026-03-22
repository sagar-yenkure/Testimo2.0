"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"

export function ProjectSwitcher({ spaces }: { spaces: { label: string; value: string }[] }) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("Space 1")
    const router = useRouter()
    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger >
                <Button variant="outline" className="w-[200px] h-10 justify-between bg-gray-50/40 dark:bg-[#0d0d10] text-gray-900 dark:text-white ">
                    {value}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0 bg-gray-50/40 dark:bg-[#0d0d10] ">
                <Command>
                    <CommandInput placeholder="Find Space..." />

                    <CommandList className="bg-gray-50/40 dark:bg-[#0d0d10] ">
                        <CommandEmpty>No space found.</CommandEmpty>

                        <CommandGroup >
                            {spaces.map((space) => (
                                <CommandItem
                                    key={space.value}
                                    value={space.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {space.label}
                                    <Check
                                        className={`ml-auto h-4 w-4 ${value === space.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => router.push("/dashboard/create")}
                                className="cursor-pointer"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Space
                            </CommandItem>
                        </CommandGroup>

                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}