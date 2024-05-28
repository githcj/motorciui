---
group:
  title: 基础
---

# Gtab

```jsx
import { Gtab } from 'motorcui';
import { useState } from 'react';

export default () => {
  const [isPlatform, setIsPlatform] = useState('1');
  return (
    <>
      <Gtab
        onChange={(key) => {
          setIsPlatform(key);
        }}
        tabs={[
          {
            title: '视频',
            key: '1',
            // show: judgingRight('F', 130110100),
          },
          {
            title: '题库',
            key: '2',
            // show: judgingRight('F', 130110110),
          },
        ]}
      />
      {isPlatform == '1' ? '视频' : '题目'}
    </>
  );
};
```
