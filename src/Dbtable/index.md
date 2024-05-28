---
group:
  title: 基础
---

# Dbtable

默认

```jsx
import { Dbtable } from 'motorcui';

export default () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Dbtable columns={columns} dataSource={dataSource} />;
};
```

### 实例

```
import DbTable from '@/components/DbTable';
import { getUserList } from '@/api';
const columns = []
const requestData = {} //额外参数
<DbTable rowKey='id' requestData={requestData} requestFun={getUserList}  columns={columns} scroll={{ y: '100%', x: 800 }} />
```
