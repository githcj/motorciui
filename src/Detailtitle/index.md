---
group:
  title: 基础
---

# Detailtitle

默认

```jsx
import { Detailtitle } from 'motorcui';

export default () => <Detailtitle text="默认" />;
```

自定义样式

```jsx
import { Detailtitle } from 'motorcui';

export default () => (
  <Detailtitle
    text="自定义样式"
    style={{
      background: 'var(--primary-color)',
      color: '#fff',
      width: '50%',
      '--main-bg-color': '#fff',
    }}
  />
);
```
