"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "@/hooks/useInfiniteScrollLatest";
import { getJobsList } from "@/services/jobs.service";
import { LIST_RECORDS_LIMIT } from "@/utils/constanst";

interface JobsListProps {
  isPreview?: boolean;
}

interface IJob {
  _id: string;
  title: string;
  work_policy: string;
  location: string;
  department: string;
  employment_type: string;
  experience_level: string;
  job_type: string;
  salary_range: {
    min: number;
    max: number;
    currency: string;
  };
  job_slug: string;
  posted_days_ago: number;
}

export function JobsList({ isPreview = false }: JobsListProps) {
  const [searchValue, setSearchValue] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [jobTypeFilter, setJobTypeFilter] = useState("All Job Types");
  const [sortBy, setSortBy] = useState(true);

  const { data, loading, fetchData, hasMore, loadMore } = useInfiniteScroll<
    {
      search: string;
      location: string;
      jobType: string;
      sortBy: string;
      offset: number;
      limit: number;
    },
    IJob
  >({
    apiService: getJobsList,
    apiParams: {
      search: searchValue.trim(),
      location: locationFilter,
      jobType: jobTypeFilter,
      sortBy: sortBy.toString(),
    },
  });

  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, locationFilter, jobTypeFilter, sortBy]);

  if (isPreview) {
    return null;
  }

  return (
    <div>
      <div
        className="mb-6 space-y-3"
        role="search"
        aria-label="Job search filters"
      >
        <input
          type="text"
          placeholder="Search by title or department"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
          aria-label="Search jobs by title or department"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
            aria-label="Filter by location"
          >
            <option>All Locations</option>
            <option>Berlin, Germany</option>
            <option>Dubai, United Arab Emirates</option>
            <option>Bangalore, India</option>
            <option>Boston, United States</option>
            <option>London, England, United Kingdom</option>
          </select>

          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
            aria-label="Filter by job type"
          >
            <option>All Job Types</option>
            <option>Tech</option>
            <option>Non-Tech</option>
            <option>Management</option>
            <option>Design</option>
          </select>

          <select
            value={sortBy.toString()}
            onChange={(e) => setSortBy(e.target.value === "true")}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
            aria-label="Sort by"
          >
            <option value="true">Latest Jobs</option>
            <option value="false">Oldest Jobs</option>
          </select>
        </div>
      </div>

      <InfiniteScroll
        dataLength={data?.length || 0}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4">
            <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></span>
          </div>
        }
        height={600}
        endMessage={
          !loading && data?.length >= LIST_RECORDS_LIMIT ? (
            <p className="text-center py-8 text-muted-foreground text-sm">
              No more jobs available
            </p>
          ) : null
        }
      >
        <ul
          className="space-y-3"
          role="list"
          aria-label="Available job positions"
        >
          {data && data?.length > 0 ? (
            data.map((job, key) => (
              <li key={key}>
                <article className="p-4 md:p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {job.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {job.posted_days_ago === 0
                        ? "Posted today"
                        : `${job.posted_days_ago} days ago`}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base mb-2">
                    {job.location} • {job.employment_type} • {job.work_policy}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {job.job_type}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      {job.experience_level}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      {job.department}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.salary_range.currency}{" "}
                    {job.salary_range.min.toLocaleString()}–
                    {job.salary_range.max.toLocaleString()} / month
                  </p>
                </article>
              </li>
            ))
          ) : loading && !hasMore ? (
            <div className="text-center py-8">
              <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></span>
            </div>
          ) : !loading && data?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No jobs found</p>
            </div>
          ) : null}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
