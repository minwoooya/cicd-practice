import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Body1 } from "../../styles/font";
import { Grey2, Red, White } from "../../styles/color";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../src/api/instance.js";

function LoginSection() {
  //TODOS
  // 1. 아이디, 비밀번호 값을 상태관리 변수로 지정하고 값이 변경됨에 따라 상태 업데이트하기
  // 2. useRef 사용하여 LoginSection컴포넌트가 첫 마운트되었을떄 아이디 input에 포커스 두기
  // 3. 로그인 버튼을 눌렀을 때, 아이디와 비밀번호를 서버에 전송하고 response 전달받기, response의 유형(성공,실패) 에 따라 예외처리 구현
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [isPendingRequest, setIsPendingRequest] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    } else {
      setPw(value);
    }
  };

  const postLoginData = async () => {
    if (isPendingRequest) return;
    const body = {
      email: id,
      password: pw,
    };
    try {
      setIsPendingRequest(true);
      const res = await instance.post("accounts/login/", body);
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.access);
        navigate("/");
      } else {
        alert("아이디 혹은 비밀번호를 잘못 입력했습니다");
      }
    } catch (err) {
      alert("아이디 혹은 비밀번호를 잘못 입력했습니다");
    } finally {
      setIsPendingRequest(false);
    }
  };

  return (
    <LoginSectionWrapper>
      <div className="id">
        <Body1>아이디</Body1>
        <LoginInput
          name="id"
          value={id}
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="아이디를 입력해주세요."
        />
      </div>
      <div className="pw">
        <Body1>비밀번호</Body1>
        <LoginInput
          name="pw"
          value={pw}
          onChange={handleInputChange}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <LoginButton onClick={postLoginData}>로그인</LoginButton>
    </LoginSectionWrapper>
  );
}

const LoginSectionWrapper = styled.section`
  padding: 3.6rem 3.7rem 0;
  .pw {
    margin-top: 2rem;
  }
`;

const LoginInput = styled.input`
  display: inline-block;
  width: 100%;
  background-color: ${Grey2};
  padding: 0.3rem 1rem;
  height: 4rem;
  margin-top: 0.6rem;
  border-radius: 1rem;
`;

export const LoginButton = styled.button`
  background-color: ${Red};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${White};
  border-radius: 2rem;
  height: 5rem;
  font-size: 2rem;
  font-family: "GmarketSans";
  margin-top: 2rem;
`;

export default LoginSection;
