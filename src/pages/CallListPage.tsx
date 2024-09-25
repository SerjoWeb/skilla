import { Fragment, useState, useEffect } from "react";
import { defaultDateRangeRequest, getCallList } from "@/api/calls/calls";
import type { ICall, ICalls } from "@/api/calls/interfaces";

import CallList from "@/components/lists/callList/CallList";
import InOutCallFilter from "@/components/widgets/filters/InOutCallFilter";
import DateFilter from "@/components/widgets/filters/DateFilter";

const CallListPage = ({ calls }: { calls: ICall[]; }): React.ReactElement => {
  const [phoneCalls, setPhoneCalls] = useState<ICall[]>(calls);
  const [triggerFilter, setTriggerFilter] = useState<boolean>(false);
  const [inOutCallFilterVal, setInOutCallFilterVal] = useState<string | number>("");
  const [dateCallFilterVal, setDateCallFilterVal] = useState<{ start: string; end: string; }>({
    start: defaultDateRangeRequest.start as string,
    end: defaultDateRangeRequest.end as string
  });

  const applyInOutCallFilter = (inOut: string | number): void => {
    setInOutCallFilterVal(inOut);
    setTriggerFilter(true);
  };

  const applyDateCallFilter = (start: string, end: string): void => {
    setDateCallFilterVal({ start, end });
    setTriggerFilter(true);
  };

  const filterList = async (): Promise<void> => {
    const reqParams = {
      date_start: dateCallFilterVal.start,
      date_end: dateCallFilterVal.end,
      in_out: inOutCallFilterVal
    };

    const res: ICalls = await getCallList(reqParams) as ICalls;

    if (res) {
      setPhoneCalls(res.results);
    }

    setTriggerFilter(false);
  };

  useEffect(() => {
    setPhoneCalls(calls);
  }, [calls]);

  useEffect(() => {
    if (triggerFilter) {
      filterList();
    }
  }, [inOutCallFilterVal, dateCallFilterVal, triggerFilter]);

  return (
    <Fragment>
      <div className="w-full flex justify-between items-center p-4">
        <InOutCallFilter trigger={applyInOutCallFilter} />
        <DateFilter trigger={applyDateCallFilter} />
      </div>
      <CallList phoneCalls={phoneCalls} />
    </Fragment>
  );
};

export default CallListPage;
