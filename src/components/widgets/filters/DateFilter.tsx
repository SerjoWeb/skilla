import { useState, useMemo } from "react";
import { defaultDateRangeRequest } from "@/api/calls/calls";
import { generateDateRange } from "@/helpers/date/generateDateRange";
import { processDateString } from "@/helpers/date/processDateString";

import cn from "@/utils/cn";
import images from "@/assets/index";
import DatePickerFilter from "./DatePickerFilter";

import "react-datepicker/dist/react-datepicker.css";

interface IDate {
  title: string;
  date: {
    start: string;
    end: string;
  };
}

enum EDateFilterNames {
  threedays = "3 дня",
  week = "Неделя",
  month = "Месяц",
  year = "Год",
}

const DateFilter = ({ trigger }: { trigger: (start: string, end: string) => void; }): React.ReactElement => {
  const [show, setSwow] = useState<boolean>(false);
  const [filterTitle, setFilterTitle] = useState<string>(
    EDateFilterNames.threedays
  );

  const dateRangeFilter = (days: number, val: number): Date | string => {
    const range = generateDateRange(days);
    return processDateString(range[val]);
  };

  const handleShowToggleOptions = (): void => {
    setSwow(!show);
  };

  const applyFilter = (title: string, date: { start: string, end: string }): void => {
    setSwow(false);
    setFilterTitle(title);
    trigger(date.start, date.end);
  };

  const date: IDate[] = useMemo((): IDate[] => {
    return [
      {
        title: EDateFilterNames.threedays,
        date: {
          start: defaultDateRangeRequest.start as string,
          end: defaultDateRangeRequest.end as string
        },
      },
      {
        title: EDateFilterNames.week,
        date: {
          start: dateRangeFilter(6, 0) as string,
          end: dateRangeFilter(6, 1) as string
        },
      },
      {
        title: EDateFilterNames.month,
        date: {
          start: dateRangeFilter(29, 0) as string,
          end: dateRangeFilter(29, 1) as string,
        },
      },
      {
        title: EDateFilterNames.year,
        date: {
          start: dateRangeFilter(364, 0) as string,
          end: dateRangeFilter(364, 1) as string,
        },
      },
    ];
  }, []);

  return (
    <div className="relative w-full max-w-[218px]">
      <div className="w-full flex items-center gap-x-6">
        <button>
          <img
            alt="carret"
            className="-rotate-90 transition-all duration-300"
            src={images.ui.arrowUp}
            height={8}
            width={12}
          />
        </button>
        <button
          className="flex items-center gap-x-2"
          onClick={handleShowToggleOptions}
        >
          <img
            alt="calendar"
            className="transition-all duration-300"
            src={images.ui.calendar}
            width={16}
            height={18}
          />
          <span className="text-[14px] text-ui-filter-blue">{filterTitle}</span>
        </button>
        <button>
          <img
            alt="carret"
            className="rotate-90 transition-all duration-300"
            src={images.ui.arrowUp}
            height={8}
            width={12}
          />
        </button>
      </div>
      <ul
        className={cn(
          "w-[218px] absolute top-[30px] left-0 transition-all duration-300 bg-white shadow-sm rounded-lg",
          !show ? "-z-50 opacity-0" : "z-50 opacity-100"
        )}
      >
        {date.map(({ title, date }, idx) => (
          <li key={idx} className="w-full">
            <button
              className="w-full text-left py-[7px] px-[12px] transition-all duration-300 group hover:bg-ui-filter-hover"
              onClick={() => applyFilter(title, date)}
            >
              <span
                className={cn(
                  "text-[12px] text-ui-filter-unactive group-hover:text-text-dark-blue",
                  filterTitle === title && "text-ui-filter-blue"
                )}
              >
                {title}
              </span>
            </button>
          </li>
        ))}

        <DatePickerFilter trigger={trigger} />
      </ul>
    </div>
  );
};

export default DateFilter;
