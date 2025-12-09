'use client';

import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import type * as React from 'react';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/index';
import { cn } from '@/lib/utils';
import { type Binds, Tweakpane } from './tweakpane';

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	tweakpane?: React.ReactNode;
}

// biome-ignore lint: false positive
function unwrapValues(obj: Record<string, any>): Record<string, any> {
	if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
		if ('value' in obj) {
			return obj.value;
		}
		// biome-ignore lint: false positive
		const result: Record<string, any> = {};
		for (const key in obj) {
			if (Object.hasOwn(obj, key)) {
				result[key] = unwrapValues(obj[key]);
			}
		}
		return result;
	}
	return obj;
}

export const ComponentWrapper = ({
	className,
	name,
}: ComponentWrapperProps) => {
	const [tweakMode, setTweakMode] = useState(false);

	const isMobile = useIsMobile();

	const [binds, setBinds] = useState<Binds | null>(null);
	const [initBinds, setInitBinds] = useState<Binds | null>(null);
	const [componentProps, setComponentProps] = useState<Record<
		string,
		unknown
	> | null>(null);

	const preview = useMemo(() => {
		const ChildrenComp = (() => {
			const LazyComp = lazy(async () => {
				const componentMod = await import(`@/components/ui/${name}/demo.tsx`);
				if (!binds) {
					setInitBinds(componentMod?.demoProps);
					setBinds(componentMod?.demoProps);
				}
				const exportName =
					Object.keys(componentMod).find(
						(key) =>
							typeof componentMod[key] === 'function' ||
							typeof componentMod[key] === 'object',
					) || '';
				const Comp = componentMod.default || componentMod[exportName];

				return { default: Comp };
			});
			return LazyComp;
		})();

		if (!ChildrenComp) {
			console.error(`Component with name "${name}" not found in registry.`);
			return (
				<p className="text-sm text-muted-foreground">
					Component{' '}
					<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
						{name}
					</code>{' '}
					not found in registry.
				</p>
			);
		}

		return <ChildrenComp {...(componentProps ?? {})} />;
	}, [name, componentProps, binds]);

	useEffect(() => {
		if (!binds) return;
		setComponentProps(unwrapValues(binds));
	}, [binds]);

	return (
		<div className="bg-accent rounded-xl p-1.5">
			<motion.div
				id="component-wrapper"
				className={cn(
					'max-w-screen relative rounded-md bg-background flex flex-col md:flex-row',
					className,
				)}
			>
				<motion.div className="relative size-full flex-1">
					<div className="absolute top-3 right-3 z-9 bg-background flex items-center justify-end gap-2 p-1 rounded-[11px]">
						<Button
							onClick={() => setBinds(initBinds)}
							className="flex items-center rounded-lg"
							size="icon-sm"
						>
							<RotateCcw aria-label="restart-btn" size={14} />
						</Button>

						{binds && (
							<Button
								onClick={() => setTweakMode((prev) => !prev)}
								className="flex items-center rounded-lg"
								size="icon-sm"
							>
								<SlidersHorizontal aria-label="tweak-btn" size={14} />
							</Button>
						)}
					</div>
					<div className="flex min-h-[400px] w-full items-center justify-center px-10 py-16">
						<Suspense
							fallback={
								<div className="flex items-center text-sm text-muted-foreground">
									Loading...
								</div>
							}
						>
							{preview}
						</Suspense>
					</div>
				</motion.div>
				<motion.div
					initial={false}
					animate={{
						width: isMobile ? '100%' : tweakMode ? '250px' : '0px',
						height: isMobile ? (tweakMode ? '250px' : '0px') : 'auto',
						opacity: tweakMode ? 1 : 0,
					}}
					transition={{
						type: 'spring',
						stiffness: 300,
						damping: 30,
						restDelta: 0.01,
					}}
					className="relative"
				>
					<div className="absolute inset-0 overflow-y-auto">
						{binds && <Tweakpane binds={binds} onBindsChange={setBinds} />}
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default ComponentWrapper;
