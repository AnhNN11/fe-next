import MemberListModule from "@/components/modules/HumanResources/MemberListComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng khảo thí | Danh sách thành viên",
};

export default function UserManagementPage() {
  return <MemberListModule />;
}
