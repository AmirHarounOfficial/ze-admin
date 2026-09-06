import React, { useState } from "react";
import { Bell, Phone, CreditCard, Map } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";

function MaskedInput({ label, value, masked, onSave }: { label: string; value: string; masked?: boolean; onSave?: () => void }) {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: C.border }}>
      <div className="flex-1 text-xs font-medium" style={{ color: C.textSecondary }}>{t(label)}</div>
      <div className="flex items-center gap-2">
        {editing ? (
          <input value={draft} onChange={e => setDraft(e.target.value)} autoFocus
            className="text-xs px-2 py-1 rounded border outline-none w-52"
            style={{ borderColor: C.gold, background: C.bg, color: C.textPrimary, fontFamily: "'JetBrains Mono', monospace" }} />
        ) : (
          <code className="text-xs px-2 py-1 rounded" style={{ background: C.bg, color: C.textPrimary, fontFamily: "'JetBrains Mono', monospace" }}>
            {masked && !show ? "•".repeat(draft.length) : draft}
          </code>
        )}
        {masked && !editing && (
          <button onClick={() => setShow(p => !p)} className="text-xs border px-2 py-1 rounded hover:bg-gray-50" style={{ borderColor: C.border, color: C.textSecondary }}>
            {show ? t("Hide") : t("Reveal")}
          </button>
        )}
        <button onClick={() => { if (editing) { setEditing(false); onSave?.(); } else setEditing(true); }}
          className="text-xs border px-2 py-1 rounded hover:bg-gray-50 transition-colors"
          style={{ borderColor: editing ? C.gold : C.border, color: editing ? C.gold : C.textSecondary, background: editing ? C.goldLight : "transparent" }}>
          {editing ? t("Save") : t("Edit")}
        </button>
      </div>
    </div>
  );
}

export function SettingsPage({ onToast }: { onToast?: (msg: string) => void }) {
  const notify = (msg: string) => onToast ? onToast(msg) : null;
  return (
    <div className="space-y-5">
      {[
        {
          icon: <Bell size={14} />, title: "Firebase FCM",
          desc: "Push notification dispatch for booking state changes (booking_accepted, order_ready).",
          color: C.orange,
          fields: [
            { label: "Project ID",       value: "zetime-prod-fcm",            masked: false },
            { label: "Server Key",       value: "AAAA3xKkFzY:APA91b…",        masked: true  },
            { label: "Service Account",  value: "firebase-adminsdk@…json",    masked: false },
          ],
        },
        {
          icon: <Phone size={14} />, title: "SMSala SMS Gateway",
          desc: "Phone verification OTPs and SMS callbacks (/api/smsala/callback).",
          color: C.green,
          fields: [
            { label: "API Username",   value: "zetime_sms",   masked: false },
            { label: "API Password",   value: "Sm5@l4P4ss!",  masked: true  },
            { label: "Sender ID",      value: "ZETIME",       masked: false },
          ],
        },
        {
          icon: <CreditCard size={14} />, title: "Payfort Payment Gateway",
          desc: "3DS secure redirection, deposit callbacks, and settlement processing.",
          color: C.blue,
          fields: [
            { label: "Merchant Identifier", value: "zetime_merchant",     masked: false },
            { label: "Access Code",         value: "ZnQW2Lm9x4K…",        masked: true  },
            { label: "SHA Request Phrase",  value: "SHA256Phr@se!",        masked: true  },
            { label: "SHA Response Phrase", value: "SHA256Resp!",          masked: true  },
          ],
        },
        {
          icon: <Map size={14} />, title: "OSRM / Maps Integration",
          desc: "Routing duration matrix for nearest captain dispatch. Falls back to haversine on OSRM failure.",
          color: C.purple,
          fields: [
            { label: "OSRM Base URL",     value: "https://router.project-osrm.org", masked: false },
            { label: "Google Maps Key",   value: "AIzaSy…Vp3K",                     masked: true  },
            { label: "Fallback Mode",     value: "haversine",                        masked: false },
          ],
        },
      ].map(section => (
        <div key={section.title} className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: C.border, background: "#F8FAFC" }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: section.color + "18", color: section.color }}>
              {section.icon}
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{section.title}</div>
              <div className="text-xs" style={{ color: C.textSecondary }}>{section.desc}</div>
            </div>
            <button className="ms-auto px-3 py-1.5 rounded-lg text-xs border hover:bg-gray-50 transition-colors" style={{ borderColor: C.border, color: C.textSecondary }}
              onClick={() => notify(`${section.title} connection test: OK ✓`)}>{t("Test Connection")}</button>
          </div>
          <div className="px-5">
            {section.fields.map(f => <MaskedInput key={f.label} {...f} onSave={() => notify(`${f.label} saved.`)} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
