"use client";

import { useState } from "react";
import { FeedingLog } from "@/types/feeding";
import { formatTime, formatDate, formatMl, wastePercent } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface FeedingCardProps {
  log: FeedingLog;
  showDate?: boolean;
}

export default function FeedingCard({ log, showDate }: FeedingCardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const waste = log.milkPrepared - log.milkFed;
  const wasteColor = waste === 0 ? "green" : waste < log.milkPrepared * 0.2 ? "orange" : "red";

  async function handleDelete() {
    if (!confirm("Delete this feeding log?")) return;
    setDeleting(true);
    try {
      await api.deleteLog(log.id);
      router.refresh();
    } catch {
      alert("Failed to delete. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-lg font-bold text-gray-800">{formatTime(log.fedAt)}</div>
          {showDate && (
            <div className="text-xs text-gray-400 mt-0.5">{formatDate(log.fedAt)}</div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          loading={deleting}
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 -mt-1"
          title="Delete log"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Prepared</div>
          <div className="text-base font-bold text-gray-800">{formatMl(log.milkPrepared)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Fed</div>
          <div className="text-base font-bold text-emerald-600">{formatMl(log.milkFed)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Waste</div>
          <div className={`text-base font-bold ${waste === 0 ? "text-emerald-600" : "text-red-500"}`}>
            {formatMl(waste)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant={wasteColor}>
          {wastePercent(log.milkPrepared, log.milkFed)} waste
        </Badge>
        {log.milkFed === log.milkPrepared && (
          <Badge variant="green">Finished</Badge>
        )}
        {log.notes && (
          <span className="text-xs text-gray-500 truncate max-w-[180px]" title={log.notes}>
            {log.notes}
          </span>
        )}
      </div>

      {/* Milk progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Consumed</span>
          <span>{log.milkPrepared > 0 ? Math.round((log.milkFed / log.milkPrepared) * 100) : 0}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-emerald-400 rounded-full transition-all"
            style={{
              width: log.milkPrepared > 0
                ? `${Math.min((log.milkFed / log.milkPrepared) * 100, 100)}%`
                : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
