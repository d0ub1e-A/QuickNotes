import type { JSX } from "react";
import { useAppSelector } from "../../hooks";

import ErrorUI from "../ui/UIError";
import SuccessUI from "../ui/UISuccess";

type IconTypes = {
  success: JSX.Element;
  error: JSX.Element;
};

type Banner = {
  success: string;
  error: string;
};

export default function Toaster() {
  const { toaster, show } = useAppSelector((state) => state.toaster);

  const bannerStyle: Banner = {
    success: "success-banner",
    error: "error-banner",
  };

  const iconOf: IconTypes = {
    success: <SuccessUI />,
    error: <ErrorUI />,
  };

  if (toaster.type === "error" || toaster.type === "success") {
    return (
      <div
        className={`bg-toaster-bg-light w-[25rem]_ dark:bg-toaster-bg-dark fixed top-[6rem] p-[2rem] flex items-center gap-5 rounded-tl-[20px] rounded-bl-[20px] z-70 transition-all toaster border-[1.5px] border-grey-lite delay-25 right-0 overflow-hidden ${
          show ? "right-0 max-w-100_" : "-right-full max-w-0_"
        } ease-linear`}
      >
        <div className={`p-1.5 rounded-full ${bannerStyle[toaster.type]}`}>
          {iconOf[toaster.type]}
        </div>
        <p
          className={`text-[1.05rem] font-[500] fira-mono text-toaster-bg-dark dark:text-toaster-bg-light`}
        >
          {toaster.text}
        </p>
      </div>
    );
  }
}
