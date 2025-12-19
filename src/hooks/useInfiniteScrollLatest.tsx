/* eslint-disable react-hooks/preserve-manual-memoization */
import ApiResponse, { IUseInfiniteScrollParamsLatest, IUseInfiniteScrollReturnLatest } from "@/types/common";
import { LIST_RECORDS_LIMIT } from "@/utils/constanst";
import { useCallback, useEffect, useState } from "react";


const useInfiniteScroll = <P, D>({
	apiService,
	limit = LIST_RECORDS_LIMIT,
	apiParams,
}: IUseInfiniteScrollParamsLatest<P>): IUseInfiniteScrollReturnLatest<D> => {
	const [data, setData] = useState<D[]>([]);
	const [offset, setOffset] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [apiResponse, setApiResponse] = useState<ApiResponse>();

	/**
	 * Fetch data
	 */
	const fetchData = useCallback(
		async (firstLoad?: boolean, otherParams?: { [key: string]: unknown }) => {
			if (firstLoad) {
				setData([]);
				setOffset(0);
			}
			setLoading(true);
			const res = await apiService({
				...apiParams,
				...otherParams,
				offset: firstLoad ? 0 : offset,
				limit: limit ? limit : LIST_RECORDS_LIMIT,
			} as P);

			setApiResponse(res);
			if (res.data && res?.data?.data) {
				const info = res?.data?.data;
				if (info.length < limit) setHasMore(false);
				else setHasMore(true);
				setData(firstLoad ? info : data.concat(info));
				if (offset) setOffset(firstLoad ? 1 : offset + 1);
				else {
					setOffset(1);
				}
			} else {
				setHasMore(false);
				if (firstLoad) setData([]);
			}
			setLoading(false);
		},
		[offset, hasMore, apiParams]
	);
	useEffect(() => {
		return () => {
			setApiResponse(undefined);
			setLoading(false);
		};
	}, []);
	/**
	 * Load more data on scroll
	 */
	const loadMore = () => {
		setTimeout(() => {
			if (hasMore) {
				fetchData(false);
			}
		}, 500);
	};
	return {
		data,
		hasMore,
		loading,
		apiResponse,
		setData,
		loadMore,
		fetchData,
		setLoading,
	};
};
export default useInfiniteScroll;
