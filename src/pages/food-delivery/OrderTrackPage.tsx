import React from "react";
import { useParams } from "react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  BackBtn, DetailHeader, InfoCard, Timeline, TableWrapper, Th, Td, Avatar, InfoRow
} from "@/components/ui/CommonUI";

const activeOrders = [
  { id: "ORD-7701", driver: "Maged Samir",  restaurant: "Burger Hub",     customer: "Sara Mohamed",  zone: "Dokki",      eta: "8 min",  status: "in-progress" },
  { id: "ORD-7700", driver: "Islam Nabil",  restaurant: "Le Grill",       customer: "Omar Saad",     zone: "Heliopolis", eta: "14 min", status: "in-progress" },
  { id: "ORD-7699", driver: "Ahmed Gouda",  restaurant: "Spice Route",    customer: "Nour Ali",      zone: "Maadi",      eta: "22 min", status: "in-progress" },
  { id: "ORD-7698", driver: "Ramy Fouad",   restaurant: "Nile Brasserie", customer: "Layla Hassan",  zone: "Zamalek",    eta: "5 min",  status: "in-progress" },
];

export function OrderTrackPage() {
  const { id = "ORD-7701" } = useParams();
  const order = activeOrders.find(o => o.id === id) ?? activeOrders[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/food-delivery" />
        <DetailHeader title={`Order ${id}`} id={id} subtitle={`${order.restaurant} → ${order.zone}`} badge={order.status} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <InfoCard title={t("Live Tracking Status")}>
            <Timeline steps={[
              { label: "Order Placed",        time: "09:42 AM", done: true  },
              { label: "Restaurant Confirmed", time: "09:43 AM", done: true  },
              { label: "Being Prepared",       time: "09:50 AM", done: true  },
              { label: "Picked Up by Driver",  time: "10:05 AM", done: true, active: false  },
              { label: "Out for Delivery",     time: "ETA " + order.eta, done: false, active: true },
              { label: "Delivered",            time: "Pending",  done: false },
            ]} />
          </InfoCard>
          <InfoCard title={t("Items Ordered")}>
            <TableWrapper>
              <thead><tr><Th>{t("Item")}</Th><Th>{t("Qty")}</Th><Th>{t("Unit Price")}</Th><Th>{t("Total")}</Th></tr></thead>
              <tbody>
                {[
                  { item: "Crispy Burger",        qty: 2, price: 85 },
                  { item: "Large Fries",           qty: 2, price: 35 },
                  { item: "Strawberry Milkshake",  qty: 1, price: 55 },
                ].map(i => (
                  <tr key={i.item} className="hover:bg-slate-50/60">
                    <Td>{i.item}</Td><Td>{i.qty}</Td>
                    <Td mono>EGP {i.price}</Td>
                    <Td mono>EGP {i.qty * i.price}</Td>
                  </tr>
                ))}
                <tr><Td colSpan={3}><span className="font-semibold">{t("Total")}</span></Td><Td mono><span className="font-bold">{t("EGP 295")}</span></Td></tr>
              </tbody>
            </TableWrapper>
          </InfoCard>
        </div>
        <div className="space-y-4">
          <InfoCard title={t("Driver")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={order.driver} size={32} /><span className="font-medium text-sm" style={{ color: C.textPrimary }}>{order.driver}</span></div>
            <InfoRow label={t("Restaurant")}   value={order.restaurant} />
            <InfoRow label={t("Delivery Zone")} value={order.zone} />
            <InfoRow label={t("ETA")}           value={<span className="font-bold" style={{ color: C.orange }}>{order.eta}</span>} />
            <InfoRow label={t("Vehicle")}       value="Motorcycle" />
            <InfoRow label={t("Phone")}         value="+20 100 000 1234" mono />
          </InfoCard>
          <InfoCard title={t("Customer")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={order.customer} size={32} /><span className="font-medium text-sm">{order.customer}</span></div>
            <InfoRow label={t("Delivery Address")} value="12 Tahrir St, Apt 4B" />
            <InfoRow label={t("Landmark")}         value="Near City Bank" />
            <InfoRow label={t("Contact")}          value="+20 111 000 5678" mono />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
