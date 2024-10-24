import defaultProfile from "@repo/assets/images/default-profile.png";
import { getImageUrl } from "@repo/lib/api/storage";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

interface Props {
  /** userId를 지정합니다. */
  userId: string;
  /** imagePath를 지정합니다. */
  imagePath?: string;
  /** ProfileImage 컴포넌트의 사이즈를 지정합니다. */
  size?: "sm" | "md" | "lg";
  /** 접근성 향상을 위해 user를 지정합니다. */
  userName?: string;
}

export default function ProfileImage({
  userId,
  imagePath,
  size = "md",
  userName,
}: Props) {
  const { data: imageUrl } = useQuery({
    queryKey: ["profile-image", userId],
    queryFn: () => imagePath && getImageUrl(imagePath),
    enabled: !!imagePath,
    staleTime: 10 * 60 * 1000, // 10분
  });

  const classnames = clsx("rounded-full object-cover", {
    "size-32": size === "sm",
    "size-40": size === "md",
    "size-120": size === "lg",
  });

  return (
    <img
      src={imagePath ? imageUrl : defaultProfile}
      alt={userName ? `${userName}의 profile` : "profile"}
      className={classnames}
    />
  );
}
