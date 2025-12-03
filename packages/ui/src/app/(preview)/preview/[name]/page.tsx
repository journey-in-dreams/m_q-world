import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ComponentWrapper } from '@/components/preview/component-wrapper';
import { Button } from '@/components/ui/button';
import registry from '@/lib/config.json';
import { getRegistryItem } from '@/lib/preview';

export async function generateStaticParams() {
	return registry.items.map(({ name }) => ({
		name,
	}));
}

export default async function RegistryItemPage({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;
	const component = getRegistryItem(name);

	if (!component) {
		notFound();
	}

	return (
		<div className="container p-5 md:p-10">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<Button variant="ghost" size="sm" asChild className="mb-4">
						<Link href="/">
							<ArrowLeft className="mr-2 size-4" />
							Back to Home
						</Link>
					</Button>
					<h1 className="font-bold text-3xl tracking-tight">
						{component.title}
					</h1>
				</div>
			</div>

			<ComponentWrapper name={name} />
		</div>
	);
}
