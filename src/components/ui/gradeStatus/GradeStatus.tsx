import { TStatus } from "./interfaces";

import cn from "@/utils/cn";

const GradeStatus = ({ status }: { status: TStatus; }): React.ReactElement => {
  const statusView = (): string => {
    let styles = "";
    
    switch (status) {
      case "excelent" :
        styles = "bg-ui-green-secondary text-ui-green-primary border-ui-green-primary";
        break;
      case "good" :
        styles = "bg-ui-light-blue-secondary text-text-dark-blue border-ui-light-blue-primary";
        break;
      case "bad" :
        styles = "bg-ui-red-secondary text-ui-red-primary border-ui-red-primary";
        break;
      default:
        styles = "";
        break;
    }

    return styles;
  };

  const statusName = (): string => {
    let name = "";
    
    switch (status) {
      case "excelent" :
        name = "Отлично";
        break;
      case "good" :
        name = "Хорошо";
        break;
      case "bad" :
        name = "Плохо";
        break;
      default:
        name = "";
        break;
    }

    return name;
  };

  if (status === "unknown") {
    return (
      <span className="text-ui-red-primary text-sm">
        Скрипт не использован
      </span>
    );
  }

  return (
    <div
      className={cn(
        "w-fit flex justify-center items-center border rounded py-1.5 px-2",
        statusView()
      )}
    >
      <span className="text-sm">
        {statusName()}
      </span>
    </div>
  );
};

export default GradeStatus;
