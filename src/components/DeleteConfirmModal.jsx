export function DeleteConfirmModal({ open, onConfirm, onCancel, message = 'Are you sure you want to delete this track?' }) {
  if (!open) return null;

  return (
    <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-fit max-w-sm text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-3">
          <button id="btnYes" onClick={onConfirm} className="rounded-full bg-bittersweet text-white px-4 py-2 text-sm">Yes</button>
          <button id="btnNo" onClick={onCancel} className="rounded-full bg-[#ffd3da] text-black px-4 py-2 text-sm">No</button>
        </div>
      </div>
    </div>
  );
}
