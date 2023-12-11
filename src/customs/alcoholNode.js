import React from "react";
import { Handle, Position } from "reactflow";

export class AlcoholData {
  title;
  image;
  /**
   * @param {AlcoholData} param0
   */
  constructor({ title = "", image = "" }) {
    this.title = title;
    this.image = image;
  }
}

/**
 * 주류 노드
 * @param {reactflow.NodeProps<AlcoholData>} props
 */
function AlcoholNode(props) {
  return (
    <div className="react-flow__node-default">
      <h1>{props.data.title}</h1>
      {props.data.image.length > 0 && (
        <img
          src={props.data.image}
          alt={props.data.title}
          style={{ height: "100px", objectFit: "cover" }}
        />
      )}
      <Handle className="customHandle" position={Position.Left} type="target" />
      <Handle
        className="customHandle"
        position={Position.Right}
        type="source"
      />
    </div>
  );
}

export default AlcoholNode;
