export function Badge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-primary text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
      {count}
    </span>
  );
}
