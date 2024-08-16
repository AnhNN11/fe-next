import FinancesModule from "@/components/modules/Finances";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Phòng khảo thí | Quản lý tài chính",
};

export default function REPage() {
	return <FinancesModule />;
}
