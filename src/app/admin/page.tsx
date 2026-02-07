import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function getLast7Days() {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    date.setUTCDate(date.getUTCDate() - i);
    days.push(date);
  }
  return days;
}

export default async function AdminDashboard() {
  const today = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
  const last7Days = getLast7Days();
  const last7Start = last7Days[0];

  const [
    totalVisits,
    todayVisits,
    uniqueVisitors,
    ctaClicks,
    freelanceInquiries,
    topPages,
    last7,
  ] =
    await Promise.all([
      prisma.analyticsEvent.count({ where: { type: "PAGEVIEW" } }),
      prisma.analyticsEvent.count({
        where: { type: "PAGEVIEW", date: today },
      }),
      prisma.analyticsEvent.groupBy({
        by: ["visitorHash"],
        where: { type: "PAGEVIEW" },
      }),
      prisma.analyticsEvent.count({ where: { type: "CTA_CLICK" } }),
      prisma.contactMessage.count({ where: { tag: "FREELANCE" } }),
      prisma.analyticsEvent.groupBy({
        by: ["path"],
        where: { type: "PAGEVIEW" },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 5,
      }),
      prisma.analyticsEvent.groupBy({
        by: ["date"],
        where: { type: "PAGEVIEW", date: { gte: last7Start } },
        _count: { date: true },
        orderBy: { date: "asc" },
      }),
    ]);

  const chartData = last7Days.map((day) => {
    const match = last7.find((item) => item.date.getTime() === day.getTime());
    return {
      date: day,
      count: match?._count.date ?? 0,
    };
  });

  return (
    <section className="grid gap-8">
      <div>
        <h1 className="font-[var(--font-display)] text-3xl">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Track visits, inquiries, and your live portfolio performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total Visits", value: totalVisits },
          { label: "Today's Visits", value: todayVisits },
          { label: "Unique Visitors", value: uniqueVisitors.length },
          { label: "CTA Clicks", value: ctaClicks },
          { label: "Freelance Inquiries", value: freelanceInquiries },
        ].map((stat) => (
          <div key={stat.label} className="card p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {stat.label}
            </div>
            <div className="mt-3 text-3xl text-[var(--text)]">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Last 7 Days
          </div>
          <div className="mt-6 flex items-end gap-2">
            {chartData.map((point) => (
              <div key={point.date.toISOString()} className="flex flex-col items-center gap-2">
                <div
                  className="w-6 rounded-full bg-[var(--accent)]"
                  style={{ height: `${Math.max(point.count, 1) * 8}px` }}
                />
                <span className="text-[10px] text-[var(--text-muted)]">
                  {point.date.getUTCDate()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Top Pages
          </div>
          <div className="mt-4 grid gap-3 text-sm text-[var(--text-muted)]">
            {topPages.map((page) => (
              <div key={page.path} className="flex items-center justify-between">
                <span>{page.path}</span>
                <span className="text-[var(--text)]">{page._count.path}</span>
              </div>
            ))}
            {topPages.length === 0 ? <p>No data yet.</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
