import * as React from "react";

export type WithSkeletonProps = {
  showSkeleton: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
};

const WithSkeleton: React.FC<WithSkeletonProps> = ({
  showSkeleton,
  skeleton,
  children,
}) => {
  if (showSkeleton) return skeleton;

  return children;
};

export default WithSkeleton;
