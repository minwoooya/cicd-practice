import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import { instance } from "../../../src/api/instance.js";
import { useSearchParams } from "react-router-dom";

function PostListSection() {
  const [postList, setPostList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPostData = async () => {
      const params = {
        order_by:
          searchParams.get("sortType") === "popular" ? "likes" : "created_at",
        page: 1,
      };
      const res = await instance.get("board/post-list/", { params });
      setPostList(res.data.results);
    };
    fetchPostData();
  }, [searchParams]);
  return (
    <PostItemContainer>
      <ScrollContainer>
        {postList.map((item) => (
          <PostItem key={item.id} postData={item} />
        ))}
      </ScrollContainer>
    </PostItemContainer>
  );
}

const PostItemContainer = styled.div`
  padding: 1.5rem;
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 16rem);
  overflow: scroll;
`;

export default PostListSection;
