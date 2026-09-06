export const C = {
  sidebar: "#073863", sidebarHover: "#0a4a7a", sidebarActive: "#DB8C00",
  sidebarText: "#94A3B8", sidebarLabel: "#7aafd4",
  gold: "#DB8C00", goldLight: "#FEF3DC",
  green: "#06854d", greenLight: "#e6f4ee", greenText: "#06854d",
  blue: "#063259", blueLight: "#dbeafe", blueMid: "#2563EB",
  orange: "#de8208", orangeLight: "#fef4e6",
  red: "#EF4444", redLight: "#FEE2E2",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
  bg: "#F9FAFB", card: "#FFFFFF", border: "#E2E8F0",
  textPrimary: "#0F172A", textSecondary: "#64748B", textMuted: "#94A3B8",
};

export const C_DARK = {
  bg: "#0d1117", card: "#161b22", border: "#30363d", textPrimary: "#e6edf3",
  textSecondary: "#848d97", textMuted: "#6e7781", goldLight: "#2a1e00",
  greenLight: "#052e16", greenText: "#10b981", green: "#10b981",
  blueLight: "#172554", blueMid: "#60a5fa", orangeLight: "#431407",
  orange: "#f59e0b", redLight: "#450a0a", red: "#f87171",
  purpleLight: "#1e1b4b", purple: "#a78bfa", blue: "#1d3461"
};

export const C_LIGHT = {
  bg: "#F9FAFB", card: "#FFFFFF", border: "#E2E8F0", textPrimary: "#0F172A",
  textSecondary: "#64748B", textMuted: "#94A3B8", goldLight: "#FEF3DC",
  greenLight: "#e6f4ee", greenText: "#06854d", green: "#06854d",
  blueLight: "#dbeafe", blueMid: "#2563EB", orangeLight: "#fef4e6",
  orange: "#de8208", redLight: "#FEE2E2", red: "#EF4444",
  purpleLight: "#EDE9FE", purple: "#7C3AED", blue: "#063259"
};

export let _dark = false;
export let _lang: "en" | "ar" = (typeof localStorage !== "undefined" && (localStorage.getItem("zetime_lang") as "en" | "ar")) || "ar";

export function applyTheme() {
  Object.assign(C, _dark ? C_DARK : C_LIGHT);
  if (typeof localStorage !== "undefined") localStorage.setItem("zetime_lang", _lang);
  document.documentElement.dir = _lang === "ar" ? "rtl" : "ltr";
  document.documentElement.style.background = C.bg;
}

export function setDark(val: boolean) {
  _dark = val;
}

export function setLang(val: "en" | "ar") {
  _lang = val;
}

let _onLogout: (() => void) | null = null;
export function registerLogout(fn: () => void) {
  _onLogout = fn;
}

export function doLogout() {
  _dark = false;
  _lang = "en";
  applyTheme();
  try {
    localStorage.removeItem("zetime_auth");
    localStorage.removeItem("zetime_user");
  } catch {}
  _onLogout?.();
}

// Initial theme application
if (typeof window !== "undefined") {
  applyTheme();
}
