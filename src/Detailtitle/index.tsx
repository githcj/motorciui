import React, { CSSProperties, memo } from 'react';
import './index.less';

/**
 * 详情页title样式
 * @param {string} text（标题）:string
 */
const Detailtitle = (props: { text: string; style?: CSSProperties }) => (
  <div style={props.style} className="detailTitle">
    <span>{props.text}</span>
  </div>
);

export default memo(Detailtitle);
