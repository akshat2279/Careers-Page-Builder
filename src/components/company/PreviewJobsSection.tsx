import * as React from "react";

interface PreviewJobsSectionProps {
  jobsSectionRef: React.RefObject<HTMLElement | null>;
}

/**
 * Preview section showing sample job listings for the careers page
 */
export function PreviewJobsSection({ jobsSectionRef }: PreviewJobsSectionProps) {
  return (
    <section
      ref={jobsSectionRef}
      className="py-8 md:py-12 px-4 bg-background"
      aria-labelledby="open-roles-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="open-roles-heading"
          className="text-xl md:text-2xl font-bold mb-6 text-center"
        >
          Open Roles
        </h2>

        <div
          className="mb-6 space-y-3"
          role="search"
          aria-label="Job search filters"
        >
          <input
            type="text"
            placeholder="Search by title"
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
            disabled
            aria-label="Search jobs by title"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              disabled
              aria-label="Filter by location"
            >
              <option>All Locations</option>
            </select>

            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              disabled
              aria-label="Filter by job type"
            >
              <option>All Job Types</option>
            </select>
          </div>
        </div>
        
        <ul
          className="space-y-3"
          role="list"
          aria-label="Available job positions"
        >
          <li>
            <article className="p-4 md:p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-semibold mb-1">
                Frontend Engineer
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Bangalore • Full-time
              </p>
            </article>
          </li>

          <li>
            <article className="p-4 md:p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-semibold mb-1">
                Backend Engineer
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Remote • Full-time
              </p>
            </article>
          </li>
        </ul>

        <div
          className="text-center py-8 text-muted-foreground"
          role="status"
        >
          <p className="text-sm">More roles coming soon!</p>
        </div>
      </div>
    </section>
  );
}
