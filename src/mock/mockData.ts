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
  { id: "M-301", name: "CleanPro EG",       category: "Home Services",     modules: ["Home Services"],          points: 1240, rating: 4.8, status: "active",   joined: "2023-11" },
  { id: "M-302", name: "Burger Hub",        category: "Food & Dining",     modules: ["Food Delivery"],          points: 3820, rating: 4.6, status: "active",   joined: "2023-09" },
  { id: "M-303", name: "PropEgypt Agency",  category: "Property Rentals",  modules: ["Property"],               points: 850,  rating: 4.9, status: "active",   joined: "2024-01" },
  { id: "M-304", name: "QuickTow Services", category: "Roadside Assist",   modules: ["Roadside Assistance"],   points: 410,  rating: 4.3, status: "suspended",joined: "2023-08" },
  { id: "M-305", name: "AutoSpark Garage",  category: "Car Maintenance",   modules: ["Car Services"],           points: 2190, rating: 4.7, status: "active",   joined: "2024-02" },
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

export const detailedRecentBookings = [
  {
    id: "#B-20471",
    customerId: "C-5881",
    customer: "Sara Mohamed",
    customerPhone: "+20 100 892 1144",
    service: "Home Cleaning",
    vertical: "home-services",
    provider: "CleanPro EG",
    providerRating: 4.8,
    providerPhone: "+20 111 555 9900",
    assignedWorker: "Mahmoud Sobhy",
    workerPhone: "+20 102 334 5566",
    vehiclePlate: "س ق ص 4412",
    amount: "EGP 350",
    paymentMethod: "Payfort (Visa •••• 4021)",
    paymentStatus: "Paid" as const,
    status: "in_progress" as const,
    city: "Cairo",
    zone: "Maadi",
    address: "Bldg 14, Street 9, Maadi, Cairo",
    time: "2 min ago",
    eta: "14 min",
    milestones: [
      { title: "Booking Placed by Customer", time: "14:10", done: true },
      { title: "Merchant Dispatched Worker", time: "14:12", done: true },
      { title: "Worker En Route via GPS", time: "14:15", done: true },
      { title: "Service Commenced on Site", time: "14:24", done: false },
      { title: "Job Inspection & Completion", time: "Pending", done: false },
    ],
  },
  {
    id: "#B-20470",
    customerId: "C-5880",
    customer: "Ahmed Khaled",
    customerPhone: "+20 101 223 9988",
    service: "Car Wash",
    vertical: "car-services",
    provider: "AutoSpark Garage",
    providerRating: 4.7,
    providerPhone: "+20 112 444 8811",
    assignedWorker: "Karim Zidan",
    workerPhone: "+20 106 778 9900",
    vehiclePlate: "ط ر ب 9012",
    amount: "EGP 180",
    paymentMethod: "ZeTime Wallet (Balance)",
    paymentStatus: "Paid" as const,
    status: "pending" as const,
    city: "Cairo",
    zone: "Dokki",
    address: "Bldg 5, Mossaddak St, Dokki, Giza",
    time: "5 min ago",
    eta: "8 min",
    milestones: [
      { title: "Booking Placed by Customer", time: "14:07", done: true },
      { title: "Searching Nearby Mobile Van", time: "14:08", done: true },
      { title: "Mobile Tech Accepted", time: "14:12", done: true },
      { title: "En Route to Vehicle Location", time: "14:15", done: false },
      { title: "Detailing Completed", time: "Pending", done: false },
    ],
  },
  {
    id: "#B-20469",
    customerId: "C-5879",
    customer: "Nour Ali",
    customerPhone: "+20 122 445 6677",
    service: "Food Delivery",
    vertical: "food-delivery",
    provider: "Burger Hub",
    providerRating: 4.6,
    providerPhone: "+20 110 332 1199",
    assignedWorker: "Amr Mostafa",
    workerPhone: "+20 109 443 2211",
    vehiclePlate: "ب ي ك 3381",
    amount: "EGP 210",
    paymentMethod: "Apple Pay (Mastercard)",
    paymentStatus: "Paid" as const,
    status: "preparing" as const,
    city: "Cairo",
    zone: "Heliopolis",
    address: "El Merghany St, Heliopolis, Cairo",
    time: "8 min ago",
    eta: "18 min",
    milestones: [
      { title: "Order Placed & Paid", time: "14:04", done: true },
      { title: "Kitchen Accepted Order", time: "14:05", done: true },
      { title: "Order In Kitchen Prep", time: "14:07", done: true },
      { title: "Rider Picked Up", time: "Pending", done: false },
      { title: "Delivered to Door", time: "Pending", done: false },
    ],
  },
  {
    id: "#B-20468",
    customerId: "C-5878",
    customer: "Omar Saad",
    customerPhone: "+20 111 889 0022",
    service: "Property Rental",
    vertical: "property",
    provider: "PropEgypt Agency",
    providerRating: 4.9,
    providerPhone: "+20 100 776 5544",
    assignedWorker: "Hany Nabil (Agent)",
    workerPhone: "+20 114 556 7788",
    amount: "EGP 2400",
    paymentMethod: "InstaPay Direct",
    paymentStatus: "Paid" as const,
    status: "completed" as const,
    city: "Cairo",
    zone: "New Cairo",
    address: "Villa 22, 5th Settlement, New Cairo",
    time: "14 min ago",
    milestones: [
      { title: "Viewing Request", time: "10:30", done: true },
      { title: "Key Escort Assigned", time: "11:00", done: true },
      { title: "Check-in Handover", time: "13:30", done: true },
      { title: "Contract Signed & Verified", time: "13:58", done: true },
      { title: "Settlement Disbursed", time: "14:05", done: true },
    ],
  },
  {
    id: "#B-20467",
    customerId: "C-5877",
    customer: "Layla Hassan",
    customerPhone: "+20 102 998 7766",
    service: "Roadside Rescue",
    vertical: "roadside",
    provider: "QuickTow Services",
    providerRating: 4.3,
    providerPhone: "+20 115 889 4433",
    assignedWorker: "Mostafa Nasser",
    workerPhone: "+20 100 223 4455",
    vehiclePlate: "و ن ش 7714",
    amount: "EGP 450",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Refunded" as const,
    status: "cancelled" as const,
    city: "Cairo",
    zone: "Ring Road",
    address: "Ring Road near Katameya exit, km 28",
    time: "21 min ago",
    milestones: [
      { title: "SOS Beacon Activated", time: "13:48", done: true },
      { title: "Captain Dispatched", time: "13:50", done: true },
      { title: "Customer Cancelled (Third-party assistance found)", time: "14:00", done: true },
    ],
  },
  {
    id: "#B-20466",
    customerId: "C-5876",
    customer: "Youssef Fathy",
    customerPhone: "+20 114 776 5533",
    service: "Restaurant Booking",
    vertical: "restaurant",
    provider: "Le Grill",
    providerRating: 4.8,
    providerPhone: "+20 101 443 2211",
    amount: "EGP 760",
    paymentMethod: "Payfort (Mastercard)",
    paymentStatus: "Paid" as const,
    status: "completed" as const,
    city: "Cairo",
    zone: "Zamalek",
    address: "26th of July St, Zamalek, Cairo",
    time: "32 min ago",
    milestones: [
      { title: "Reservation Placed", time: "13:00", done: true },
      { title: "Host Confirmed Table 4", time: "13:05", done: true },
      { title: "Guests Seated", time: "13:30", done: true },
      { title: "Order Billed & Settled", time: "13:50", done: true },
    ],
  },
];

export const emergencyAlerts = [
  {
    id: "SOS-901",
    severity: "critical" as const,
    title: "Roadside SOS: Flat Tyre & Highway Stalled",
    zone: "Ring Road (near Maadi Exit)",
    service: "Roadside Rescue",
    time: "3 min ago",
    contact: "+20 100 882 1199",
    status: "unassigned" as const,
  },
  {
    id: "SLA-402",
    severity: "warning" as const,
    title: "SLA Threshold Alert: 4 Food Fleet Orders Delay > 15m",
    zone: "Dokki & Agouza",
    service: "Food Delivery",
    time: "7 min ago",
    contact: "+20 111 445 8899",
    status: "escalated" as const,
  },
];

export const timeSeriesData = {
  today: [
    { time: "00:00", gmv: 18000, revenue: 900, orders: 48, responseSec: 46 },
    { time: "03:00", gmv: 9000,  revenue: 450, orders: 22, responseSec: 48 },
    { time: "06:00", gmv: 14000, revenue: 700, orders: 36, responseSec: 44 },
    { time: "09:00", gmv: 62000, revenue: 3100, orders: 180, responseSec: 39 },
    { time: "12:00", gmv: 114000, revenue: 5700, orders: 340, responseSec: 41 },
    { time: "15:00", gmv: 98000, revenue: 4900, orders: 290, responseSec: 43 },
    { time: "18:00", gmv: 148000, revenue: 7400, orders: 460, responseSec: 38 },
    { time: "21:00", gmv: 132000, revenue: 6600, orders: 410, responseSec: 40 },
  ],
  yesterday: [
    { time: "00:00", gmv: 16000, revenue: 800, orders: 42, responseSec: 45 },
    { time: "03:00", gmv: 8000,  revenue: 400, orders: 19, responseSec: 49 },
    { time: "06:00", gmv: 12000, revenue: 600, orders: 31, responseSec: 43 },
    { time: "09:00", gmv: 58000, revenue: 2900, orders: 168, responseSec: 41 },
    { time: "12:00", gmv: 108000, revenue: 5400, orders: 320, responseSec: 40 },
    { time: "15:00", gmv: 92000, revenue: 4600, orders: 275, responseSec: 42 },
    { time: "18:00", gmv: 141000, revenue: 7050, orders: 435, responseSec: 39 },
    { time: "21:00", gmv: 126000, revenue: 6300, orders: 390, responseSec: 41 },
  ],
  "7d": [
    { time: "Mon", gmv: 540000, revenue: 27000, orders: 1620, responseSec: 42 },
    { time: "Tue", gmv: 580000, revenue: 29000, orders: 1740, responseSec: 41 },
    { time: "Wed", gmv: 610000, revenue: 30500, orders: 1830, responseSec: 40 },
    { time: "Thu", gmv: 740000, revenue: 37000, orders: 2220, responseSec: 43 },
    { time: "Fri", gmv: 890000, revenue: 44500, orders: 2670, responseSec: 45 },
    { time: "Sat", gmv: 820000, revenue: 41000, orders: 2460, responseSec: 42 },
    { time: "Sun", gmv: 590000, revenue: 29500, orders: 1770, responseSec: 40 },
  ],
  "30d": [
    { time: "Week 1", gmv: 3400000, revenue: 170000, orders: 10200, responseSec: 42 },
    { time: "Week 2", gmv: 3750000, revenue: 187500, orders: 11250, responseSec: 41 },
    { time: "Week 3", gmv: 3980000, revenue: 199000, orders: 11940, responseSec: 40 },
    { time: "Week 4", gmv: 4200000, revenue: 210000, orders: 12600, responseSec: 41 },
  ],
};

export const districtDemandSupply = [
  { name: "Dokki & Agouza",       city: "Cairo", activeOrders: 42, availableFleet: 31, gap: -11, surge: 1.3, surgeActive: true,  avgWait: "3.4 min", lat: 30.0400, lng: 31.2150 },
  { name: "Zamalek",              city: "Cairo", activeOrders: 28, availableFleet: 34, gap: +6,  surge: 1.0, surgeActive: false, avgWait: "2.8 min", lat: 30.0600, lng: 31.2200 },
  { name: "Maadi & Degla",        city: "Cairo", activeOrders: 38, availableFleet: 29, gap: -9,  surge: 1.2, surgeActive: true,  avgWait: "3.9 min", lat: 30.0131, lng: 31.2089 },
  { name: "Nasr City",            city: "Cairo", activeOrders: 64, availableFleet: 48, gap: -16, surge: 1.4, surgeActive: true,  avgWait: "4.8 min", lat: 30.0660, lng: 31.3381 },
  { name: "Heliopolis",           city: "Cairo", activeOrders: 51, availableFleet: 56, gap: +5,  surge: 1.0, surgeActive: false, avgWait: "3.1 min", lat: 30.0922, lng: 31.3297 },
  { name: "New Cairo (Tagamoa)",  city: "Cairo", activeOrders: 58, availableFleet: 42, gap: -16, surge: 1.5, surgeActive: true,  avgWait: "5.2 min", lat: 30.0222, lng: 31.4763 },
  { name: "6th of October",       city: "Giza",  activeOrders: 33, availableFleet: 24, gap: -9,  surge: 1.2, surgeActive: true,  avgWait: "5.8 min", lat: 29.9700, lng: 30.9500 },
  { name: "Sidi Gaber & Smouha",  city: "Alexandria", activeOrders: 39, availableFleet: 44, gap: +5, surge: 1.0, surgeActive: false, avgWait: "3.6 min", lat: 31.2156, lng: 29.9553 },
];

export const gatewayHealthServices = [
  { label: "API Gateway (Kong)",      status: "online",   latency: "24ms", uptime: "99.98%", failover: "Active" },
  { label: "Payfort Payment Gateway", status: "online",   latency: "142ms", uptime: "99.92%", failover: "Standby" },
  { label: "FCM Push Notification",   status: "online",   latency: "86ms", uptime: "99.89%", failover: "Active" },
  { label: "OSRM Routing Engine",     status: "degraded", latency: "380ms", uptime: "98.40%", failover: "Degraded" },
  { label: "PostgreSQL Primary DB",   status: "online",   latency: "12ms", uptime: "99.99%", failover: "Replicated" },
  { label: "Redis Fleet Telemetry",   status: "online",   latency: "4ms",  uptime: "100%",   failover: "Active" },
];




