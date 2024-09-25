export interface IDateValues {
  start: Date | string;
  end: Date | string;
}

export interface ICallAbuseAnswer {
  message: string;
  from_support: number | string;
  support_read_status: number | string;
  person_read_status: number | string;
}

export interface ICAllError {
  title: string;
}

export interface ICallResult {
  type: string;
  title: string;
  tooltip: string;
}

export interface ICallStage {
  person_name: string;
  person_surname: string;
  person_mango_phone: string;
  duration: string | number;
  disconnect_reason: string;
}

export interface ICallAbuse {
  date: Date | string;
  person_name: string;
  message: string;
  support_read_status: number | string;
  support_answer_status: number | string;
  answers: ICallAbuseAnswer[];
}

export interface ICall {
  id: number | string;
  partnership_id: number | string;
  partner_data: {
    id: number | string;
    name: string;
    phone: string;
  };
  date: Date | string;
  date_notime: Date | string;
  time: number | string;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: number | string;
  is_skilla: number | string;
  status: string;
  record: string;
  line_number: string;
  line_name: string;
  in_out: number | string;
  from_site: number | string;
  source: string;
  errors: ICAllError[];
  disconnect_reason: string;
  results: ICallResult[];
  stages: ICallStage[];
  abuse: ICallAbuse | any[];
  contact_name: string;
  contact_company: string;
  person_id: number | string;
  person_name: string;
  person_surname: string;
  person_avatar: string;
  candidate_id: string | number;
  candidate_name: string;
  candidate_link: string;
  candidate_vacancy_name: string;
  audio?: File;
}

export interface ICalls {
  total_rows: number | string;
  results: ICall[];
}

export interface RequestParamsCallList {
  date_start: string;
  date_end: string;
  in_out: number | string;
  limit?: number | string;
  offset?: number | string;
  sort_by?: Date | string;
  order?: string;
  status?: string;
  from_type?: string[];
  from_persons?: string[];
  sources?: string[] | number[];
  duration?: string[];
  errors?: string[];
  results?: string[];
  search?: string;
  ids?: string[] | number[];
  xls?: number | string;
}
