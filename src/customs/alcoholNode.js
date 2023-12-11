import React from "react";
import { Handle, Position, useStore } from "reactflow";

export class AlcoholData {
  id;
  key;
  title;
  image;
  /**
   * @param {AlcoholData} param0
   */
  constructor({ id = "", key = "", title = "", image = "" }) {
    this.id = id;
    this.key = key;
    this.title = title;
    this.image = image;
  }
}

/**
 * 주류 노드
 * @component
 * @param {{ data: {alc: AlcoholData, onNodeClick: (alc: AlcoholData) => {}}}} props
 */
function AlcoholNode(props) {
  const { alc, onNodeClick } = props.data;
  const connectionNodeId = useStore((state) => state.connectionNodeId);

  const isConnecting = !!connectionNodeId;
  //const isTarget = connectionNodeId && connectionNodeId !== alc.key;

  return (
    <div className="react-flow__node-default">
      <h2>{alc.title}</h2>
      {alc.image.length > 0 && (
        <img
          className="non-draggable"
          src={alc.image}
          alt={alc.title}
          style={{
            height: "150px",
            width: "100%",
            objectFit: "contain",
          }}
        />
      )}
      <button onClick={() => onNodeClick(alc)}>get</button>
      {!isConnecting && (
        <Handle
          className="customHandle"
          position={Position.Right}
          type="source"
        />
      )}
      <Handle
        className="customHandle"
        position={Position.Left}
        type="target"
        isConnectableStart={false}
      />
    </div>
  );
}

export default AlcoholNode;
