"use client";

import AppLayout from "@/components/layout/AppLayout";
import ProfileModule from "@/components/profile/ProfileModule";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="p-8">
        <ProfileModule />
      </div>
    </AppLayout>
  );
}
