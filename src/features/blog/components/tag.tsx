export function Tag(name: string) {
  return (
    <div
      className="flex items-center px-2 rounded-full cursor-pointer bg-[var(--accent-color)] text-xs text-[var(--primary-color)]"
      key={name}
    >
      # {name}
    </div>
  );
}
