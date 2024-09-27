import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueGetterParams, SelectionOptions } from "ag-grid-community";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getCallRecord } from "@/api/records/records";
import { recordsStore } from "@/store/recordsStore/recordsStore";
import { renderTime } from "@/helpers/date/renderTime";
import type { ICall } from "@/api/calls/interfaces";

import AudioPlayer from "@/components/ui/audioPlayer/AudioPlayer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import images from "@/assets/index";
import cn from "@/utils/cn";

interface IRow {
  type: {
    in_out: number;
    status: string;
  };
  time: Date | string;
  employee: {
    person_avatar: string;
    person_name: string;
    person_surname: string;
  };
  call: {
    name: string;
    phone: string;
    company_name: string;
  };
  source: string;
  grade: string;
  duration: Date | string;
  record?: {
    record_id: string | number;
    partnership_id: string | number;
  };
}

const CallList = ({
  phoneCalls,
}: {
  phoneCalls: ICall[];
}): React.ReactElement => {
  const { records, addRecord } = recordsStore();

  const [rowData, setRowData] = useState<IRow[] | null>(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const colDefs: ColDef[] = [
    {
      headerName: "Тип",
      cellRenderer: (p: ValueGetterParams) => {
        const type =
          p.data.type.in_out === 0
            ? p.data.type.status === "Дозвонился"
              ? images.call_statuses.outgoingCall
              : images.call_statuses.notReachedgCall
            : p.data.type.status === "Дозвонился"
            ? images.call_statuses.incomingCall
            : images.call_statuses.missedCall;

        return (
          <img src={type} alt="call_type" height={13} width={13} />
        );
      },
      flex: 1,
    },
    {
      headerName: "Время",
      cellRenderer: (p: ValueGetterParams) => {
        return renderTime(p.data.time);
      },
      flex: 1,
    },
    {
      headerName: "Сотрудник",
      cellRenderer: (p: ValueGetterParams) => {
        const renderAvatar = () => {
          if (p.data.employee.person_avatar === "") {
            if (p.data.employee.person_name === "") {
              return (
                <img
                  src={images.ui.blankAvatar}
                  alt="call_type"
                  height={32}
                  width={32}
                  className="h-[32px] w-[32px] rounded-full"
                />
              );
            } else {
              const initials =
                `${p.data.employee.person_name} ${p.data.employee.person_surname}`
                  .split(" ")
                  .map((part) => part.charAt(0).toUpperCase())
                  .join("");

              return (
                <div className="h-[32px] w-[32px] bg-ui-light-gray rounded-full flex justify-center items-center">
                  <span className="uppercase text-text-bright-blue">
                    {initials}
                  </span>
                </div>
              );
            }
          }

          return (
            <div className="h-full w-full flex">
              <img
                src={p.data.employee.person_avatar}
                alt="call_type"
                height={32}
                width={32}
                className="h-[32px] w-[32px] rounded-full"
              />
            </div>
          );
        };

        return renderAvatar();
      },
      flex: 1,
    },
    {
      headerName: "Звонок",
      cellClass: "call-styles",
      cellRenderer: (p: ValueGetterParams) => {
        return (
          <>
            <span className="font-medium text-text-dark-blue">
              <strong>{p.data.call.name}</strong>
            </span>
            <span
              className={cn(
                p.data.call.name === "" ? "text-text-dark-blue" : "text-text-blue-gray"
              )}
            >
              {p.data.call.company_name}
            </span>
            <span
              className={cn(
                (p.data.call.name === "" && p.data.call.company_name === "") ? "text-text-dark-blue" : "text-text-blue-gray"
              )}
            >
              {p.data.call.phone}
            </span>
          </>
        );
      },
      flex: 2,
    },
    {
      headerName: "Источник",
      cellClass: "source-styles",
      cellRenderer: (p: ValueGetterParams) => {
        return p.data.source || "-";
      },
      flex: 2,
    },
    {
      headerName: "Оценка",
      cellRenderer: () => {
        return "-";
      },
      flex: 1,
    },
    {
      headerName: "Длительность",
      cellRenderer: (p: ValueGetterParams) => {
        if (p?.node?.rowIndex === hoveredRowIndex) {
          startLoadingRecord(p.data.record.record_id, p.data.record.partnership_id);
        }

        return p?.node?.rowIndex === hoveredRowIndex ? (
          <AudioPlayer
            source={records.find(record => record.partnership_id === p.data.record.partnership_id && record.record_id === p.data.record.record_id)?.audio_url || ""}
            durationTime={renderTime(p.data.duration)}
          />
        ) : (
          <>{renderTime(p.data.duration)}</>
        );
      },
      flex: 3,
    },
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    autoHeight: true,
  };

  const selection: SelectionOptions<any, any> | undefined = useMemo(() => {
    
    return {
      mode: "multiRow",
      headerCheckbox: false,
      checkboxes: false
    };
  }, []);

  const loadRecord = async (record_id: string | number, partnership_id: string | number): Promise<void> => {
    const existedRecord = records.find(rec => rec.record_id === record_id && rec.partnership_id === partnership_id);

    if (!existedRecord) {
      const record = await getCallRecord({ record: record_id, partnership_id: partnership_id });
      addRecord({ record_id, partnership_id, audio_url: record as string });
    }
  };

  const startLoadingRecord = (record_id: string | number, partnership_id: string | number): void => {
    loadRecord(record_id, partnership_id);
  };

  const onCellMouseOver = useCallback((params: any) => {
    setHoveredRowIndex(params.node.rowIndex);
  }, []);

  const onCellMouseOut = useCallback(() => {
    setHoveredRowIndex(null);
  }, []);

  const getRowClass = useCallback(
    (params: any) => {
      if (params.node.rowIndex === hoveredRowIndex) {
        return "hovered-row";
      }

      return "";
    },
    [hoveredRowIndex]
  );

  const pagination = true;
  const paginationPageSize = 30;
  const paginationPageSizeSelector = [30, 60, 100, 120];

  useEffect(() => {
    const rows: IRow[] | unknown = phoneCalls.map((call) => ({
      type: {
        in_out: call.in_out,
        status: call.status,
      },
      time: call.date,
      employee: {
        person_avatar: call.person_avatar,
        person_name: call.person_name,
        person_surname: call.person_surname,
      },
      call: {
        name: call.contact_name,
        phone:
          call.in_out === 0
            ? `+7 (${call.to_extension}) ${call.to_number}`
            : `+7 (${call.from_extension}) ${call.from_number}`,
        company_name: call.contact_company,
      },
      source: call.source,
      grade: "",
      duration: call.time,
      record: {
        record_id: call.record,
        partnership_id: call.partnership_id
      }
    }));

    setRowData(rows as IRow[]);
  }, [phoneCalls]);

  if (!phoneCalls || !rowData || !colDefs) {
    return <p>Загрузка...</p>;
  }

  return (
    <div
      className="ag-theme-quartz relative z-10"
      style={{ width: "100%", height: "100%", maxHeight: "calc(100% - 52px)" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        selection={selection}
        onCellMouseOver={onCellMouseOver}
        onCellMouseOut={onCellMouseOut}
        getRowClass={getRowClass}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default CallList;
