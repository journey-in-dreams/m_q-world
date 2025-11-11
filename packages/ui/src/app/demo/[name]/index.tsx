import type { ReactElement, ReactNode } from 'react';

// blocks

// components

// ui
import { button } from '@/app/demo/[name]/ui/button';

interface Demo {
	name: string; // this must match the `registry.json` name
	components?: {
		[name: string]: ReactNode | ReactElement;
	};
}

export const demos: { [name: string]: Demo } = {
	// blocks

	// components

	// ui
	button,
};
