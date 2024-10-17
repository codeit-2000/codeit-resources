import { useAtomValue } from "jotai";

import isMobileAtom from "@src/store/mobileAtom";

const useIsMobile = (): boolean => {
  const isMobile = useAtomValue(isMobileAtom);

  return isMobile;
};

export default useIsMobile;
