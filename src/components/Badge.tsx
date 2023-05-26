interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}
const Badge = ({ color, children }: BadgeProps) => {
  return (
    <div className="relative">
      <div
        style={{ backgroundColor: color, opacity: 0.3 }}
        className="rounded-full px-2 py-1 text-xs text-center h-7"
      ></div>
      <span className="absolute block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-gray-200 font-bold">
        {children}
      </span>
    </div>
  );
};

export default Badge;
