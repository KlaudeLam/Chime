export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex justify-center items-center gap-4 mt-7">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle text-xs font-medium uppercase transition-all active:bg-gray-900/20"
          style={{ backgroundColor: n === page ? '#ff6176' : '#ffd3da', color: n === page ? 'white' : 'black' }}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{n}</span>
        </button>
      ))}
    </div>
  );
}
