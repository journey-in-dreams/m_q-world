'use client';

import { useControlledState } from '@ui/hooks';
import { getStrictContext } from '@ui/lib';
import { cn } from '@ui/lib/utils';
import { XIcon } from 'lucide-react';
import { AnimatePresence, type HTMLMotionProps, motion } from 'motion/react';
import { Dialog as SheetPrimitive } from 'radix-ui';

import type * as React from 'react';

type SheetContextType = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

const [SheetProvider, useSheet] =
	getStrictContext<SheetContextType>('SheetContext');

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

function Sheet(props: SheetProps) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props.open,
		defaultValue: props.defaultOpen,
		onChange: props.onOpenChange,
	});

	return (
		<SheetProvider value={{ isOpen, setIsOpen }}>
			<SheetPrimitive.Root
				data-slot="sheet"
				{...props}
				onOpenChange={setIsOpen}
			/>
		</SheetProvider>
	);
}

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

function SheetTrigger(props: SheetTriggerProps) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

function SheetClose(props: SheetCloseProps) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>;

function SheetPortal(props: SheetPortalProps) {
	const { isOpen } = useSheet();

	return (
		<AnimatePresence>
			{isOpen && (
				<SheetPrimitive.Portal forceMount data-slot="sheet-portal" {...props} />
			)}
		</AnimatePresence>
	);
}

type SheetOverlayProps = Omit<
	React.ComponentProps<typeof SheetPrimitive.Overlay>,
	'asChild' | 'forceMount'
> &
	HTMLMotionProps<'div'>;

function SheetOverlay({
	transition = { duration: 0.2, ease: 'easeInOut' },
	className,
	...props
}: SheetOverlayProps) {
	return (
		<SheetPrimitive.Overlay asChild forceMount>
			<motion.div
				key="sheet-overlay"
				data-slot="sheet-overlay"
				initial={{ opacity: 0, filter: 'blur(4px)' }}
				animate={{ opacity: 1, filter: 'blur(0px)' }}
				exit={{ opacity: 0, filter: 'blur(4px)' }}
				transition={transition}
				className={cn('fixed inset-0 z-50 bg-black/50', className)}
				{...props}
			/>
		</SheetPrimitive.Overlay>
	);
}

type Side = 'top' | 'bottom' | 'left' | 'right';

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> &
	HTMLMotionProps<'div'> & {
		side?: Side;
		showCloseButton?: boolean;
	};

function SheetContent({
	side = 'right',
	transition = { type: 'spring', stiffness: 150, damping: 22 },
	style,
	showCloseButton = true,
	className,
	...props
}: SheetContentProps) {
	const axis = side === 'left' || side === 'right' ? 'x' : 'y';

	const offscreen: Record<Side, { x?: string; y?: string; opacity: number }> = {
		right: { x: '100%', opacity: 0 },
		left: { x: '-100%', opacity: 0 },
		top: { y: '-100%', opacity: 0 },
		bottom: { y: '100%', opacity: 0 },
	};

	const positionStyle: Record<Side, React.CSSProperties> = {
		right: { insetBlock: 0, right: 0 },
		left: { insetBlock: 0, left: 0 },
		top: { insetInline: 0, top: 0 },
		bottom: { insetInline: 0, bottom: 0 },
	};

	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				asChild
				forceMount
				className={cn(
					'bg-background fixed z-50 flex flex-col gap-4 shadow-lg',
					side === 'right' && 'h-full w-[350px] border-l',
					side === 'left' && 'h-full w-[350px] border-r',
					side === 'top' && 'w-full h-[350px] border-b',
					side === 'bottom' && 'w-full h-[350px] border-t',
					className,
				)}
				{...props}
			>
				<motion.div
					key="sheet-content"
					data-slot="sheet-content"
					data-side={side}
					initial={offscreen[side]}
					animate={{ [axis]: 0, opacity: 1 }}
					exit={offscreen[side]}
					style={{
						position: 'fixed',
						...positionStyle[side],
						...style,
					}}
					transition={transition}
				>
					{showCloseButton && (
						<SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
							<XIcon className="size-4" />
							<span className="sr-only">Close</span>
						</SheetClose>
					)}
				</motion.div>
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

type SheetHeaderProps = React.ComponentProps<'div'>;

function SheetHeader({ className, ...props }: SheetHeaderProps) {
	return (
		<div
			data-slot="sheet-header"
			className={cn('flex flex-col gap-1.5 p-4', className)}
			{...props}
		/>
	);
}

type SheetFooterProps = React.ComponentProps<'div'>;

function SheetFooter({ className, ...props }: SheetFooterProps) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn('mt-auto flex flex-col gap-2 p-4', className)}
			{...props}
		/>
	);
}

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

function SheetTitle({ className, ...props }: SheetTitleProps) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn('text-foreground font-semibold', className)}
			{...props}
		/>
	);
}

type SheetDescriptionProps = React.ComponentProps<
	typeof SheetPrimitive.Description
>;

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

export {
	useSheet,
	Sheet,
	SheetPortal,
	SheetOverlay,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
	type SheetProps,
	type SheetPortalProps,
	type SheetOverlayProps,
	type SheetTriggerProps,
	type SheetCloseProps,
	type SheetContentProps,
	type SheetHeaderProps,
	type SheetFooterProps,
	type SheetTitleProps,
	type SheetDescriptionProps,
};
