import React from "react";

export const revenueData = [
  { month: "Jan", gmv: 820000, revenue: 41000, bookings: 3200 },
  { month: "Feb", gmv: 932000, revenue: 46600, bookings: 3800 },
  { month: "Mar", gmv: 1010000, revenue: 50500, bookings: 4100 },
  { month: "Apr", gmv: 940000, revenue: 47000, bookings: 3750 },
  { month: "May", gmv: 1150000, revenue: 57500, bookings: 4600 },
  { month: "Jun", gmv: 1280000, revenue: 64000, bookings: 5200 },
  { month: "Jul", gmv: 1190000, revenue: 59500, bookings: 4900 },
];

export const serviceBreakdown = [
  { name: "Home Services", value: 32, color: "#06854d" },
  { name: "Food Delivery",  value: 28, color: "#2563EB" },
  { name: "Property",       value: 18, color: "#de8208" },
  { name: "Restaurant",     value: 12, color: "#6366f1" },
  { name: "Roadside",       value: 10, color: "#EF4444" },
];

export const recentBookings = [
  { id: "#B-20471", customerId: "C-5881", customer: "Sara Mohamed",  service: "Home Cleaning", provider: "CleanPro EG",   amount: "EGP 350",  status: "completed",  time: "2 min ago" },
  { id: "#B-20470", customerId: "C-5880", customer: "Ahmed Khaled",  service: "Car Wash",      provider: "AutoSpark",     amount: "EGP 180",  status: "pending",    time: "5 min ago" },
  { id: "#B-20469", customerId: "C-5879", customer: "Nour Ali",      service: "Food Delivery", provider: "Burger Hub",   amount: "EGP 210",  status: "preparing",  time: "8 min ago" },
  { id: "#B-20468", customerId: "C-5878", customer: "Omar Saad",     service: "Property",      provider: "PropEgypt",    amount: "EGP 2400", status: "completed",  time: "14 min ago" },
  { id: "#B-20467", customerId: "C-5877", customer: "Layla Hassan",  service: "Roadside",      provider: "QuickTow",     amount: "EGP 450",  status: "cancelled",  time: "21 min ago" },
  { id: "#B-20466", customerId: "C-5876", customer: "Youssef Fathy", service: "Restaurant",    provider: "Le Grill",     amount: "EGP 760",  status: "completed",  time: "32 min ago" },
];

export const providerQueue = [
  { id: "P-1021", name: "TechFix Cairo",  category: "Home Services", submitted: "2024-07-08", docs: 4, status: "pending" },
  { id: "P-1020", name: "DriveEasy Co.",  category: "Car Services",  submitted: "2024-07-07", docs: 3, status: "pending" },
  { id: "P-1019", name: "CoolBreeze AC",  category: "Home Services", submitted: "2024-07-06", docs: 4, status: "pending" },
];

export const customerData = [
  { id: "C-5881", name: "Sara Mohamed",  email: "sara@mail.com",   wallet: "EGP 320", bookings: 14, status: "active",    joined: "Jan 2024" },
  { id: "C-5880", name: "Ahmed Khaled",  email: "ahmed@mail.com",  wallet: "EGP 80",  bookings: 7,  status: "active",    joined: "Feb 2024" },
  { id: "C-5879", name: "Nour Ali",      email: "nour@mail.com",   wallet: "EGP 0",   bookings: 2,  status: "suspended", joined: "Mar 2024" },
  { id: "C-5878", name: "Omar Saad",     email: "omar@mail.com",   wallet: "EGP 550", bookings: 21, status: "active",    joined: "Dec 2023" },
  { id: "C-5877", name: "Layla Hassan",  email: "layla@mail.com",  wallet: "EGP 120", bookings: 9,  status: "active",    joined: "Apr 2024" },
  { id: "C-5876", name: "Youssef Fathy", email: "youss@mail.com",  wallet: "EGP 200", bookings: 5,  status: "active",    joined: "May 2024" },
];

export const supportTickets = [
  { id: "T-3411", user: "Sara Mohamed",  issue: "Payment not refunded",   priority: "high",   status: "open",        age: "2h" },
  { id: "T-3410", user: "Ahmed Khaled",  issue: "Provider no-show",        priority: "medium", status: "in-progress", age: "5h" },
  { id: "T-3409", user: "Nour Ali",      issue: "Wrong order delivered",   priority: "high",   status: "open",        age: "8h" },
  { id: "T-3408", user: "Omar Saad",     issue: "App login issue",          priority: "low",    status: "resolved",    age: "1d" },
  { id: "T-3407", user: "Layla Hassan",  issue: "Driver was late 45 min",  priority: "medium", status: "in-progress", age: "1d" },
];

export const transactionData = [
  { id: "TX-9821", type: "Payment", user: "Sara Mohamed",  amount: "EGP 350",  method: "Payfort", status: "success", date: "Jul 09" },
  { id: "TX-9820", type: "Refund",  user: "Layla Hassan",  amount: "EGP 450",  method: "Wallet",  status: "success", date: "Jul 09" },
  { id: "TX-9819", type: "Payment", user: "Omar Saad",     amount: "EGP 2400", method: "Cash",    status: "pending", date: "Jul 08" },
  { id: "TX-9818", type: "Payout",  user: "CleanPro EG",   amount: "EGP 3200", method: "Bank",    status: "success", date: "Jul 08" },
  { id: "TX-9817", type: "Payment", user: "Youssef Fathy", amount: "EGP 760",  method: "Payfort", status: "failed",  date: "Jul 07" },
];

export const merchantData = [
  { id: "M-301", name: "CleanPro EG",       modules: ["Home Services"],          rating: 4.8, status: "active",   joined: "2023-11" },
  { id: "M-302", name: "Burger Hub",        modules: ["Food Delivery"],          rating: 4.6, status: "active",   joined: "2023-09" },
  { id: "M-303", name: "PropEgypt Agency",  modules: ["Property"],               rating: 4.9, status: "active",   joined: "2024-01" },
  { id: "M-304", name: "QuickTow Services", modules: ["Roadside Assistance"],   rating: 4.3, status: "suspended",joined: "2023-08" },
  { id: "M-305", name: "AutoSpark Garage",  modules: ["Car Services"],           rating: 4.7, status: "active",   joined: "2024-02" },
];

export const mapZones = [
  { city: "Cairo",       activeJobs: 142, captains: 38, avgResp: "3.2 min", coverage: 94, drivers: 61 },
  { city: "Alexandria",  activeJobs: 67,  captains: 19, avgResp: "4.1 min", coverage: 88, drivers: 27 },
  { city: "Giza",        activeJobs: 88,  captains: 24, avgResp: "3.8 min", coverage: 91, drivers: 34 },
  { city: "6th October", activeJobs: 31,  captains: 10, avgResp: "5.4 min", coverage: 74, drivers: 14 },
  { city: "New Cairo",   activeJobs: 54,  captains: 15, avgResp: "4.7 min", coverage: 83, drivers: 22 },
  { city: "Mansoura",    activeJobs: 22,  captains: 7,  avgResp: "6.2 min", coverage: 68, drivers: 9  },
];

export const NOTIF_DATA = [
  { id: "N-101", type: "alert" as const, title: "SLA Delay Alert", body: "3 towing requests in Ring Road breach 60s target", time: "2m ago", unread: true, page: "/operations/roadside", icon: "⚠️", iconColor: "#ef4444" },
  { id: "N-102", type: "provider" as const, title: "New Provider Application", body: "TechFix Cairo submitted KYC documents for review", time: "15m ago", unread: true, page: "/providers/queue", icon: "🏢", iconColor: "#3b82f6" },
  { id: "N-103", type: "finance" as const, title: "Payout Request Pending", body: "Burger Hub requested EGP 14,800 withdrawal", time: "1h ago", unread: true, page: "/financial/payouts", icon: "💰", iconColor: "#10b981" },
  { id: "N-104", type: "support" as const, title: "High Priority Ticket", body: "Sara Mohamed reported 90 min AC technician delay", time: "2h ago", unread: false, page: "/support/tickets", icon: "🎫", iconColor: "#f59e0b" },
  { id: "N-105", type: "review" as const, title: "1-Star Review Flagged", body: "Nour Ali left 1-star review for Burger Hub", time: "3h ago", unread: false, page: "/support/reviews", icon: "⭐", iconColor: "#8b5cf6" },
];

export const activityFeed = [
  { id: "ACT-01", text: "Provider TechFix Cairo uploaded commercial register", time: "5m ago" },
  { id: "ACT-02", text: "Customer Sara Mohamed completed booking #B-20471", time: "12m ago" },
  { id: "ACT-03", text: "Towing dispatch #IA-5501 completed in Ring Road", time: "28m ago" },
  { id: "ACT-04", text: "Burger Hub submitted payout request EGP 14,800", time: "1h ago" },
  { id: "ACT-05", text: "New handyman Hassan Emad assigned to Zamalek zone", time: "2h ago" },
];

export const hrmEmployees = [
  { id: "EMP-001", name: "Youssef Mansour", role: "VP of Engineering",   dept: "Engineering", salary: "EGP 85,000", joined: "Jan 2022", status: "active",   email: "youssef@zetime.app", phone: "+20 100 111 2233" },
  { id: "EMP-002", name: "Dina Hassan",     role: "Head of Marketing",   dept: "Marketing",   salary: "EGP 62,000", joined: "Mar 2022", status: "on_leave", email: "dina@zetime.app",    phone: "+20 111 444 5566" },
  { id: "EMP-003", name: "Tarek Salah",     role: "Operations Manager",  dept: "Operations",  salary: "EGP 54,000", joined: "Jun 2022", status: "active",   email: "tarek@zetime.app",   phone: "+20 101 777 8899" },
  { id: "EMP-004", name: "Karim Adel",      role: "Senior Backend Dev",  dept: "Engineering", salary: "EGP 48,000", joined: "Nov 2022", status: "active",   email: "karim@zetime.app",   phone: "+20 122 333 4455" },
  { id: "EMP-005", name: "Hana Mostafa",    role: "Frontend Engineer",   dept: "Engineering", salary: "EGP 38,000", joined: "Feb 2023", status: "active",   email: "hana@zetime.app",    phone: "+20 100 555 6677" },
  { id: "EMP-006", name: "Nada Ramadan",    role: "Finance Lead",        dept: "Finance",     salary: "EGP 52,000", joined: "Apr 2023", status: "active",   email: "nada@zetime.app",    phone: "+20 111 222 3344" },
];

export const hrmDepartments = [
  { id: "DEP-01", name: "Engineering", head: "Youssef Mansour", headcount: 14, budget: "EGP 720K" },
  { id: "DEP-02", name: "Operations",  head: "Tarek Salah",     headcount: 22, budget: "EGP 480K" },
  { id: "DEP-03", name: "Marketing",   head: "Dina Hassan",     headcount: 8,  budget: "EGP 350K" },
  { id: "DEP-04", name: "Finance",     head: "Nada Ramadan",    headcount: 5,  budget: "EGP 295K" },
];

export const handymen = [
  { id: "H-201", name: "Hassan Emad",    phone: "+20 100 111 2233", specialty: ["Plumbing", "Electrical"], zone: "Zamalek",    status: "available", rating: 4.9, cert: "Master Plumber", bookings: 8 },
  { id: "H-202", name: "Karim Zidan",    phone: "+20 111 333 4455", specialty: ["AC", "Appliances"],       zone: "Heliopolis", status: "busy",      rating: 4.7, cert: "HVAC Tech",       bookings: 12 },
  { id: "H-203", name: "Mostafa Saad",   phone: "+20 101 555 6677", specialty: ["Carpentry", "Painting"],  zone: "Maadi",      status: "available", rating: 4.8, cert: "Master Carpenter",bookings: 5 },
  { id: "H-204", name: "Adel Ibrahim",   phone: "+20 122 777 8899", specialty: ["Cleaning", "Pest"],       zone: "New Cairo",  status: "offline",   rating: 4.4, cert: "Sanitation Cert", bookings: 2 },
];

export const allListings = [
  { id: "PR-801", name: "Nile View Penthouse",     type: "Apartment", city: "Zamalek",    provider: "PropEgypt",    provId: "M-0421", price: 3500, occupancy: 88, bookings: 14, commission: 4, status: "active"  },
  { id: "PR-802", name: "Modern Heliopolis Villa",  type: "Villa",     city: "Heliopolis", provider: "CairoRent",   provId: "M-0422", price: 6200, occupancy: 72, bookings: 9,  commission: 4, status: "active"  },
  { id: "PR-803", name: "Cozy Studio in Maadi",     type: "Studio",    city: "Maadi",      provider: "NileHomes",   provId: "M-0423", price: 1800, occupancy: 94, bookings: 22, commission: 5, status: "active"  },
  { id: "PR-804", name: "New Cairo Family Chalet", type: "Chalet",    city: "New Cairo",  provider: "PropEgypt",    provId: "M-0421", price: 4500, occupancy: 61, bookings: 6,  commission: 4, status: "pending" },
];

export const restaurantProviders = [
  { id: "RS-101", name: "Le Grill",        provId: "M-0401", city: "Zamalek",    tables: 18, resvsToday: 42, avgWait: "12 min", rating: 4.8, slaOk: true,  status: "active"    },
  { id: "RS-102", name: "Burger Hub",      provId: "M-0402", city: "Heliopolis", tables: 12, resvsToday: 35, avgWait: "18 min", rating: 4.6, slaOk: true,  status: "active"    },
  { id: "RS-103", name: "Lotus Garden",    provId: "M-0403", city: "Maadi",      tables: 24, resvsToday: 58, avgWait: "24 min", rating: 4.4, slaOk: false, status: "active"    },
  { id: "RS-104", name: "Nile Brasserie",  provId: "M-0404", city: "Downtown",   tables: 15, resvsToday: 21, avgWait: "15 min", rating: 4.9, slaOk: true,  status: "active"    },
  { id: "RS-105", name: "Spice Route",     provId: "M-0405", city: "New Cairo",  tables: 20, resvsToday: 0,  avgWait: "—",      rating: 3.9, slaOk: false, status: "suspended" },
];

export const liveReservations = [
  { id: "RES-401", restaurant: "Le Grill",       guest: "Sara Mohamed",  party: 4, time: "08:00 PM", table: "Table 7",  status: "confirmed" },
  { id: "RES-402", restaurant: "Burger Hub",     guest: "Ahmed Khaled",  party: 2, time: "08:30 PM", table: "Table 3",  status: "seated"    },
  { id: "RES-403", restaurant: "Lotus Garden",   guest: "Nour Ali",      party: 6, time: "09:00 PM", table: "Table 12", status: "confirmed" },
  { id: "RES-404", restaurant: "Nile Brasserie", guest: "Omar Saad",     party: 2, time: "07:30 PM", table: "Table 2",  status: "completed" },
];



