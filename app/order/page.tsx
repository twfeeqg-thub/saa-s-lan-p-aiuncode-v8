// app/order/page.tsx

import OrderForm from "@/components/OrderForm";
// --- بداية التعديل ---
// تم تغيير مسار الاستيراد من shadcn/ui إلى sonner
import { Toaster } from "sonner";
// --- نهاية التعديل ---

export default function OrderPage() {
  return (
    <main>
      <OrderForm />
      {/* الآن هذا المكون يستخدم مكتبة sonner مباشرة */}
      <Toaster richColors />
    </main>
  );
}
