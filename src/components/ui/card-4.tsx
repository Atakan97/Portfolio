import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Stat {
  label: string;
  value: string | number;
}

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description: string;
  stats: Stat[];
  actionLabel: string;
  onActionClick?: () => void;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      title,
      description,
      stats,
      actionLabel,
      onActionClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-card/40 backdrop-blur-md text-card-foreground shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/10",
          className
        )}
        {...props}
      >
        {/* Card Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105 opacity-80"
          />
          {/* Gradient Overlay for seamless transition to dark content */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6 pt-2">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Stats Section */}
          <div className="my-6 grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg bg-white/5 p-3 text-center border border-white/5">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">{stat.label}</p>
                <p className="text-lg font-bold text-foreground/90 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button 
            onClick={onActionClick} 
            variant="outline" 
            className="w-full bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300"
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
