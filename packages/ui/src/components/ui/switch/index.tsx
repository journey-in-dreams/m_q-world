'use client';

import { useControlledState } from '@ui/hooks';
import { getStrictContext } from '@ui/lib';
import { cn } from '@ui/lib/utils';
import {
	type HTMLMotionProps,
	motion,
	type TargetAndTransition,
	type VariantLabels,
} from 'motion/react';
import { Switch as SwitchPrimitives } from 'radix-ui';
import * as React from 'react';

type SwitchContextType = {
	isChecked: boolean;
	setIsChecked: (isChecked: boolean) => void;
	isPressed: boolean;
	setIsPressed: (isPressed: boolean) => void;
};

const [SwitchProvider, useSwitch] =
	getStrictContext<SwitchContextType>('SwitchContext');

type SwitchPrimitiveProps = Omit<
	React.ComponentProps<typeof SwitchPrimitives.Root>,
	'asChild'
> &
	HTMLMotionProps<'button'>;

function SwitchPrimitive(props: SwitchPrimitiveProps) {
	const [isPressed, setIsPressed] = React.useState(false);
	const [isChecked, setIsChecked] = useControlledState({
		value: props.checked,
		defaultValue: props.defaultChecked,
		onChange: props.onCheckedChange,
	});

	return (
		<SwitchProvider
			value={{ isChecked, setIsChecked, isPressed, setIsPressed }}
		>
			<SwitchPrimitives.Root {...props} onCheckedChange={setIsChecked} asChild>
				<motion.button
					data-slot="switch"
					whileTap="tap"
					initial={false}
					onTapStart={() => setIsPressed(true)}
					onTapCancel={() => setIsPressed(false)}
					onTap={() => setIsPressed(false)}
					{...props}
				/>
			</SwitchPrimitives.Root>
		</SwitchProvider>
	);
}

type SwitchThumbProps = Omit<
	React.ComponentProps<typeof SwitchPrimitives.Thumb>,
	'asChild'
> &
	HTMLMotionProps<'div'> & {
		pressedAnimation?: TargetAndTransition | VariantLabels | boolean;
	};

function SwitchThumb({
	pressedAnimation,
	transition = { type: 'spring', stiffness: 300, damping: 25 },
	...props
}: SwitchThumbProps) {
	const { isPressed } = useSwitch();

	return (
		<SwitchPrimitives.Thumb asChild>
			<motion.div
				data-slot="switch-thumb"
				whileTap="tab"
				layout
				transition={transition}
				animate={isPressed ? pressedAnimation : undefined}
				{...props}
			/>
		</SwitchPrimitives.Thumb>
	);
}

type SwitchIconPosition = 'left' | 'right' | 'thumb';

type SwitchIconProps = HTMLMotionProps<'div'> & {
	position: SwitchIconPosition;
};

function SwitchIcon({
	position,
	transition = { type: 'spring', bounce: 0 },
	...props
}: SwitchIconProps) {
	const { isChecked } = useSwitch();

	const isAnimated = React.useMemo(() => {
		if (position === 'right') return !isChecked;
		if (position === 'left') return isChecked;
		if (position === 'thumb') return true;
		return false;
	}, [position, isChecked]);

	return (
		<motion.div
			data-slot={`switch-${position}-icon`}
			animate={isAnimated ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={transition}
			{...props}
		/>
	);
}

type SwitchProps = SwitchPrimitiveProps & {
	pressedWidth?: number;
	startIcon?: React.ReactElement;
	endIcon?: React.ReactElement;
	thumbIcon?: React.ReactElement;
};

function Switch({
	className,
	pressedWidth = 19,
	startIcon,
	endIcon,
	thumbIcon,
	...props
}: SwitchProps) {
	return (
		<SwitchPrimitive
			className={cn(
				'relative peer focus-visible:border-ring focus-visible:ring-ring/50 flex h-5 w-8 px-px shrink-0 items-center justify-start rounded-full border border-transparent shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 data-[state=checked]:justify-end',
				className,
			)}
			{...props}
		>
			<SwitchThumb
				className={cn(
					'relative z-10 bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0',
				)}
				pressedAnimation={{ width: pressedWidth }}
			>
				{thumbIcon && (
					<SwitchIcon
						position="thumb"
						className="absolute [&_svg]:size-[9px] left-1/2 top-1/2 -translate-1/2 dark:text-neutral-500 text-neutral-400"
					>
						{thumbIcon}
					</SwitchIcon>
				)}
			</SwitchThumb>

			{startIcon && (
				<SwitchIcon
					position="left"
					className="absolute [&_svg]:size-[9px] left-0.5 top-1/2 -translate-y-1/2 dark:text-neutral-500 text-neutral-400"
				>
					{startIcon}
				</SwitchIcon>
			)}
			{endIcon && (
				<SwitchIcon
					position="right"
					className="absolute [&_svg]:size-[9px] right-0.5 top-1/2 -translate-y-1/2 dark:text-neutral-400 text-neutral-500"
				>
					{endIcon}
				</SwitchIcon>
			)}
		</SwitchPrimitive>
	);
}

export { Switch, useSwitch, type SwitchProps };
