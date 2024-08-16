import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Phòng khảo thí | Quản lý tài chính",
};

import FinanceFundsModule from "@/components/modules/Finances/Funds";

export default function FundPage() {
	return <FinanceFundsModule />;
}
