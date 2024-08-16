import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng khảo thí | Trang quản trị",
};

import BlogManagementModule from "@/components/modules/BlogManagement";

export default function DashboardPage() {
  return <BlogManagementModule />;
}
