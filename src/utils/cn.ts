import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default cn;
