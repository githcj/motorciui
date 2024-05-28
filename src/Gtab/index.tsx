import React, { useEffect, useState } from 'react';
import './index.less';
/**
 * tabs切换
 * @param {string} activeKey 默认选中的tab
 * @param {(activeKey)=>void} onChange 选中发生变化
 * @param {Array<{title: string, key: number|string}, red?:boolean>} tabs 分页名称
 */
export default function ({
  activeKey,
  onChange,
  tabs,
}: {
  activeKey?: string | number;
  onChange?: (_key: string | number) => void;
  tabs: Array<{
    title: string;
    key: number | string;
    red?: boolean;
    show?: boolean;
  }>;
}) {
  const [ak, setAk] = useState<string | number>('');
  useEffect(() => {
    if (activeKey || activeKey === 0) {
      setAk(activeKey);
    } else {
      setAk(tabs[0].key);
    }
    if (
      (activeKey || activeKey === 0) &&
      !tabs.find((res) => res.show !== false && res.key === activeKey)
    ) {
      const key = tabs.find((res) => res.show !== false)?.key;
      if (onChange && key) onChange(key);
    }
  }, [activeKey]);
  return (
    <div className="g-tag-box">
      {tabs.map((res) =>
        res.show === false ? null : (
          <div
            aria-hidden="true"
            key={res.key}
            onClick={() => {
              setAk(res.key);
              if (onChange) onChange(res.key);
            }}
            className={`${ak === res.key ? 'active' : ''} ${
              res.red ? 'red' : ''
            }`}
          >
            {res.title}
          </div>
        ),
      )}
    </div>
  );
}
