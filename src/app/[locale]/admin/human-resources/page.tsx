import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng khảo thí | Quản lý nhân sự",
};

import AdminHumanResourcesModule from "@/components/modules/AdminHumanResources";

export default function HumanResourcesPage() {
  return <AdminHumanResourcesModule />;
}
