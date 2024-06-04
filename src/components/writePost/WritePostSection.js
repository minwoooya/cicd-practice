import React, { useState } from "react";
import styled from "styled-components";
import { Grey2 } from "../../styles/color";
import { LoginButton } from "../login/LoginSection";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../../src/api/instance.js";

function WritePostSection() {
  //TODOS
  // 1. 글쓰기

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setContent(value);
    }
  };

  const postPostdata = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const body = {
      title: title,
      content: content,
    };
    try {
      const res = await instance.post("/board/post-create/", body, { headers });
      if (res.status === 201) {
        navigate("/");
        alert("글 작성 완료~~");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <WritePostSectionWrapper>
      <TitleInput
        name="title"
        onChange={handleInputChange}
        placeholder="제목을 입력해주세요"
        maxLength={30}
      />
      <ContentTextArea
        name="content"
        onChange={handleInputChange}
        placeholder="내용을 입력해주세요"
        maxLength={200}
      />
      <PostButton onClick={postPostdata}>글 작성하기</PostButton>
    </WritePostSectionWrapper>
  );
}
const WritePostSectionWrapper = styled.section`
  padding: 1rem 3.7rem 0;
`;

const TitleInput = styled.input`
  display: inline-block;
  width: 100%;
  background-color: ${Grey2};
  padding: 0.3rem 1rem;
  height: 4rem;
  margin-top: 0.6rem;
  border-radius: 1rem;
`;
const ContentTextArea = styled.textarea`
  display: inline-block;
  width: 100%;
  height: 40rem;
  background-color: ${Grey2};
  padding: 1rem 1rem;
  outline: none;
  border: none;
  resize: none;
  font-family: Pretendard;
  margin-top: 0.6rem;
  border-radius: 1rem;
`;

const PostButton = styled(LoginButton)``;

export default WritePostSection;
