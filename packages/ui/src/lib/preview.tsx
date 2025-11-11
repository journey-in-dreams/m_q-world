import registry from '@/lib/config.json';

export interface Component {
	name: string;
	type: string;
	title: string;
	description?: string;
}

export function getRegistryItem(name: string): Component {
	const components = registry.items;

	const component = components.find(
		(item: { name: string }) => item.name === name,
	);

	if (component == null) {
		throw new Error(`Component "${name}" not found`);
	}

	return component;
}

export function getBlocks(): Component[] {
	return registry.items.filter((item) => item.type === 'block');
}
export function getComponents(): Component[] {
	return registry.items.filter((item) => item.type === 'component');
}
export function getUIPrimitives(): Component[] {
	return registry.items.filter((item) => item.type === 'ui');
}
