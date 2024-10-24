interface SkeletonProps {
  /** 스켈레톤의 스타일을 입력합니다. */
  className: string;
}

function Skeleton({ className }: SkeletonProps) {
  return <div className={`${className} bg-gray-20 animate-pulse`} />
}

export default Skeleton;
