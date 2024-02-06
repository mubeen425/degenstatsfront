import React from "react";

export default (props) => {
  const encodedContent = encodeURIComponent(props.content);
  return <a href={`http://127.0.0.1:4000/tiktok/post/${encodedContent}`}>{props.children}</a>;
};

