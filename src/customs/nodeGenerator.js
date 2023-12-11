/**
 *
 * @param {import('./alcoholNode').AlcoholData} alc
 * @param {{x: number, y: number}} position
 * @param {Object} optionalData
 * @returns {import('reactflow').Node}
 */
const alcoholToNode = (alc, position, optionalData) => {
  return {
    id: alc.key,
    type: "AlcoholNode",
    position,
    data: {
      alc,
      ...optionalData,
    },
  };
};

/**
 *
 * @param {import('./tagNode').TagData} tag
 * @param {{x: number, y: number}} position
 * @param {Object} optionalData
 * @returns {import('reactflow').Node}
 */
const tagToNode = (tag, position, optionalData) => {
  return {
    id: tag.key,
    type: "TagNode",
    position,
    data: {
      tag,
      ...optionalData,
    },
  };
};

/**
 *
 * @param {import('./alcoholNode').AlcoholData} alc
 * @param {import('./tagNode').TagData} tag
 * @returns {import('reactflow').Edge}
 */
const getNewEdge = (alc, tag) => {
  return {
    id: toEdgeKey(alc, tag),
    type: "straight",
    source: alc.key,
    target: tag.key,
  };
};

const toEdgeKey = (alc, tag) => `e-${alc.key}-${tag.key}`;

export { alcoholToNode, tagToNode, getNewEdge, toEdgeKey };
