"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import * as S from "./styles";
import { useTranslation } from "@/app/i18n/client";
import { Button, Flex, Form, Input, Pagination, Select, Switch, Table, TableProps, Typography } from "antd";
import ConfirmModal from "@/components/core/common/ConfirmModal";
import { SearchOutlined } from "@ant-design/icons";
import { createQueryString } from "@/utils/queryString";
import _ from "lodash";
import { useGetFundMutation, useGetFundTokenMutation } from "@/store/queries/finances";
import { useGetClubBySubnameQuery } from "@/store/queries/clubManagement";
import React, { useCallback, useEffect, useState } from "react";
import useConfirmModal from "@/hooks/useConfirmModal";

interface DataType {
	_id: string;
	title: string;
	content: string;
	count: number;
	paid: number;
}
var data: any = {};
var t_: any;

interface ExpandDataType {
	_id: string;
	receiver: any;
	amount: number;
	status: string;
}

const ExpandRowRender = (row: any) => {
	const columns: TableProps<ExpandDataType>["columns"] = [
		{
			title: t_("table.number"),
			dataIndex: "_id",
			key: "_id",
			width: 50,
			render: (text, _, index) => <Typography.Text>{index + 1}</Typography.Text>,
		},
		{
			title: t_("table.receiver"),
			dataIndex: "user",
			key: "user",
			render: (text, _) => <Typography.Text>{`${text.firstname} ${text.lastname}`}</Typography.Text>,
		},
		{
			title: t_("table.money"),
			dataIndex: "amount",
			key: "amount",
			width: 200,
			render: (text, _) => <Typography.Text>{`${text}`}</Typography.Text>,
		},
		{
			title: t_("table.status"),
			dataIndex: "status",
			key: "status",
			render: (text) => <Typography.Text>{`${text}`}</Typography.Text>,
		},
	];
	// console.log(Array.isArray(data[row._id]), data[row._id]);
	return <Table columns={columns} dataSource={data[row._id] ?? []} pagination={false} rowKey={(record) => record._id} />;
};

function FinanceFundsContributeModule() {
	const params = useParams();
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const search = searchParams.get("search") || "";
	const type = searchParams.get("type") || undefined;

	const { t } = useTranslation(params?.locale as string, "finances");
	useEffect(() => {
		t_ = t;
	}, [t]);

	const { id, isLoading_ } = useGetClubBySubnameQuery(
		{
			subname: params?.slug as string,
		},
		{
			selectFromResult: ({ data, isLoading }) => ({
				id: data?.clubInfo?._id,
				isLoading_: isLoading,
			}),
		}
	);
	const [getAllFinances, { isLoading }] = useGetFundMutation();
	const [getFundToken] = useGetFundTokenMutation();
	const [finances, setFinances] = useState<any>();
	const [, setOpen] = useState<boolean>(false);

	const refetch = useCallback(
		async (clubId: any) => {
			if (!clubId) return;
			const fin = await getAllFinances({ clubId }).unwrap();
			setFinances(fin);
		},
		[getAllFinances]
	);

	useEffect(() => {
		if (id) refetch(id);
	}, [id, refetch]);
	useEffect(() => {
		if (finances) {
			finances.map(async (val: any) => {
				const fund = await getFundToken({ token: val._id });
				data[val._id] = fund.data;
			});
		}
	}, [finances, getFundToken]);
	const confirmModal = useConfirmModal();

	const columns: TableProps<DataType>["columns"] = [
		{
			title: t("table.number"),
			dataIndex: "_id",
			key: "_id",
			width: 50,
			render: (text, _, index) => <Typography.Text>{5 * (page - 1) + index + 1}</Typography.Text>,
		},
		{
			title: t("table.title"),
			dataIndex: "title",
			key: "title",
			render: (text, _) => <Typography.Text>{text}</Typography.Text>,
		},
		{
			title: t("table.content"),
			dataIndex: "content",
			key: "content",
			render: (text, _) => <Typography.Text>{text}</Typography.Text>,
		},
		{
			title: t("table.paid"),
			dataIndex: "paid",
			key: "paid",
			render: (text) => <Typography.Text>{text}</Typography.Text>,
		},
		{
			title: t("table.amount_"),
			dataIndex: "count",
			key: "count",
			render: (text, _) => <Typography.Text>{text}</Typography.Text>,
		},
	];

	const handlePageChange = (page: number) => {
		router.push(createQueryString("page", `${page}`));
	};

	const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		router.push(createQueryString("search", `${e?.target?.value}`));
	}, 300);

	const handleType = _.debounce((e: React.ChangeEvent<HTMLSelectElement>) => {
		router.push(createQueryString("type", `${e}`));
	}, 300);

	return !isLoading_ && id ? (
		<S.PageWrapper>
			<ConfirmModal i18n="finances" data={confirmModal.data} />
			<S.Head style={{ display: "block" }}>
				<Typography.Title level={2}>{t("title")}</Typography.Title>
				<Typography.Title level={4}>
					{t("balance")}:{" "}
					{Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(finances?.balance)}
				</Typography.Title>
			</S.Head>
			<S.FilterWrapper>
				<Form style={{ display: "flex", justifyContent: "space-between" }}>
					<Form.Item>
						<Input
							placeholder={t("search")}
							prefix={<SearchOutlined />}
							onChange={handleSearch}
							defaultValue={search}
							style={{ width: 300, marginRight: 15 }}
						/>
					</Form.Item>
					<Form.Item>
						<Select
							defaultValue={(type ?? "") as any}
							options={[
								{ value: "", label: <span>{t("none")}</span> },
								{ value: "r", label: <span>{t("revenue")}</span> },
								{ value: "e", label: <span>{t("expense")}</span> },
							]}
							onChange={handleType}
							style={{ width: 150 }}
						/>
					</Form.Item>
				</Form>
			</S.FilterWrapper>
			<Flex justify="flex-end" style={{ margin: "10px 0" }}>
				<Button
					type="primary"
					onClick={() => {
						setOpen(true);
					}}
				>
					{t("addFunds")}
				</Button>
			</Flex>
			<S.TableWrapper>
				<Table
					columns={columns}
					dataSource={finances ?? []}
					loading={isLoading}
					pagination={false}
					rowKey={(record) => record._id}
					expandable={{ expandedRowRender: ExpandRowRender }}
				/>
			</S.TableWrapper>
			<Flex justify="flex-end">
				<Pagination defaultCurrent={page} total={finances?.total} onChange={handlePageChange} pageSize={5} />
			</Flex>
		</S.PageWrapper>
	) : (
		<></>
	);
}

export default FinanceFundsContributeModule;
