// app/order/page.tsx

import OrderForm from "@/components/OrderForm";
import { Toaster } from "@/components/ui/toaster";

export default function OrderPage() {
  return (
    <main>
      <OrderForm />
      <Toaster />
    </main>
  );
}
