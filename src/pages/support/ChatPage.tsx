import React, { useState } from "react";
import { Send, Phone } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { Avatar, OutlineBtn } from "@/components/ui/CommonUI";

const conversations = [
  { id: "CH-201", user: "Sara Mohamed",  provider: "CleanPro EG",   last: "The cleaner arrived late again…", time: "2m", unread: 2  },
  { id: "CH-200", user: "Ahmed Khaled",  provider: "AutoSpark",      last: "Can you reschedule my appointment?", time: "15m", unread: 0 },
  { id: "CH-199", user: "Nour Ali",      provider: "Burger Hub",     last: "Order is missing two items",  time: "1h", unread: 4  },
  { id: "CH-198", user: "Omar Saad",     provider: "PropEgypt",      last: "Confirmed for Saturday night.",time: "3h", unread: 0  },
  { id: "CH-197", user: "Layla Hassan",  provider: "QuickTow",       last: "Towing truck is 10 mins away.", time: "4h", unread: 1 },
];

const chatMessages = [
  { from: "user",     text: "The cleaner arrived 30 minutes late.",                time: "10:02 AM" },
  { from: "provider", text: "I apologize for the delay, there was heavy traffic.", time: "10:05 AM" },
  { from: "user",     text: "This keeps happening. I want a refund.",              time: "10:07 AM" },
  { from: "system",   text: "Support agent joined the conversation.",              time: "10:10 AM" },
  { from: "agent",    text: "Hello Sara, I can see the booking details. I will process a partial refund of EGP 50 to your wallet now.", time: "10:11 AM" },
];

export function ChatPage({ onToast }: { onToast?: (m: string) => void }) {
  const [active, setActive] = useState(conversations[0].id);
  const [message, setMessage] = useState("");
  const activeConv = conversations.find(c => c.id === active) ?? conversations[0];
  const notify = (m: string) => onToast ? onToast(m) : null;

  return (
    <div className="rounded-xl border overflow-hidden flex" style={{ background: C.card, borderColor: C.border, height: "calc(100vh - 140px)" }}>
      <div className="w-72 border-r flex flex-col shrink-0" style={{ borderColor: C.border }}>
        <div className="p-4 border-b text-xs font-semibold uppercase tracking-wide" style={{ borderColor: C.border, color: C.textMuted }}>{t("Live Conversations")}</div>
        <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: C.border }}>
          {conversations.map(c => (
            <div key={c.id} onClick={() => setActive(c.id)} className="p-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
              style={{ background: active === c.id ? C.bg : "transparent" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs" style={{ color: C.textPrimary }}>{c.user}</span>
                <span className="text-xs" style={{ color: C.textMuted }}>{c.time}</span>
              </div>
              <div className="text-xs mb-1" style={{ color: C.textSecondary }}>{c.provider}</div>
              <div className="text-xs truncate" style={{ color: C.textMuted }}>{c.last}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: C.border, background: "#F8FAFC" }}>
          <div>
            <div className="font-bold text-sm" style={{ color: C.textPrimary }}>{activeConv.user} ↔ {activeConv.provider}</div>
            <div className="text-xs" style={{ color: C.textMuted }}>{t("Session ID:")} {activeConv.id}</div>
          </div>
          <OutlineBtn small onClick={() => notify("Connecting to user phone line…")}><Phone size={12} />{t("Call User")}</OutlineBtn>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatMessages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.from === "agent" ? "items-end" : m.from === "system" ? "items-center" : "items-start"}`}>
              {m.from === "system" ? (
                <span className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: C.border, background: C.bg, color: C.textMuted }}>{m.text}</span>
              ) : (
                <>
                  <div className="text-xs mb-1" style={{ color: C.textMuted }}>
                    {m.from === "user" ? activeConv.user : m.from === "provider" ? activeConv.provider : "Support Agent"} · {m.time}
                  </div>
                  <div className="max-w-md px-4 py-2.5 rounded-xl text-xs leading-relaxed"
                    style={{
                      background: m.from === "user" ? C.blueLight : m.from === "provider" ? C.bg : C.gold,
                      color: m.from === "user" ? C.blueMid : m.from === "provider" ? C.textPrimary : "#fff",
                      border: m.from === "provider" ? `1px solid ${C.border}` : "none",
                    }}>
                    {m.text}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex gap-2" style={{ borderColor: C.border, background: C.bg }}>
          <input value={message} onChange={e => setMessage(e.target.value)}
            placeholder={t("Type agent message into thread…")}
            className="flex-1 px-3 py-2 rounded-lg border text-sm outline-none" style={{ borderColor: C.border, background: C.card, color: C.textPrimary }}
            onKeyDown={e => { if (e.key === "Enter" && message.trim()) { notify("Message sent to conversation."); setMessage(""); } }} />
          <button onClick={() => { if (message.trim()) { notify("Message sent to conversation."); setMessage(""); } }}
            className="px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5" style={{ background: C.gold, color: "#fff" }}>
            <Send size={13} />{t("Send")}
          </button>
        </div>
      </div>
    </div>
  );
}
