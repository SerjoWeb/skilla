import axios from "axios";

import { generateDateRange } from "@/helpers/date/generateDateRange";
import { processDateString } from "@/helpers/date/processDateString";

import type { RequestParamsCallList, ICalls, IDateValues } from "./interfaces";
import type { ValidationError } from "../interfaces";

import { CALLS_API_URL } from "../constants";

const defaultDateRange = generateDateRange(2);

const generateUrlParams = (params: RequestParamsCallList): string => {
  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        queryParams.push(`${key}=${value.join(",")}`);
      } else {
        queryParams.push(`${key}=${encodeURIComponent(value)}`);
      }
    }
  }

  return queryParams.length ? `?${queryParams.join("&")}` : "";
};

export const defaultDateRangeRequest: IDateValues = {
  start: processDateString(defaultDateRange[0]),
  end: processDateString(defaultDateRange[1])
};

export const getCallList = async (params: RequestParamsCallList): Promise<ICalls | unknown> => {
  try {
    const urlParams = generateUrlParams(params);
    const req = await axios.post(`${CALLS_API_URL}/getList${urlParams}`, {}, {
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    return await req.data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      throw new Error(`Status: ${error.status} - ${error.response}`);
    } else {
      console.error(error);
    }
  }
};
