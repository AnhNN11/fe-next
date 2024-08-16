import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Phòng khảo thí | Đóng phí",
};

import FinanceFundsConModule from "@/components/modules/Finances/FundsContribute";

export default function FundContributePage() {
	return <FinanceFundsConModule />;
}
