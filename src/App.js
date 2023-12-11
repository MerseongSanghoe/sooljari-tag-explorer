import React, { useCallback, useRef, useMemo, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";
import AlcoholNode, { AlcoholData } from "./customs/alcoholNode";
import TagNode from "./customs/tagNode";

import "reactflow/dist/style.css";
import "./App.css";

const alcData = new AlcoholData({
  title: "느린마을 막걸리",
  image: "http://211.37.148.214/uploads/_19df0f3c14.false",
});

const initialNodes = [
  {
    id: "1",
    type: "AlcoholNode",
    position: { x: 0, y: 0 },
    data: alcData,
  },
  { id: "2", type: "TagNode", position: { x: 0, y: 300 }, data: "#Tag" },
];
const initialEdges = [
  { id: "e1-2", type: "straight", source: "1", target: "2" },
];

function App() {
  /**
   * @type {React.MutableRefObject<HTMLElement>} appRef
   */
  const appRef = useRef();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ AlcoholNode, TagNode }), []);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div ref={appRef} style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Controls showInteractive={false} />
        <MiniMap />
        <Background variant="dots" gap={30} size={1} />
      </ReactFlow>
    </div>
  );
}

export default App;
