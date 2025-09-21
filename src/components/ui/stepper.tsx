
"use client"

import * as React from "react"
import { Check, Loader } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number
  steps: {
    title: string
    description?: string
  }[]
  isError?: boolean
  isLoading?: boolean
}

function Stepper({
  className,
  activeStep,
  steps,
  isError,
  isLoading,
  ...props
}: StepperProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[repeat(auto-fit,minmax(0,1fr))] justify-between gap-1",
        className
      )}
      {...props}
    >
      {steps.map((step, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <div
                className={cn(
                  "flex w-full items-center gap-4 transition-all",
                  i === 0 ? "justify-start" : "justify-end",
                  steps.length > 1 && i > 0 && i < steps.length - 1
                    ? "justify-between"
                    : ""
                )}
              >
                {i > 0 && <StepperSeparator active={activeStep >= i} />}
                <div className="flex items-center gap-2">
                  <StepperIndicator
                    active={activeStep > i}
                    done={activeStep > i}
                    error={isError && activeStep === i}
                    loading={isLoading && activeStep === i}
                  >
                    {activeStep > i ? <StepperCheck /> : <StepperNumber />}
                  </StepperIndicator>
                  <p
                    className={cn(
                      "hidden text-sm font-medium transition-all md:block",
                      activeStep === i
                        ? "text-primary"
                        : activeStep > i
                          ? "text-foreground"
                          : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                </div>
                {i < steps.length - 1 && steps.length > 2 && (
                  <StepperSeparator active={activeStep > i} />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm font-medium">{step.title}</p>
              {step.description && (
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

function StepperItem({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

const StepperSeparator = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "h-px w-full flex-1 bg-border transition-all",
      active ? "bg-primary" : ""
    )}
  />
)

const StepperIndicator = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    active: boolean
    done: boolean
    error: boolean
    loading: boolean
  }
>(({ children, active, done, error, loading }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold transition-all",
      error
        ? "border-destructive bg-destructive/20 text-destructive"
        : loading
          ? "border-primary/50 bg-primary/20 text-primary"
          : active
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground"
    )}
  >
    {loading ? <StepperLoader /> : done ? <StepperCheck /> : children}
  </div>
))

StepperIndicator.displayName = "StepperIndicator"

const StepperNumber = () => {
  const step = React.useContext(StepperItemContext)
  return <p>{step}</p>
}

const StepperCheck = () => <Check className="h-4 w-4" />

const StepperLoader = () => <Loader className="h-4 w-4 animate-spin" />

const StepperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-4 rounded-md border bg-background/50 p-4 data-[state=active]:block data-[state=inactive]:hidden",
      props.className
    )}
    {...props}
  />
))

StepperContent.displayName = "StepperContent"

const StepperItemContext = React.createContext(0)

export {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperIndicator,
  StepperNumber,
  StepperContent,
}

    