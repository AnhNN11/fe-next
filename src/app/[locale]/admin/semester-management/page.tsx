import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng khảo thí | Quản lý nhân sự",
};

import SemesterManagement from "@/components/modules/SemesterManagement";

export default function SemesterPage() {
  return <SemesterManagement />;
}
