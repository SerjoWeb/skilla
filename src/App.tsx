import { useEffect } from "react";
import { getCallList } from "@/api/calls/calls";
import { callsStore } from "@/store/callsStore/callsStore";
import { defaultDateRangeRequest } from "@/api/calls/calls";
import type { ICalls } from "@/api/calls/interfaces";

import CallListPage from "./pages/CallListPage";

const App = (): React.ReactElement => {
  const { calls, setCalls } = callsStore();

  const callsList = async (): Promise<void> => {
    const params = {
      date_start: defaultDateRangeRequest.start as string,
      date_end: defaultDateRangeRequest.end as string,
      in_out: ""
    };

    const res: ICalls = await getCallList(params) as ICalls;

    if (res) {
      setCalls(res);
    }
  };

  useEffect(() => {
    callsList();
  }, []);

  return (
    <main className="bg-gray-50">
      <CallListPage calls={calls?.results || []} />
    </main>
  );
};

export default App;
