import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
    hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ glass = false, hover = false, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    glass ? 'glass-card' : 'card',
                    hover && (glass ? 'glass-card-hover' : 'card-hover'),
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
