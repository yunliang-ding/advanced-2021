import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from './CodeBlock'
export default (props) => {
  return (
    <ReactMarkdown
      source={props.content}
      escapeHtml={false}
      {...props}
      renderers={{
        code: CodeBlock,
        // heading: HeadingBlock
      }}
    />
  );
};
