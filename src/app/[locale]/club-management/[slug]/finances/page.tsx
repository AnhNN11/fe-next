import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Phòng khảo thí | Quản lý tài chính",
};
import { redirect } from "next/navigation";

export default function UserManagementPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
	return redirect(`/${locale}/club-management/${slug}/finances/revenue-expenses`);
}
