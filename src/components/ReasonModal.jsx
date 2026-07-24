import { useEffect, useState } from 'react';

export function ReasonModal({ open, title, confirmLabel = 'Confirm', placeholder = 'Reason...', defaultValue = '', onConfirm, onCancel }) {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open) setReason(defaultValue);
  }, [open, defaultValue]);

  if (!open) return null;

  return (
    <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <p className="font-semibold mb-3">{title}</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={placeholder}
          rows={3}
          autoFocus
          className="w-full rounded-lg border p-2.5 text-sm mb-4"
        />
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onConfirm(reason.trim())}
            disabled={!reason.trim()}
            className="rounded-full bg-bittersweet text-white px-4 py-2 text-sm disabled:opacity-50"
          >
            {confirmLabel}
          </button>
          <button onClick={onCancel} className="rounded-full bg-[#ffd3da] text-black px-4 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}
