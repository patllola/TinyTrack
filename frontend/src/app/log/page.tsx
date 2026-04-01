import FeedingForm from "@/components/feeding/FeedingForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

export const metadata = {
  title: "Log Feeding — TinyTrack",
};

export default function LogPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors text-gray-500 hover:text-brand-600"
          title="Back to dashboard"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Log a Feeding</h1>
          <p className="text-sm text-gray-500 mt-0.5">Record a new feeding session</p>
        </div>
      </div>

      {/* Quick tips */}
      <div className="rounded-2xl bg-brand-50 border border-brand-100 px-5 py-4 mb-6">
        <p className="text-sm font-semibold text-brand-700 mb-2">Quick tips</p>
        <ul className="text-xs text-brand-600 space-y-1.5">
          <li className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            Enter the time the feeding <strong>started</strong>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            <span>Waste = Milk prepared − Milk fed (calculated automatically)</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            Enter <strong>0 ml fed</strong> if baby refused the feeding
          </li>
        </ul>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feeding details</CardTitle>
        </CardHeader>
        <FeedingForm />
      </Card>
    </div>
  );
}
