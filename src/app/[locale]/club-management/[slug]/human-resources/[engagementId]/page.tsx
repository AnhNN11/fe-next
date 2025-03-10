import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng khảo thí | Quản lý nhân sự",
};

import InterviewInfoModule from "@/components/modules/HumanResources/InterviewInfoContainer";

export default function HumanResourcesPage() {
  return <InterviewInfoModule />;
}
