import type { Metadata } from "next";
import { api } from "@/lib/api";
import StatsBar from "@/components/feeding/StatsBar";
import FeedingList from "@/components/feeding/FeedingList";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard — TinyTrack",
};

export default async function DashboardPage() {
  let logs = [];
  let fetchError = false;

  try {
    logs = await api.getLogs();
  } catch {
    fetchError = true;
  }

  return (
    <div>
      {/* Page title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feeding Journal</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track every feeding session</p>
        </div>
        <Link
          href="/log"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 px-5 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Log Feeding
        </Link>
      </div>

      {fetchError ? (
        <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-center">
          <p className="text-red-600 font-medium">Could not connect to the server.</p>
          <p className="text-sm text-red-400 mt-1">
            Make sure the backend is running at{" "}
            <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs">
              {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}
            </code>
          </p>
        </div>
      ) : (
        <>
          <StatsBar logs={logs} />
          <FeedingList logs={logs} />
        </>
      )}
    </div>
  );
}
