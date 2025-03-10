export default function BoxForLesson({ title, count }) {
  return (
    <div className="w-[148px] h-[64px] bg-[#242851] rounded-[5px] flex flex-col items-center justify-center shadow-md">
      <p className="text-gray-300 text-sm">{title}</p>
      <p className="text-lg font-semibold">{count}</p>
    </div>
  );
}
