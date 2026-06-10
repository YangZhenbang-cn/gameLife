'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditContext, ModalData } from '@/context/EditContext';

// ============================================================
// 子编辑器：单行文本
// ============================================================
function TextEditor({ value, onSave, close }: { value: string; onSave: (v: string) => void; close: () => void }) {
  const [text, setText] = useState(value);
  return (
    <div>
      <input
        className="edit-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        onKeyDown={(e) => { if (e.key === 'Enter') { onSave(text); close(); } }}
      />
      <div className="flex justify-end gap-2 mt-4">
        <button className="game-button text-xs" onClick={close}>取消</button>
        <button className="game-button text-xs" style={{ backgroundColor: 'var(--accent)' }} onClick={() => { onSave(text); close(); }}>保存</button>
      </div>
    </div>
  );
}

// ============================================================
// 子编辑器：多行文本
// ============================================================
function TextareaEditor({ value, onSave, close }: { value: string; onSave: (v: string) => void; close: () => void }) {
  const [text, setText] = useState(value);
  return (
    <div>
      <textarea
        className="edit-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        autoFocus
      />
      <div className="flex justify-end gap-2 mt-4">
        <button className="game-button text-xs" onClick={close}>取消</button>
        <button className="game-button text-xs" style={{ backgroundColor: 'var(--accent)' }} onClick={() => { onSave(text); close(); }}>保存</button>
      </div>
    </div>
  );
}

// ============================================================
// 子编辑器：标签列表
// ============================================================
function TagsEditor({ value, onSave, close }: { value: string[]; onSave: (v: string[]) => void; close: () => void }) {
  const [items, setItems] = useState<string[]>([...value]);
  const [newItem, setNewItem] = useState('');

  const add = () => {
    const trimmed = newItem.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setNewItem('');
    }
  };

  const remove = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const arr = [...items];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setItems(arr);
  };
  const moveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const arr = [...items];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setItems(arr);
  };

  return (
    <div>
      <div className="space-y-1 mb-3 max-h-48 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1 p-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <button onClick={() => moveUp(i)} className="edit-arrow-btn" title="上移">&#x25b2;</button>
            <button onClick={() => moveDown(i)} className="edit-arrow-btn" title="下移">&#x25bc;</button>
            <span className="flex-1 text-xs font-mono" style={{ color: 'var(--text-primary)' }}>{item}</span>
            <button onClick={() => remove(i)} className="edit-arrow-btn" style={{ color: 'var(--danger)' }} title="删除">&#x2715;</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="edit-input flex-1" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="输入后回车添加" onKeyDown={(e) => { if (e.key === 'Enter') add(); }} />
        <button className="game-button text-xs" onClick={add}>添加</button>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button className="game-button text-xs" onClick={close}>取消</button>
        <button className="game-button text-xs" style={{ backgroundColor: 'var(--accent)' }} onClick={() => { onSave(items); close(); }}>保存</button>
      </div>
    </div>
  );
}

// ============================================================
// 子编辑器：任务列表（仅标题）
// ============================================================
function TasksEditor({ value, onSave, close }: { value: Array<{ title: string; done?: boolean }>; onSave: (v: Array<{ title: string; done?: boolean }>) => void; close: () => void }) {
  const [items, setItems] = useState(value.map((t) => ({ title: t.title, done: t.done || false })));
  const [newTitle, setNewTitle] = useState('');

  const add = () => {
    const t = newTitle.trim();
    if (t) { setItems([...items, { title: t, done: false }]); setNewTitle(''); }
  };
  const remove = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateTitle = (idx: number, v: string) => {
    const arr = [...items];
    arr[idx] = { ...arr[idx], title: v };
    setItems(arr);
  };
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const arr = [...items];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setItems(arr);
  };
  const moveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const arr = [...items];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setItems(arr);
  };

  return (
    <div>
      <div className="space-y-1 mb-3 max-h-48 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1 p-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <button onClick={() => moveUp(i)} className="edit-arrow-btn" title="上移">&#x25b2;</button>
            <button onClick={() => moveDown(i)} className="edit-arrow-btn" title="下移">&#x25bc;</button>
            <input className="edit-input flex-1 text-xs" value={item.title} onChange={(e) => updateTitle(i, e.target.value)} />
            <button onClick={() => remove(i)} className="edit-arrow-btn" style={{ color: 'var(--danger)' }} title="删除">&#x2715;</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="edit-input flex-1" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="输入后回车添加" onKeyDown={(e) => { if (e.key === 'Enter') add(); }} />
        <button className="game-button text-xs" onClick={add}>添加</button>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button className="game-button text-xs" onClick={close}>取消</button>
        <button className="game-button text-xs" style={{ backgroundColor: 'var(--accent)' }} onClick={() => { onSave(items); close(); }}>保存</button>
      </div>
    </div>
  );
}

// ============================================================
// 子编辑器：经历时间线
// ============================================================
interface TimelineItem { time: string; event: string; }

function TimelineEditor({ value, onSave, close }: { value: TimelineItem[]; onSave: (v: TimelineItem[]) => void; close: () => void }) {
  const [items, setItems] = useState<TimelineItem[]>(value.map((t) => ({ ...t })));

  const add = () => setItems([...items, { time: '', event: '' }]);
  const remove = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const update = (idx: number, field: 'time' | 'event', v: string) => {
    const arr = [...items];
    arr[idx] = { ...arr[idx], [field]: v };
    setItems(arr);
  };
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const arr = [...items];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setItems(arr);
  };
  const moveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const arr = [...items];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setItems(arr);
  };

  return (
    <div>
      <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="p-2 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-1 mb-1">
              <button onClick={() => moveUp(i)} className="edit-arrow-btn" title="上移">&#x25b2;</button>
              <button onClick={() => moveDown(i)} className="edit-arrow-btn" title="下移">&#x25bc;</button>
              <input className="edit-input w-32 text-xs" value={item.time} onChange={(e) => update(i, 'time', e.target.value)} placeholder="时间" />
              <button onClick={() => remove(i)} className="edit-arrow-btn ml-auto" style={{ color: 'var(--danger)' }} title="删除">&#x2715;</button>
            </div>
            <textarea className="edit-input text-xs" value={item.event} onChange={(e) => update(i, 'event', e.target.value)} rows={2} placeholder="事件描述" />
          </div>
        ))}
      </div>
      <button className="game-button text-xs w-full" onClick={add}>&#x2795; 添加条目</button>
      <div className="flex justify-end gap-2 mt-4">
        <button className="game-button text-xs" onClick={close}>取消</button>
        <button className="game-button text-xs" style={{ backgroundColor: 'var(--accent)' }} onClick={() => { onSave(items); close(); }}>保存</button>
      </div>
    </div>
  );
}

// ============================================================
// 子编辑器：关系列表
// ============================================================
interface RelItem { name: string; role?: string; affection: number; }

function RelationshipsEditor({ value, onSave, close, showRole }: { value: RelItem[]; onSave: (v: RelItem[]) => void; close: () => void; showRole: boolean }) {
  const [items, setItems] = useState<RelItem[]>(value.map((r) => ({ ...r, role: r.role || '' })));

  const add = () => setItems([...items, { name: '', role: '', affection: 5 }]);
  const remove = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const update = (idx: number, field: 'name' | 'role' | 'affection', v: string | number) => {
    const arr = [...items];
    arr[idx] = { ...arr[idx], [field]: v };
    setItems(arr);
  };
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const arr = [...items];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setItems(arr);
  };
  const moveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const arr = [...items];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setItems(arr);
  };

  return (
    <div>
      <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="p-2 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-1 mb-1">
              <button onClick={() => moveUp(i)} className="edit-arrow-btn" title="上移">&#x25b2;</button>
              <button onClick={() => moveDown(i)} className="edit-arrow-btn" title="下移">&#x25bc;</button>
              <input className="edit-input flex-1 text-xs" value={item.name} onChange={(e) => update(i, 'name', e.target.value)} placeholder="名称" />
              <button onClick={() => remove(i)} className="edit-arrow-btn" style={{ color: 'var(--danger)' }} title="删除">&#x2715;</button>
            </div>
            <div className="flex gap-2">
              {showRole && (
                <input className="edit-input flex-1 text-xs" value={item.role || ''} onChange={(e) => update(i, 'role', e.target.value)} placeholder="关系/角色" />
              )}
              <div className="flex items-center gap-1">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>好感度</span>
                <input className="edit-input w-16 text-xs text-center" type="number" min={1} max={10} value={item.affection} onChange={(e) => update(i, 'affection', Math.min(10, Math.max(1, Number(e.target.value) || 1)))} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="game-button text-xs w-full" onClick={add}>&#x2795; 添加关系</button>
      <div className="flex justify-end gap-2 mt-4">
        <button className="game-button text-xs" onClick={close}>取消</button>
        <button className="game-button text-xs" style={{ backgroundColor: 'var(--accent)' }} onClick={() => { onSave(items); close(); }}>保存</button>
      </div>
    </div>
  );
}

// ============================================================
// 子编辑器：资产
// ============================================================
function AssetsEditor({ value, onSave, close }: { value: { gold: number; debt: number; fixedAssets: string[]; freeTime: string }; onSave: (v: { gold: number; debt: number; fixedAssets: string[]; freeTime: string }) => void; close: () => void }) {
  const [gold, setGold] = useState(value.gold);
  const [debt, setDebt] = useState(value.debt);
  const [fixedAssets, setFixedAssets] = useState([...value.fixedAssets]);
  const [freeTime, setFreeTime] = useState(value.freeTime);
  const [newAsset, setNewAsset] = useState('');

  const addAsset = () => {
    const t = newAsset.trim();
    if (t) { setFixedAssets([...fixedAssets, t]); setNewAsset(''); }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>金币</label>
          <input className="edit-input" type="number" value={gold} onChange={(e) => setGold(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>负债</label>
          <input className="edit-input" type="number" value={debt} onChange={(e) => setDebt(Number(e.target.value))} />
        </div>
        <div className="col-span-2">
          <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>空闲时间</label>
          <input className="edit-input" value={freeTime} onChange={(e) => setFreeTime(e.target.value)} />
        </div>
      </div>

      <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>固定资产</label>
      <div className="space-y-1 mb-2 max-h-32 overflow-y-auto">
        {fixedAssets.map((a, i) => (
          <div key={i} className="flex items-center gap-1 p-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <span className="flex-1 text-xs font-mono" style={{ color: 'var(--text-primary)' }}>{a}</span>
            <button onClick={() => setFixedAssets(fixedAssets.filter((_, j) => j !== i))} className="edit-arrow-btn" style={{ color: 'var(--danger)' }}>&#x2715;</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="edit-input flex-1 text-xs" value={newAsset} onChange={(e) => setNewAsset(e.target.value)} placeholder="添加固定资产" onKeyDown={(e) => { if (e.key === 'Enter') addAsset(); }} />
        <button className="game-button text-xs" onClick={addAsset}>添加</button>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button className="game-button text-xs" onClick={close}>取消</button>
        <button className="game-button text-xs" style={{ backgroundColor: 'var(--accent)' }} onClick={() => { onSave({ gold, debt, fixedAssets, freeTime }); close(); }}>保存</button>
      </div>
    </div>
  );
}

// ============================================================
// 编辑弹窗主体
// ============================================================
export default function EditModal() {
  const { activeModal, closeModal } = useEditContext();

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 暗色遮罩 */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={closeModal} />

          {/* 弹窗卡片 */}
          <motion.div
            className="relative w-full max-w-lg p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--border-color)',
              boxShadow: '0 0 30px var(--border-glow)',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* 标题 */}
            <h3 className="font-display text-lg mb-4 pb-2" style={{ color: 'var(--accent)', borderBottom: '2px solid var(--accent)' }}>
              ✏️ 编辑：{activeModal.label}
            </h3>

            {/* 根据类型分发编辑器 */}
            {activeModal.type === 'text' && (
              <TextEditor value={activeModal.value as string} onSave={activeModal.onSave as (v: string) => void} close={closeModal} />
            )}
            {activeModal.type === 'textarea' && (
              <TextareaEditor value={activeModal.value as string} onSave={activeModal.onSave as (v: string) => void} close={closeModal} />
            )}
            {activeModal.type === 'tags' && (
              <TagsEditor value={activeModal.value as string[]} onSave={activeModal.onSave as (v: string[]) => void} close={closeModal} />
            )}
            {activeModal.type === 'tasks' && (
              <TasksEditor value={activeModal.value as Array<{ title: string; done?: boolean }>} onSave={activeModal.onSave as (v: Array<{ title: string; done?: boolean }>) => void} close={closeModal} />
            )}
            {activeModal.type === 'timeline' && (
              <TimelineEditor value={activeModal.value as TimelineItem[]} onSave={activeModal.onSave as (v: TimelineItem[]) => void} close={closeModal} />
            )}
            {activeModal.type === 'relationships' && (
              <RelationshipsEditor value={activeModal.value as RelItem[]} onSave={activeModal.onSave as (v: RelItem[]) => void} close={closeModal} showRole={true} />
            )}
            {activeModal.type === 'assets' && (
              <AssetsEditor value={activeModal.value as { gold: number; debt: number; fixedAssets: string[]; freeTime: string }} onSave={activeModal.onSave as (v: { gold: number; debt: number; fixedAssets: string[]; freeTime: string }) => void} close={closeModal} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}