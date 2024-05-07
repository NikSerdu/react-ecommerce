import { FC, useEffect } from "react";

const ScrollToTop: FC<{ trigger: any }> = ({ trigger }) => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [trigger]);

  return null;
};

export default ScrollToTop;
