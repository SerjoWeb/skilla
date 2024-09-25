import axios from "axios";

import { CALLS_API_URL } from "../constants";
import type { RequestParamsCallRecord } from "./interfaces";
import type { ValidationError } from "../interfaces";

export const getCallRecord = async (params: RequestParamsCallRecord): Promise<string | unknown> => {
  try {
    if (params.record === "" || params.partnership_id === "") {
      return "";
    }

    const response: any = await axios.post(`${CALLS_API_URL}/getRecord?record=${params.record}&partnership_id=${params.partnership_id}`, {}, {
      responseType: "blob",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        "Content-type": "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
        "Content-Transfer-Encoding": "binary",
        "Content-Disposition": "filename=record.mp3"
      }
    });

    const audioUrl = URL.createObjectURL(response.data);
    return audioUrl;
  } catch (error: unknown) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      throw new Error(`Status: ${error.status} - ${error.response}`);
    } else {
      console.error(error);
    }
  }
};
