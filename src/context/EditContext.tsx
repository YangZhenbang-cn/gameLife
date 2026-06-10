'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ============================================================
// 编辑器类型
// ============================================================

export type EditorType = 'text' | 'textarea' | 'tags' | 'tasks' | 'timeline' | 'relationships' | 'assets';

export interface ModalData {
  type: EditorType;
  label: string;
  value: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (newValue: any) => void;
}

interface EditContextValue {
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  activeModal: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const EditContext = createContext<EditContextValue | null>(null);

export function useEditContext() {
  const ctx = useContext(EditContext);
  if (!ctx) {
    throw new Error('useEditContext must be used within <EditProvider>');
  }
  return ctx;
}

export function EditProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);

  const openModal = useCallback((data: ModalData) => {
    setActiveModal(data);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <EditContext.Provider value={{ isEditing, setIsEditing, activeModal, openModal, closeModal }}>
      {children}
    </EditContext.Provider>
  );
}
