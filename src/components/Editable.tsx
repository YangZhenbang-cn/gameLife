'use client';

import React from 'react';
import { useEditContext } from '@/context/EditContext';

interface EditableProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * 编辑模式下包裹可编辑内容：hover 高亮 + 点击触发弹窗
 */
export function Editable({
  children,
  onClick,
  className = '',
  style = {},
  as: Tag = 'span',
}: EditableProps) {
  const { isEditing } = useEditContext();

  if (!isEditing) {
    return React.createElement(Tag, { className, style }, children);
  }

  return React.createElement(
    Tag,
    {
      className: `${className} editable-area`,
      style: {
        ...style,
        cursor: 'pointer',
      },
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick();
      },
    },
    children
  );
}

/**
 * 编辑模式下包裹可编辑的块级内容
 */
export function EditableBlock({
  children,
  onClick,
  className = '',
  style = {},
}: EditableProps) {
  return Editable({ children, onClick, className, style, as: 'div' });
}
