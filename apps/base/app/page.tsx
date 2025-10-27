import styles from "./page.module.css";

import { Button } from "@mq/ui/button"

export default function Home() {
  return (
    <div className={styles.page}>
      测试页面
      <span className="inline-flex">111</span>
      <Button>测试UI组件</Button>
    </div>
  );
}
