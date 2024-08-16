"use client";

import { useGetAllClubCategoryQuery } from "@/store/queries/clubCategoryManagement";
import { useGetAllClubWithPaginationQuery } from "@/store/queries/clubManagement";
import { createQueryString } from "@/utils/queryString";

import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  Input,
  List,
  Pagination,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";

import _ from "lodash";
import { useRouter } from "next-nprogress-bar";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

export interface ClubCategoryDataType {
  _id: string;
  name: string;
}
export interface ClubDataType {
  _id: string;
  name: string;
  subname: string;
  category: ClubCategoryDataType;
  avatarUrl: string;
}

function HomepageClubsListComponent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { t } = useTranslation(params?.locale as string, "clubs");

  const { result: categoryResult, isFetching: categoryIsFetching } =
    useGetAllClubCategoryQuery(undefined, {
      selectFromResult: ({ data, isFetching }) => {
        const newClubDepartmentData = data?.data?.map(
          (category: ClubCategoryDataType) => ({
            label: category.name,
            value: category._id,
          })
        );
        return {
          result: newClubDepartmentData ?? [],
          isFetching,
        };
      },
    });

  const {
    result: clubsResult,
    total,
    isFetching: clubsIsFetching,
  } = useGetAllClubWithPaginationQuery(
    {
      page: page,
      page_size: 10,
      search: search,
      filters: category ? JSON.stringify({ category }) : "",
    },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          result: data?.result ?? [],
          total: data?.count ?? 0,
          isFetching,
        };
      },
    }
  );

  const handlePageChange = (page: number) => {
    router.push(createQueryString("page", `${page}`));
  };

  const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(createQueryString("search", `${e?.target?.value}`));
  }, 300);

  const handleFilterClubCategory = _.debounce((e) => {
    router.push(createQueryString("category", `${e ?? ""}`));
  }, 300);

  return (
    <Content style={{ padding: "0 48px" }}>
      <Flex justify="center" style={{ marginBottom: "16px" }}>
        <Typography.Title level={3}>{t("top5Clubs")}</Typography.Title>
      </Flex>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
        dataSource={clubsResult?.clubs}
        loading={clubsIsFetching}
        renderItem={(item: ClubDataType) => (
          <List.Item key={item?._id}>
            <Card
              hoverable
              cover={
                <Image
                  src={item?.avatarUrl}
                  alt={item?.name}
                  preview={false}
                  fallback="/images/no-data.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              }
              actions={[
                <Row
                  style={{ padding: "0 16px" }}
                  gutter={[16, 16]}
                  key={item?._id}
                >
                  <Col span={12}>
                    <Link href={`clubs/${item?.subname}`}>
                      <Button block>{t("viewMore")}</Button>
                    </Link>
                  </Col>
                  <Col span={12}>
                    <Button block type="primary">
                      {t("joinNow")}
                    </Button>
                  </Col>
                </Row>,
              ]}
            >
              <Tag style={{ marginBottom: "16px" }} color="success">
                {item?.category?.name}
              </Tag>
              <Meta title={item?.subname} description={item?.name} />
            </Card>
          </List.Item>
        )}
      />
      <Flex justify="flex-end">
        <Pagination
          defaultCurrent={page}
          total={total}
          onChange={handlePageChange}
        />
      </Flex>
    </Content>
  );
}

export default HomepageClubsListComponent;
