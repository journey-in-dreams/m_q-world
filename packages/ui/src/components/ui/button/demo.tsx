import { Button, ButtonRipples } from './index';

const buttonVariant = {
	default: 'default',
	accent: 'accent',
	destructive: 'destructive',
	outline: 'outline',
	secondary: 'secondary',
	ghost: 'ghost',
	link: 'link',
};

const buttonSize = {
	default: 'default',
	sm: 'sm',
	lg: 'lg',
	icon: 'icon',
	'icon-sm': 'icon-sm',
	'icon-lg': 'icon-lg',
};

type ButtonDemoProps = {
	Button: {
		variant: keyof typeof buttonVariant;
		size: keyof typeof buttonSize;
	};
};

export const demoProps = {
	Button: {
		variant: {
			value: 'default',
			options: buttonVariant,
		},
		size: {
			value: 'default',
			options: buttonSize,
		},
	},
};

export const ButtonDemo = (props: ButtonDemoProps) => {
	const { Button: ButtonPropsInfo } = props;
	return (
		<Button {...ButtonPropsInfo}>
			Button
			<ButtonRipples />
		</Button>
	);
};

export default ButtonDemo;
