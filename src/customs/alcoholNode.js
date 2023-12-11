import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

/**
 * @typedef {{
 *  id: string,
 *  title: string,
 *  image: string,
 * }} AlcoholData
 */
export class AlcoholData {
  id;
  title;
  image;
  /**
   * @param {AlcoholData} param0
   */
  constructor({ id = "", title = "", image = "" }) {
    this.id = id;
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

  return (
    <div className="react-flow__node-default">
      <h2>{alc.title}</h2>
      {alc.image.length > 0 && (
        <img
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
