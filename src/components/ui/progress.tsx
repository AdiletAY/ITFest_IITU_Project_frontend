import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/services/Helpers';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-muted-foreground/30',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 ${
        value
          ? value < 60
            ? 'bg-destructive'
            : value < 75
            ? 'bg-yellow-300'
            : value < 80
            ? 'bg-primary'
            : 'bg-green-500'
          : null
      } transition-all`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
