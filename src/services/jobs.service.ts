import ApiResponse from "@/types/common";
import axiosInstance from "@/utils/axios";

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

  return await axiosInstance.get(`/api/jobs?${queryParams.toString()}`);
};
