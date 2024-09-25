import { useState, useMemo } from "react";

import cn from "@/utils/cn";
import images from "@/assets/index";

interface IType {
  title: string;
  value: number | null;
}

enum ETypes {
  all = "Все типы",
  income = "Входящие",
  outcome = "Исходящие"
}

const InOutCallFilter = ({ trigger }: { trigger: (inOut: string | number) => void; }): React.ReactElement => {
  const [inOut, setInOut] = useState<number | null>(null);
  const [show, setSwow] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const types: IType[] = useMemo((): IType[] => {
    return [
      { title: ETypes.all, value: null },
      { title: ETypes.income, value: 1 },
      { title: ETypes.outcome, value: 2 },
    ];
  }, []);

  const handleShowToggleOptions = (): void => {
    setSwow(!show);
  };

  const applyFilter = (type: number | null): void => {
    setActive(true);
    setSwow(false);
    setInOut(type);

    const val = type ? type === 2 ? 0 : type : "";
    trigger(val);
  };

  return (
    <div className="relative w-full max-w-[133px]">
      <button
        className="flex items-center gap-x-2"
        onClick={handleShowToggleOptions}
      >
        <span
          className={cn(
            "text-[14px]",
            (active && inOut) && "text-ui-filter-blue"
          )}
        >
          {types.find((type) => type.value === inOut)?.title}
        </span>
        <img
          alt="carret"
          className="transition-all duration-300"
          src={!show ? images.ui.arrowDown : images.ui.arrowUp}
          width={12}
          height={8}
        />
      </button>
      <ul
        className={cn(
          "w-[133px] absolute top-[30px] left-0 transition-all duration-300 bg-white shadow-sm rounded-lg",
          !show ? "-z-50 opacity-0" : "z-50 opacity-100"
        )}
      >
        {types.map(({ title, value }, idx) => (
          <li key={idx} className="w-full">
            <button
              className="w-full text-left py-[7px] px-[12px] transition-all duration-300 hover:bg-ui-filter-hover"
              onClick={() => applyFilter(value)}
            >
              <span
                className={cn(
                  "text-[12px]",
                  value === (inOut && inOut) && "text-ui-filter-blue"
                )}
              >
                {title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InOutCallFilter;
