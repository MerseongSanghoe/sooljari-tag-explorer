import React from "react";
import { Handle, Position } from "reactflow";

export class TagData {
  id;
  key;
  /**
   * @param {TagData} param0
   */
  constructor({ id = "", key = "" }) {
    this.id = id;
    this.key = key;
  }
}

/**
 * 태그 노드
 * @component
 * @param {{ data: {tag: TagData, onNodeClick: (tag: TagData) => {}}}} props
 */
function TagNode(props) {
  const { tag, onNodeClick } = props.data;

  return (
    <div
      className="react-flow__node-default"
      style={{
        width: "100%",
        minWidth: "50px",
      }}
    >
      <h3>#{tag.id}</h3>
      <button onClick={() => onNodeClick(tag)}>get</button>
      <Handle
        className="customHandle"
        position={Position.Left}
        type="target"
        isConnectable={false}
      />
      <Handle
        className="customHandle"
        position={Position.Right}
        type="source"
        isConnectable={false}
      />
    </div>
  );
}

export default TagNode;
