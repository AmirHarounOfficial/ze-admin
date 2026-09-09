import React, { useState } from "react";
import {
  X, Phone, MapPin, CheckCircle2, Clock, AlertTriangle, User,
  Building2, CreditCard, Shield, RefreshCw, Send, ArrowRight
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { StatusBadge, PrimaryBtn, DangerBtn } from "@/components/ui/CommonUI";

export interface BookingMilestone {
  title: string;
  time: string;
  done: boolean;
}

export interface DetailedBooking {
  id: string;
  customerId: string;
  customer: string;
  customerPhone: string;
  service: string;
  vertical: string;
  provider: string;
  providerRating: number;
  providerPhone: string;
  assignedWorker?: string;
  workerPhone?: string;
  vehiclePlate?: string;
  amount: string;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  status: "completed" | "pending" | "preparing" | "in_progress" | "cancelled" | "en_route";
  city: string;
  zone: string;
  address: string;
  time: string;
  eta?: string;
  milestones: BookingMilestone[];
  notes?: string;
}

export function OrderDetailModal({
  booking,
  onClose,
  onActionSuccess,
}: {
  booking: DetailedBooking | null;
  onClose: () => void;
  onActionSuccess?: (msg: string) => void;
}) {
  const [reassigning, setReassigning] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!booking) return null;

  function handleCopyPhone(phone: string) {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleReassign() {
    setReassigning(true);
    setTimeout(() => {
      setReassigning(false);
      if (onActionSuccess) onActionSuccess(`Driver re-assignment dispatched for ${booking?.id}`);
      onClose();
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{ background: C.card, borderColor: C.border }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: C.border, background: C.bg }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs" style={{ background: C.goldLight, color: C.gold }}>
              {booking.id.slice(-4)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold" style={{ color: C.textPrimary }}>{booking.id}</h3>
                <StatusBadge status={booking.status} />
              </div>
              <p className="text-xs" style={{ color: C.textSecondary }}>
                {t(booking.service)} • {booking.zone}, {booking.city} • <span className="opacity-75">{booking.time}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            style={{ color: C.textSecondary }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1" style={{ scrollbarWidth: "thin" }}>
          {/* Customer & Address Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2.5" style={{ background: C.bg, borderColor: C.border }}>
              <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textMuted }}>
                <User size={13} /> {t("Customer Details")}
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: C.textPrimary }}>{booking.customer}</div>
                <div className="text-xs font-mono" style={{ color: C.textMuted }}>{booking.customerId}</div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: C.border }}>
                <span className="text-xs font-mono" style={{ color: C.textSecondary }}>{booking.customerPhone}</span>
                <button
                  onClick={() => handleCopyPhone(booking.customerPhone)}
                  className="text-[11px] px-2 py-0.5 rounded font-medium transition-colors"
                  style={{ background: C.card, border: `1px solid ${C.border}`, color: copied ? C.green : C.textSecondary }}
                >
                  {copied ? t("Copied!") : t("Copy")}
                </button>
              </div>
            </div>

            <div className="rounded-xl border p-4 space-y-2.5" style={{ background: C.bg, borderColor: C.border }}>
              <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textMuted }}>
                <MapPin size={13} /> {t("Service Location")}
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: C.textPrimary }}>{booking.zone}, {booking.city}</div>
                <div className="text-xs mt-0.5 leading-relaxed" style={{ color: C.textSecondary }}>{booking.address}</div>
              </div>
              {booking.eta && (
                <div className="flex items-center gap-1.5 text-xs pt-1 border-t" style={{ borderColor: C.border, color: C.gold }}>
                  <Clock size={12} />
                  <span>ETA: <b>{booking.eta}</b></span>
                </div>
              )}
            </div>
          </div>

          {/* Provider & Dispatch Info */}
          <div className="rounded-xl border p-4" style={{ background: C.bg, borderColor: C.border }}>
            <div className="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between mb-3" style={{ color: C.textMuted }}>
              <span className="flex items-center gap-1.5"><Building2 size={13} /> {t("Assigned Provider & Fleet")}</span>
              <span className="text-xs font-semibold" style={{ color: C.gold }}>★ {booking.providerRating}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-[10px]" style={{ color: C.textMuted }}>{t("Merchant / Business")}</div>
                <div className="font-semibold text-sm mt-0.5" style={{ color: C.textPrimary }}>{booking.provider}</div>
                <div className="font-mono text-[11px] mt-0.5" style={{ color: C.textSecondary }}>{booking.providerPhone}</div>
              </div>
              <div>
                <div className="text-[10px]" style={{ color: C.textMuted }}>{t("Assigned Captain / Staff")}</div>
                <div className="font-semibold text-sm mt-0.5" style={{ color: C.textPrimary }}>{booking.assignedWorker || t("Pending Auto-Dispatch")}</div>
                {booking.workerPhone && (
                  <div className="font-mono text-[11px] mt-0.5" style={{ color: C.textSecondary }}>{booking.workerPhone}</div>
                )}
              </div>
              <div>
                <div className="text-[10px]" style={{ color: C.textMuted }}>{t("Vehicle Plate / Unit")}</div>
                <div className="font-mono font-semibold text-sm mt-0.5" style={{ color: C.textPrimary }}>{booking.vehiclePlate || "N/A"}</div>
                <div className="text-[11px] mt-0.5" style={{ color: C.green }}>● {t("Telemetry Active")}</div>
              </div>
            </div>
          </div>

          {/* Payment & Financial Ledger */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border" style={{ background: C.card, borderColor: C.border }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.blueLight, color: C.blue }}>
                <CreditCard size={16} />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: C.textPrimary }}>{booking.paymentMethod}</div>
                <div className="text-[11px]" style={{ color: C.textSecondary }}>{t("Status")}: <span className="font-semibold" style={{ color: booking.paymentStatus === "Paid" ? C.green : C.orange }}>{booking.paymentStatus}</span></div>
              </div>
            </div>
            <div className="text-end">
              <div className="text-xs font-mono font-bold text-base" style={{ color: C.textPrimary }}>{booking.amount}</div>
              <div className="text-[10px]" style={{ color: C.textMuted }}>{t("Total Gross GMV")}</div>
            </div>
          </div>

          {/* Milestones Pipeline */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: C.textMuted }}>
              {t("Order Progress Milestones")}
            </div>
            <div className="space-y-2">
              {booking.milestones.map((m, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: m.done ? C.greenLight : C.bg,
                      color: m.done ? C.green : C.textMuted,
                      border: `1px solid ${m.done ? C.green : C.border}`,
                    }}>
                    {m.done ? <CheckCircle2 size={12} /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                  </div>
                  <div className="flex-1 min-w-0 font-medium truncate" style={{ color: m.done ? C.textPrimary : C.textMuted }}>
                    {t(m.title)}
                  </div>
                  <div className="font-mono text-[11px] shrink-0" style={{ color: m.done ? C.textSecondary : C.textMuted }}>
                    {m.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          className="px-6 py-3.5 border-t flex items-center justify-between shrink-0 gap-3"
          style={{ borderColor: C.border, background: C.bg }}
        >
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors"
            style={{ borderColor: C.border, color: C.textSecondary, background: C.card }}
          >
            {t("Close")}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReassign}
              disabled={reassigning}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors"
              style={{ borderColor: C.border, color: C.textPrimary, background: C.card }}
            >
              <RefreshCw size={12} className={reassigning ? "animate-spin" : ""} />
              <span>{t("Re-assign Driver")}</span>
            </button>

            <PrimaryBtn onClick={onClose}>
              <CheckCircle2 size={13} />
              <span>{t("Save & Update")}</span>
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
