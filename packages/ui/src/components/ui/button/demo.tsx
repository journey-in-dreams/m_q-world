import { Button, type ButtonProps } from './index';

export const demoProps = {
	Button: {
		variant: {
			value: 'default',
			options: {
				default: 'default',
				accent: 'accent',
				destructive: 'destructive',
				outline: 'outline',
				secondary: 'secondary',
				ghost: 'ghost',
				link: 'link',
			},
		},
		size: {
			value: 'default',
			options: {
				default: 'default',
				sm: 'sm',
				lg: 'lg',
				icon: 'icon',
				'icon-sm': 'icon-sm',
				'icon-lg': 'icon-lg',
			},
		},
	},
};

export const ButtonDemo = (props: ButtonProps) => {
	const { variant, size } = props;
	return (
		<Button variant={variant} size={size}>
			Button
		</Button>
	);
};

export default ButtonDemo;
