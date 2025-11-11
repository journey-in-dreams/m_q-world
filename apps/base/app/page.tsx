import { Button } from '@mq/ui/button';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<Button size="sm">测试按钮</Button>
		</div>
	);
}
