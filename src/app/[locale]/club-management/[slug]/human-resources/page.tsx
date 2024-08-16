import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng khảo thí | Quản lý nhân sự",
};

import HumanResourcesModule from "@/components/modules/HumanResources";

export default function HumanResourcesPage() {
  return <HumanResourcesModule />;
}
