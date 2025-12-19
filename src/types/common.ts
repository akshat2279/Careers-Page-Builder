/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosResponse } from "axios";
export interface IUseInfiniteScrollParamsLatest<P>
  extends IInfiniteScrollParamsLatest {
  apiService: (params: P) => Promise<ApiResponse>;
  apiParams?: { [key: string]: unknown };
  limit?: number;
}

export interface IInfiniteScrollParamsLatest {
  offset?: number;
  prevOffset?: number;
  hasMore?: boolean;
}

export interface StringKeyObject {
  [key: string]: any;
}

export default interface ApiResponse<T = any>
  extends Partial<AxiosResponse<T | TApiState>> {
  message?: string | string[];
  data: TApiState;
  error: TApiState;
}

export type TApiState = Record<string, any> | null;


export interface IUseInfiniteScrollReturnLatest<D> {
	data: D[];
	hasMore: boolean;
	loading: boolean;
	apiResponse?: ApiResponse;
	setLoading: (flag: boolean) => void;
	loadMore: () => void;
	setData: (data: D[]) => void;
	fetchData: (
		firstLoad?: boolean,
		otherParams?: { [key: string]: unknown }
	) => void;
}