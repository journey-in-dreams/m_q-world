'use client';

import { Slot, type WithAsChild } from '@ui/components/ui/components/slot';
import { getStrictContext } from '@ui/lib';
import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'motion/react';
import * as React from 'react';

type Ripple = {
	id: number;
	x: number;
	y: number;
};

type RippleButtonContextType = {
	ripples: Ripple[];
	setRipples: (ripples: Ripple[]) => void;
};

const [RippleButtonProvider, useRippleButton] =
	getStrictContext<RippleButtonContextType>('RippleButtonContext');

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				accent: 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const rippleButtonVariants = {
	default: '[--ripple-button-ripple-color:var(--primary-foreground)]',
	accent: '[--ripple-button-ripple-color:var(--accent-foreground)]',
	destructive: '[--ripple-button-ripple-color:var(--destructive-foreground)]',
	outline: '[--ripple-button-ripple-color:var(--foreground)]',
	secondary: '[--ripple-button-ripple-color:var(--secondary-foreground)]',
	ghost: '[--ripple-button-ripple-color:var(--foreground)]',
	link: '[--ripple-button-ripple-color:var(--primary-foreground)]',
};

type ButtonRipplesProps = WithAsChild<
	HTMLMotionProps<'span'> & {
		color?: string;
		scale?: number;
	}
>;

function ButtonRipples({
	color = 'var(--ripple-button-ripple-color)',
	scale = 10,
	transition = { duration: 0.6, ease: 'easeOut' },
	asChild = false,
	style,
	...props
}: ButtonRipplesProps) {
	const { ripples } = useRippleButton();

	const Component = asChild ? Slot : motion.span;

	return ripples.map((ripple) => (
		<Component
			key={ripple.id}
			initial={{ scale: 0, opacity: 0.5 }}
			animate={{ scale, opacity: 0 }}
			transition={transition}
			style={{
				position: 'absolute',
				borderRadius: '50%',
				pointerEvents: 'none',
				width: '20px',
				height: '20px',
				backgroundColor: color,
				top: ripple.y - 10,
				left: ripple.x - 10,
				...style,
			}}
			{...props}
		/>
	));
}

type ButtonProps = WithAsChild<
	HTMLMotionProps<'button'> & {
		hoverScale?: number;
		tapScale?: number;
	}
> &
	VariantProps<typeof buttonVariants>;

function Button({
	ref,
	className,
	variant,
	size,
	hoverScale = 1.05,
	tapScale = 0.95,
	asChild = false,
	style,
	onClick,
	...props
}: ButtonProps) {
	const [ripples, setRipples] = React.useState<Ripple[]>([]);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

	const createRipple = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const button = buttonRef.current;
			if (!button) return;

			const rect = button.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			const newRipple: Ripple = {
				id: Date.now(),
				x,
				y,
			};

			setRipples((prev) => [...prev, newRipple]);

			setTimeout(() => {
				setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
			}, 600);
		},
		[],
	);

	const handleClick = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			createRipple(event);
			if (onClick) {
				onClick(event);
			}
		},
		[createRipple, onClick],
	);

	const Comp = asChild ? Slot : motion.button;

	return (
		<RippleButtonProvider value={{ ripples, setRipples }}>
			<Comp
				ref={buttonRef}
				data-slot="ripple-button"
				onClick={handleClick}
				whileTap={{ scale: tapScale }}
				whileHover={{ scale: hoverScale }}
				style={{
					position: 'relative',
					overflow: 'hidden',
					...style,
				}}
				className={cn(
					buttonVariants({ variant, size, className }),
					rippleButtonVariants[variant as keyof typeof rippleButtonVariants],
				)}
				{...props}
			/>
		</RippleButtonProvider>
	);
}

export { Button, type ButtonProps, ButtonRipples, type ButtonRipplesProps };
