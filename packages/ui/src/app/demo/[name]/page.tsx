import { notFound } from 'next/navigation';

import { demos } from '@/app/demo/[name]/index';

import { getRegistryItem } from '@/lib/preview';

export async function generateStaticParams() {
	return Object.keys(demos).map((name) => ({
		name,
	}));
}

export default async function DemoPage({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	const component = getRegistryItem(name);

	if (!component || !demos[name]) {
		notFound();
	}

	const { components } = demos[name];

	return (
		<div className="flex h-screen w-full flex-col gap-4 bg-card">
			{components &&
				Object.entries(components).map(([key, node]) => (
					<div className="relative w-full" key={key}>
						{node}
					</div>
				))}
		</div>
	);
}
