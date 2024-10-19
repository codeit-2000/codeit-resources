import defaultProfile from "@repo/assets/images/default-profile.png";
import clsx from "clsx";

interface Props {
  /** imageUrl을 지정합니다. */
  imageUrl?: string;
  /** ProfileImage 컴포넌트의 사이즈를 지정합니다. */
  size?: "sm" | "md" | "lg";
  /** 접근성 향상을 위해 user를 지정합니다. */
  user?: string;
}

export default function ProfileImage({ imageUrl, size = "md", user }: Props) {
  const classnames = clsx("rounded-full object-cover", {
    "size-32": size === "sm",
    "size-40": size === "md",
    "size-120": size === "lg",
  });

  return (
    <img
      src={imageUrl || defaultProfile}
      alt={user ? `${user}의 profile` : "profile"}
      className={classnames}
    />
  );
}
