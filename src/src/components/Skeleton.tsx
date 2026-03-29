interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  className?: string;
}

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

export default function Skeleton({
  width = '100%',
  height = '1rem',
  rounded = 'md',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[#e8e0d4] ${roundedMap[rounded]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
