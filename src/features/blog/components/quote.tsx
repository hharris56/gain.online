export function Quote(props: { children: any }) {
  return (
    <div className="italic text-[var(--secondary-text-color)] text-sm mx-4">
      "{props.children}"
    </div>
  );
}
