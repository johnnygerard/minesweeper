import {
  NumberEightIcon,
  NumberFiveIcon,
  NumberFourIcon,
  NumberOneIcon,
  NumberSevenIcon,
  NumberSixIcon,
  NumberThreeIcon,
  NumberTwoIcon,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { FC } from "react";
import type { AdjacentMineCount } from "~/types/adjacent-mine-count";

type Props = {
  className: string;
  size: string;
  value: Exclude<AdjacentMineCount, 0>;
};

export const NumberIcon: FC<Props> = ({ className, size, value }) => {
  let icon;

  switch (value) {
    case 1:
      icon = (
        <NumberOneIcon
          className={clsx("text-blue-600", className)}
          size={size}
        />
      );
      break;
    case 2:
      icon = (
        <NumberTwoIcon
          className={clsx("text-emerald-600", className)}
          size={size}
        />
      );
      break;
    case 3:
      icon = (
        <NumberThreeIcon
          className={clsx("text-red-600", className)}
          size={size}
        />
      );
      break;
    case 4:
      icon = (
        <NumberFourIcon
          className={clsx("text-indigo-700", className)}
          size={size}
        />
      );
      break;
    case 5:
      icon = (
        <NumberFiveIcon
          className={clsx("text-amber-700", className)}
          size={size}
        />
      );
      break;
    case 6:
      icon = (
        <NumberSixIcon
          className={clsx("text-teal-600", className)}
          size={size}
        />
      );
      break;
    case 7:
      icon = (
        <NumberSevenIcon
          className={clsx("text-violet-700", className)}
          size={size}
        />
      );
      break;
    case 8:
      icon = (
        <NumberEightIcon
          className={clsx("text-rose-700", className)}
          size={size}
        />
      );
      break;
    default:
      ((_: never) => _)(value); // Exhaustive check
  }

  return <>{icon}</>;
};
