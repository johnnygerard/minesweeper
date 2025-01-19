import {
  NumberEight,
  NumberFive,
  NumberFour,
  NumberOne,
  NumberSeven,
  NumberSix,
  NumberThree,
  NumberTwo,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { memo } from "react";

type Props = Readonly<{
  className: string;
  size: string;
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}>;

const NumberIcon = ({ className, size, value }: Props) => {
  let icon;

  switch (value) {
    case 1:
      icon = (
        <NumberOne className={clsx("text-blue-600", className)} size={size} />
      );
      break;
    case 2:
      icon = (
        <NumberTwo
          className={clsx("text-emerald-600", className)}
          size={size}
        />
      );
      break;
    case 3:
      icon = (
        <NumberThree className={clsx("text-red-600", className)} size={size} />
      );
      break;
    case 4:
      icon = (
        <NumberFour
          className={clsx("text-indigo-700", className)}
          size={size}
        />
      );
      break;
    case 5:
      icon = (
        <NumberFive className={clsx("text-amber-700", className)} size={size} />
      );
      break;
    case 6:
      icon = (
        <NumberSix className={clsx("text-teal-600", className)} size={size} />
      );
      break;
    case 7:
      icon = (
        <NumberSeven
          className={clsx("text-violet-700", className)}
          size={size}
        />
      );
      break;
    case 8:
      icon = (
        <NumberEight className={clsx("text-rose-700", className)} size={size} />
      );
      break;
    default:
      ((_: never) => _)(value); // Exhaustive check
  }

  return <>{icon}</>;
};

export default memo(NumberIcon);
