import * as React from "react"
import { cn } from "@/lib/utils"

const Select = ({ children, name, onValueChange, ...props }: any) => {
    return <div {...props}>{children}</div>
}

const SelectTrigger = ({ children, className, ...props }: any) => {
    return (
        <button className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
            {children}
        </button>
    )
}

const SelectValue = ({ placeholder, ...props }: any) => {
    return <span {...props}>{placeholder}</span>
}

const SelectContent = ({ children, ...props }: any) => {
    return <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80" {...props}>{children}</div>
}

const SelectItem = ({ children, value, ...props }: any) => {
    return <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" {...props}>{children}</div>
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
