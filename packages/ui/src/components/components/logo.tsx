import { Squirrel } from 'lucide-react';

export function Logo(props: { name?: string }) {
	const { name } = props;
	return (
		<>
			<div className="shrink-0 rounded-md bg-primary p-1">
				<Squirrel className="size-5 text-secondary" />
			</div>
			<span className="font-semibold">{name ? name : '组件展示'}</span>
		</>
	);
}
