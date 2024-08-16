import EditProfileModule from "@/components/modules/EditProfile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Phòng khảo thí | Cài đặt tài khoản",
};
export default function EventPage() {
  return <EditProfileModule />;
}
