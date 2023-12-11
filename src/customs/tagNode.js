import React from "react";
import { NodeProps } from "reactflow";

/**
 * 태그 노드
 * @param {NodeProps<string>} props
 */
function TagNode(props) {
  return <p>{props.data}</p>;
}

export default TagNode;
