"use client";

import AppLayout from "@/components/layout/AppLayout";
import SalaryPredictor from "@/components/salary/SalaryPredictor";

export default function SalaryPredictorPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <SalaryPredictor />
      </div>
    </AppLayout>
  );
}
