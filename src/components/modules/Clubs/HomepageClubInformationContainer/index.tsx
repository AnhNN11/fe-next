"use client";
import { useGetClubBySubnameQuery } from "@/store/queries/clubManagement";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {
  UsergroupAddOutlined,
  UnorderedListOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import HomepageEventByClubComponent from "../../EventsManagement/HomepageEventByClubComponent";

const { Text } = Typography;

function HomepageClubInfomationContainer() {
  const params = useParams();
  const { t } = useTranslation(params?.locale as string, "clubs");

  interface ClubDataType {
    _id: string;
    name: string;
    subname: string;
    category: {
      _id: string;
      name: string;
    };
    description: string;
    avatarUrl: string;
    bannerUrl: string;
    activityPoint: number;
    isActive: boolean;
    createdAt: Date;
    event?: Event[];
  }

  interface Event {
    _id: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    type: string;
    bannerUrl: string;
    isApproved: boolean;
    location: {
      _id: string;
      name: string;
      building: string;
    };
    status: string;
  }

  const { result: clubsResult, isFetching: clubsIsFetching } =
    useGetClubBySubnameQuery(
      {
        subname: params?.subname as string,
      },
      {
        selectFromResult: ({ data, isFetching }) => {
          return {
            result: {
              ...data?.clubInfo,
              event: data?.eventByClub.events ?? [],
            } as ClubDataType,
            total: data?.count ?? 0,
            isFetching,
          };
        },
      }
    );
  console.log(clubsResult);

  return (
    <Spin spinning={clubsIsFetching} tip="Loading...">
      <Content style={{ marginTop: "16px", marginBottom: "16px" }}>
        <Row justify="center">
          <Col xs={24} sm={18} md={18} lg={18}>
            <Image
              src={clubsResult?.bannerUrl}
              alt={clubsResult?.name}
              preview={false}
              style={{ width: "100%" }}
              fallback={"/images/no-data.png"}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ paddingTop: "16px" }}>
          <Col xs={10} sm={2} md={2} lg={2} style={{ paddingRight: "16px" }}>
            <Avatar
              shape="square"
              style={{ width: "100%", height: "auto" }}
              icon={
                <Image src={clubsResult?.avatarUrl} alt={clubsResult?.name} fallback={"/images/no-data.png"}/>
              }
            />
          </Col>
          <Col xs={10} sm={6} md={6} lg={6}>
            <Title level={3} color="primary">
              {clubsResult?.subname}
            </Title>
            <Title level={5}>{clubsResult?.name}</Title>
          </Col>
          <Col xs={20} sm={6} md={6} lg={6}>
            <UnorderedListOutlined />{" "}
            <Tag color="red">{clubsResult?.category?.name}</Tag>
            <br></br>
            <UsergroupAddOutlined /> <Text strong>40</Text> {t("members")}
            <br></br>
            <UserOutlined /> <Text strong>{t("chairman")}: </Text>Trần Văn Bảo
            Thắng (mock data)
          </Col>
          <Col xs={20} sm={4} md={4} lg={4}>
            <Button block type="primary" icon={<RightCircleOutlined />}>
              {t("joinNow")}
            </Button>
          </Col>
          <Col xs={20} sm={18} md={18} lg={18} style={{ marginTop: "16px" }}>
            <Card style={{ textAlign: "justify" }}>
              {clubsResult?.description}
            </Card>
          </Col>
          <Col xs={20} sm={18} md={18} lg={18} style={{ marginTop: "16px" }}>
            {clubsResult.event && (
              <HomepageEventByClubComponent
                event={clubsResult?.event as Event[]}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Spin>
  );
}

export default HomepageClubInfomationContainer;
