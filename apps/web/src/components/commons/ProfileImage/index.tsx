import clsx from "clsx";
import defaultProfile from "@repo/assets/images/default-profile.png";

interface ProfileImagePros {
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProfileImage({
  imageUrl,
  size = "md",
}: ProfileImagePros) {
  const classnames = clsx("rounded-full object-cover", {
    "size-32": size === "sm",
    "size-40": size === "md",
    "size-120": size === "lg",
  });

  return (
    <img
      src={imageUrl || defaultProfile}
      alt="profile"
      className={classnames}
    />
  );
}
