'use client';

import { Card, CardContent } from '@/components/ui/card';

import type { Component } from '@/lib/preview';

interface ComponentCardProps {
	component: Component;
	baseUrl: string;
	prompt: string;
}

export function ComponentCard({ component }: ComponentCardProps) {
	return (
		<section>
			<Card id="starting-kit" className="border-foreground/25">
				<CardContent className="flex flex-col items-center justify-center gap-4 rounded-md h-[800px] px-6">
					<iframe
						id="iframe"
						src={`/demo/${component.name}`}
						className="h-full w-full"
						title="Page Preview"
					/>
				</CardContent>
			</Card>
		</section>
	);
}
