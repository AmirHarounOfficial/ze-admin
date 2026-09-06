import React from "react";
import { useParams } from "react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  BackBtn, DetailHeader, InfoCard, Timeline, InfoRow, Avatar
} from "@/components/ui/CommonUI";

const liveParcels = [
  { id: "PKG-5501", provider: "SwiftShip",     sender: "Amr Tech Store",    recipient: "Sara Hassan",   weight: "1.2 kg", zone: "Dokki → Zamalek", eta: "14 min",  status: "in-transit" },
  { id: "PKG-5500", provider: "FlashEx Egypt", sender: "Noon Egypt",        recipient: "Omar Kamal",    weight: "3.5 kg", zone: "Heliopolis → Maadi", eta: "42 min", status: "in-transit" },
  { id: "PKG-5499", provider: "NextDay EG",    sender: "Amazon.eg",         recipient: "Nour Ali",      weight: "0.8 kg", zone: "Giza → New Cairo",   eta: "1.2 hrs", status: "in-transit" },
  { id: "PKG-5498", provider: "QuickBox",      sender: "Private Sender",    recipient: "Layla Fouad",   weight: "2.1 kg", zone: "Alex — Sidi Gaber",  eta: "20 min",  status: "in-transit" },
  { id: "PKG-5497", provider: "SwiftShip",     sender: "Carrefour",         recipient: "Mona Tarek",    weight: "5.0 kg", zone: "Maadi → Downtown",   eta: "—",       status: "failed"     },
];

export function ParcelTrackPage() {
  const { id = "PKG-5501" } = useParams();
  const parcel = liveParcels.find(p => p.id === id) ?? liveParcels[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/parcel-delivery" />
        <DetailHeader title={`Parcel ${id}`} id={id} subtitle={`${parcel.provider} · ${parcel.zone}`} badge={parcel.status === "in-transit" ? "in-progress" : parcel.status} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <InfoCard title={t("Tracking Timeline")}>
            <Timeline steps={[
              { label: "Parcel Collected from Sender", time: "Jul 09 — 08:00 AM", done: true },
              { label: "Arrived at Sorting Hub",      time: "Jul 09 — 09:30 AM", done: true },
              { label: "Dispatched to Courier",      time: "Jul 09 — 10:15 AM", done: true },
              { label: "Out for Delivery",           time: "ETA " + parcel.eta, done: parcel.status === "in-transit", active: parcel.status === "in-transit" },
              { label: "Delivered & Signed",         time: "Pending",           done: parcel.status === "completed" },
            ]} />
          </InfoCard>
          <InfoCard title={t("Package Specifications")}>
            <InfoRow label={t("Weight")}           value={parcel.weight} />
            <InfoRow label={t("Dimensions")}       value="30cm x 20cm x 15cm" />
            <InfoRow label={t("Declared Value")}   value="EGP 1,200" mono />
            <InfoRow label={t("Insurance Status")} value={<span style={{ color: C.green }}>{t("Insured (Standard)")}</span>} />
            <InfoRow label={t("Fragile Package")}  value="No" />
          </InfoCard>
        </div>
        <div className="space-y-4">
          <InfoCard title={t("Sender")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={parcel.sender} size={32} /><span className="font-medium text-sm">{parcel.sender}</span></div>
            <InfoRow label={t("Pickup Address")} value="15 El-Tahrir St, Dokki" />
            <InfoRow label={t("Contact")}        value="+20 100 999 1122" mono />
          </InfoCard>
          <InfoCard title={t("Recipient")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={parcel.recipient} size={32} /><span className="font-medium text-sm">{parcel.recipient}</span></div>
            <InfoRow label={t("Delivery Address")} value="88 26th of July St, Zamalek" />
            <InfoRow label={t("Contact")}          value="+20 111 888 3344" mono />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
