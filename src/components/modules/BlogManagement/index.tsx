"use client";

import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
} from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import _ from "lodash";

import { Image, Typography } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import * as S from "./styles";
import { useTranslation } from "@/app/i18n/client";
import { useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import useModal from "./../../../hooks/useModal";

function BlogManagementModule() {
  const params = useParams();

  const [form] = Form.useForm();
  const { t } = useTranslation(params?.locale as string, "adminHumanResources");

  const [isModalVisiblePost] = useState(false);

  const [rows] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const [isCommentMode, setIsCommentMode] = useState(false);
  const [comment, setComment] = useState("");

  const [commentsList, setCommentsList] = useState([
    {
      name: "John Doe",
      timestamp: "2023-04-01 10:00",
      comment: "This is a great post!",
    },
    {
      name: "Jane Smith",
      timestamp: "2023-04-01 11:30",
      comment: "Really enjoyed reading this.",
    },
    {
      name: "Alice Johnson",
      timestamp: "2023-04-02 09:15",
      comment: "Thanks for sharing.",
    },
  ]);

  const submitComment = () => {
    // Here you would typically add the new comment to your backend and then fetch the updated list
    // For mock purposes, we're just adding it to the existing list
    const newComment = {
      name: "New User",
      timestamp: new Date().toISOString(),
      comment: comment,
    };
    setCommentsList((prevComments) => [...prevComments, newComment]);
    setComment(""); // Reset comment input after submission
  };

  // const [addNewPost] = useCreatePostQuery();

  const handleAddOk = async () => {
    try {
      const values = await form.validateFields();
      // await addNewPost(values).unwrap();
      closeAddModal();
      form.resetFields();
    } catch (error) {
      message.error(`Error add club`);
    }
  };
  const showModal = () => {
    openAddModal();
  };

  const handleCancel = () => {
    closeAddModal();
  };
  const {
    visible: isAddModalVisible,
    open: openAddModal,
    close: closeAddModal,
  } = useModal();

  const props = {
    name: "file",
    multiple: true,
    showUploadList: false,
    action: "//jsonplaceholder.typicode.com/posts/",
    onChange(info: any) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <S.PageWrapper>
      <Row justify="center">
        <Col span={24}>
          <Row justify="center">
            <Col span={8}>
              {" "}
              {/* Adjust the span for the sides to control the width of the centered content */}
              <Card bordered={false}>
                <Row gutter={16} justify="center" align="middle">
                  <Col>
                    <Avatar src="https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/448765009_1121395095587069_3752656089230746733_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEz0JrJPt7qSqkEHQdMHuhzHC8VLh7WzRkcLxUuHtbNGa29atOP_iX-TtbHaFq8tHl_eBWOJRiqSOvb35x35Ign&_nc_ohc=r47rzD5U4SAQ7kNvgFFeeSd&_nc_ht=scontent-ams2-1.xx&oh=00_AYCREJOliIA6j5RagRjbclxHLfJ-V2VcP67FzYCj75YZyg&oe=667EEFDA" />
                  </Col>
                  <Col flex="auto">
                    <Input.TextArea
                      rows={1}
                      placeholder="What's on your mind?"
                      style={{ resize: "none" }}
                      onClick={showModal}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title=""
        open={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleCancel}
        footer=""
      >
        <Form form={form} layout="vertical">
          <div
            style={{ marginBottom: 16, display: "flex", alignItems: "center" }}
          >
            <Avatar src="https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/448765009_1121395095587069_3752656089230746733_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEz0JrJPt7qSqkEHQdMHuhzHC8VLh7WzRkcLxUuHtbNGa29atOP_iX-TtbHaFq8tHl_eBWOJRiqSOvb35x35Ign&_nc_ohc=r47rzD5U4SAQ7kNvgFFeeSd&_nc_ht=scontent-ams2-1.xx&oh=00_AYCREJOliIA6j5RagRjbclxHLfJ-V2VcP67FzYCj75YZyg&oe=667EEFDA" />
          </div>
          <Form.Item
            name="postContent"
            rules={[{ required: true, message: "Please input your post!" }]}
          >
            <Input.TextArea rows={4} placeholder="What's on your mind?" />
          </Form.Item>
          <Form.Item
            name="avatarUrl"
            rules={[{ required: true, message: t("avatarUrlRequired") }]}
          >
            <div style={{ marginTop: 16, height: 180 }}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  {/* <Icon type="inbox" /> */}
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Row justify="center">
        <Col span={8}>
          <Card
            actions={[
              <SearchOutlined key="like" style={{ color: "red" }} />,
              <EyeOutlined
                key="comment"
                onClick={() => {
                  // showModalPost();
                  setIsCommentMode(true);
                }}
              />,
              <ShareAltOutlined key="share" />,
            ]}
          >
            <Space align="center">
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text>Nhat Anh</Typography.Text>
                <Typography.Text type="secondary">9:00AM</Typography.Text>
              </div>
            </Space>
            {/* Blog content here */}

            <Typography.Paragraph
              ellipsis={{
                rows,
                expandable: "collapsible",
                expanded,
                onExpand: (_, info) => setExpanded(info.expanded),
              }}
              copyable
            >
              {
                "Khi số lượng người dùng ứng dụng của bạn ngày càng tăng lên, dữ liệu từ đó sẽ tăng trưởng ngày càng nhiều hơn mỗi ngày, database của dự án sẽ dần trở nên quá tải. Và đây chính là lúc cần thực hiện scale database."
              }
            </Typography.Paragraph>
            <Image
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt=""
            />
            <h1>1like</h1>
            <Modal
              title="Comments"
              visible={isModalVisiblePost}
              // onOk={handleOkPost}
              // onCancel={handleCancelPost}
              footer=""
            >
              {isCommentMode && (
                <div>
                  <div
                    style={{
                      maxHeight: commentsList.length > 6 ? "300px" : "auto",
                      overflowY: commentsList.length > 6 ? "scroll" : "visible",
                    }}
                  >
                    {commentsList.map((item, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <div>
                          <strong>{item.name}</strong> at {item.timestamp}
                        </div>
                        <div>{item.comment}</div>
                      </div>
                    ))}
                  </div>
                  <Input.TextArea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                  />
                  <Button type="primary" onClick={submitComment}>
                    Submit Comment
                  </Button>
                </div>
              )}
            </Modal>
          </Card>
        </Col>
      </Row>
    </S.PageWrapper>
  );
}

export default BlogManagementModule;
