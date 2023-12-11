import React from "react";
import { NodeProps } from "reactflow";

export class AlcoholData {
  title = "";
  image = "";
}

/**
 * 주류 노드
 * @param {NodeProps<AlcoholData>} props
 */
function AlcoholNode(props) {
  return <p>{props.data.title}</p>;
}

export default AlcoholNode;
