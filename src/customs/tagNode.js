import React from "react";
import { Handle, Position } from "reactflow";

/**
 * 태그 노드
 * @param {reactflow.NodeProps<string>} props
 */
function TagNode(props) {
  return (
    <div className="react-flow__node-default">
      <h2>{props.data}</h2>
      <Handle className="customHandle" position={Position.Left} type="target" />
      <Handle
        className="customHandle"
        position={Position.Right}
        type="source"
      />
    </div>
  );
}

export default TagNode;
