import { useEffect, useState } from "react";
import { format } from "date-fns";
import { processDateString } from "@/helpers/date/processDateString";

import DatePicker from "react-datepicker";
import images from "@/assets/index";
import cn from "@/utils/cn";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  isEmpty: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onClick,
  isEmpty,
}) => {
  const displayValue = isEmpty ? "__.__.__" : value;

  return (
    <button
      className={cn(
        "custom-input",
        !isEmpty && "text-ui-filter-blue"
      )}
      onClick={onClick}
    >
      {displayValue}
    </button>
  );
};

const DatePickerFilter = ({ trigger }: { trigger: (start: string, end: string) => void; }): React.ReactElement => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateStartChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleDateEndChange = (date: Date | null) => {
    setEndDate(date);
  };

  useEffect(() => {
    if (startDate && endDate) {
      console.log(startDate, endDate)
      trigger(processDateString(startDate) as string, processDateString(endDate) as string);
    }
  }, [startDate, endDate]);

  return (
    <div className="w-full flex items-center gap-x-6 py-[7px] px-[12px] transition-all duration-300 group hover:bg-ui-filter-hover">
      <div className="flex items-center gap-x-2">
        <DatePicker
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          onChange={handleDateStartChange}
          selectsStart
          startDate={startDate as Date}
          endDate={endDate as Date}
          customInput={
            <CustomInput
              value={startDate ? format(startDate, "yyyy-MM-dd") : undefined}
              isEmpty={!startDate}
            />
          }
        />
        <span>-</span>
        <DatePicker
          selected={endDate}
          dateFormat="yyyy-MM-dd"
          onChange={handleDateEndChange}
          selectsEnd
          startDate={startDate as Date}
          endDate={endDate as Date}
          minDate={startDate as Date}
          customInput={
            <CustomInput
              value={endDate ? format(endDate, "yyyy-MM-dd") : undefined}
              isEmpty={!endDate}
            />
          }
        />
      </div>
      <img alt="calendar" src={images.ui.calendar} width={16} height={18} />
    </div>
  );
};

export default DatePickerFilter;
