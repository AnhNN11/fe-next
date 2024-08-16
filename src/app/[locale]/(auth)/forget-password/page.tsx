import { Metadata } from "next";

import ForgetPasswordModule from "@/components/modules/ForgetPassword";

export const metadata: Metadata = {
  title: "Phòng khảo thí | Quên mật khẩu",
};

function ForgetPassPage() {
  return <ForgetPasswordModule />;
}

export default ForgetPassPage;
