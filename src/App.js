import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
  addEdge,
  updateEdge,
} from "reactflow";
import AlcoholNode, { AlcoholData } from "./customs/alcoholNode";
import TagNode from "./customs/tagNode";

import "reactflow/dist/style.css";
import "./App.css";
import {
  getAlcsByTag,
  getNodePosition,
  getTagsById,
} from "./customs/nodeGenerator";

const hideTagNode = (hidden) => (nodeOrEdge) => {
  if (nodeOrEdge?.type === "TagNode" || nodeOrEdge?.target?.startsWith("t"))
    nodeOrEdge.hidden = hidden;
  return nodeOrEdge;
};

function App() {
  const edgeUpdateSuccessful = useRef(true);
  const { getNode } = useReactFlow();

  // functions
  const onClickAlcoholNode = async (
    /** @type {import("./customs/alcoholNode").AlcoholData} */ alc
  ) => {
    const node = getNode(alc.key);
    const tagData = await getTagsById(alc.id);
    const tagCount = tagData.length;
    const tags = tagData
      .filter((e) => !idSet.has(e.key))
      .map((tgd, idx) => ({
        id: tgd.key,
        type: "TagNode",
        position: getNodePosition(
          300,
          idx,
          tagCount,
          node?.position ?? { x: 0, y: 0 }
        ),
        data: {
          tag: tgd,
          onNodeClick: onClickTagNode,
        },
      }));
    tags.forEach((e) => idSet.add(e.id));
    const edges = tagData
      .filter((e) => !idSet.has(`e-${alc.key}-${e.key}`))
      .map((tgd) => ({
        id: `e-${alc.key}-${tgd.key}`,
        type: "straight",
        source: alc.key,
        target: tgd.key,
      }));
    edges.forEach((e) => idSet.add(e.id));
    // @ts-ignore
    setNodes((nds) => nds.concat(tags));
    setEdges((egs) => egs.concat(edges));
  };

  const onClickTagNode = async (
    /** @type {import('./customs/tagNode').TagData} */ tag
  ) => {
    const node = getNode(tag.key);
    const alcData = await getAlcsByTag(tag.id);
    const alcCount = alcData.length;
    const alcs = alcData
      .filter((e) => !idSet.has(e.key))
      .map((alc, idx) => ({
        id: alc.key,
        type: "AlcoholNode",
        position: getNodePosition(
          300,
          idx,
          alcCount,
          node?.position ?? { x: 0, y: 0 }
        ),
        data: {
          alc,
          onNodeClick: onClickAlcoholNode,
        },
      }));
    alcs.forEach((e) => idSet.add(e.id));
    const edges = alcData
      .filter((e) => !idSet.has(`e-${e.key}-${tag.key}`))
      .map((alc) => ({
        id: `e-${alc.key}-${tag.key}`,
        type: "straight",
        source: alc.key,
        target: tag.key,
      }));
    edges.forEach((e) => idSet.add(e.id));
    setNodes((nds) => nds.concat(alcs));
    setEdges((egs) => egs.concat(edges));
  };

  // states
  const [hidden, setHidden] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "a382",
      type: "AlcoholNode",
      position: { x: 0, y: 0 },
      data: {
        alc: new AlcoholData({
          id: "382",
          key: "a382",
          title: "느린마을 막걸리",
          image: "http://211.37.148.214/uploads/_19df0f3c14.false",
        }),
        onNodeClick: onClickAlcoholNode,
      },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // callbacks
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            style: {
              stroke: "purple",
              strokeWidth: "8px",
            },
            type: "straight",
            removable: true,
          },
          eds
        )
      ),
    [setEdges]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  // effects
  /**
   * @type {Set<string>} idSet
   */
  const idSet = useMemo(() => new Set(["a382"]), []);
  const nodeTypes = useMemo(() => ({ AlcoholNode, TagNode }), []);
  useEffect(() => {
    setNodes((nds) => nds.map(hideTagNode(hidden)));
    setEdges((eds) => eds.map(hideTagNode(hidden)));
  }, [hidden, setEdges, setNodes]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
      >
        <Controls showInteractive={false} />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={30} size={1} />

        <div style={{ position: "absolute", left: 10, top: 10, zIndex: 4 }}>
          <div>
            <label htmlFor="ishidden">
              Hide Tags
              <input
                id="ishidden"
                type="checkbox"
                checked={hidden}
                onChange={(event) => setHidden(event.target.checked)}
                className="react-flow__ishidden"
              />
            </label>
          </div>
        </div>
      </ReactFlow>
    </div>
  );
}

export default App;
