"use client";

const Pagination = ({ total, current, onPageChange }: any) => {
  return (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded-lg border text-sm font-medium transition ${
            current === index + 1
              ? "bg-[#0d2549] text-white border-[#0d2549"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
