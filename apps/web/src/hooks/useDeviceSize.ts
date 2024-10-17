import { useState, useEffect } from "react";

const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState("mobile");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setDeviceSize("desktop");
      } else if (window.innerWidth >= 768) {
        setDeviceSize("tablet");
      } else {
        setDeviceSize("mobile");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceSize;
};

export default useDeviceSize;
