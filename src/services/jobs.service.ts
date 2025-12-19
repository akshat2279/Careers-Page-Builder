import ApiResponse from "@/types/common";
import { http } from "@/utils/http";

interface JobsParams {
  offset: number;
  limit: number;
  search?: string;
  location?: string;
  jobType?: string;
  sortBy?: string;
}

export const getJobsList = async (params: JobsParams): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams({
    offset: params.offset.toString(),
    limit: params.limit.toString(),
    ...(params.search && { search: params.search }),
    ...(params.location && { location: params.location }),
    ...(params.jobType && { jobType: params.jobType }),
    ...(params.sortBy && { sortBy: params.sortBy }),
  });

  return await http.get(`/api/jobs?${queryParams.toString()}`);
};
