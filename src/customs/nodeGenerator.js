import { hashString, trySearchAlcohol } from "./alcoholRepository";
import { TagData } from "./tagNode";

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

/**
 *
 * @param {Object} tagOptional
 * @param {Object} alcOptional
 * @returns {Promise<import('reactflow').Node[]>}
 */
const paramToNodes = async (tagOptional, alcOptional) => {
  const params = new URLSearchParams(window.location.search);
  let nodes = [];

  // add tags
  let tagPosition = { x: -100, y: -100 };
  const tags = params.getAll("t").map((e) => {
    tagPosition = { ...tagPosition, x: tagPosition.x + 100 };
    return tagToNode(
      new TagData({ id: e, key: "t" + hashString(e) }),
      tagPosition,
      tagOptional
    );
  });
  nodes = nodes.concat(tags);

  // add alcohols
  let alcoholPosition = { x: -100, y: 0 };
  const alcoholsPromise = params.getAll("a").map((e) => {
    return new Promise(async (resolve) => {
      const alcData = await trySearchAlcohol(e);
      alcoholPosition = { ...alcoholPosition, x: alcoholPosition.x + 100 };
      resolve(alcoholToNode(alcData, alcoholPosition, alcOptional));
    });
  });
  const alcohols = await Promise.all(alcoholsPromise);
  nodes = nodes.concat(alcohols);

  console.log(nodes);
  return nodes.filter((e) => !!e);
};

export { alcoholToNode, tagToNode, getNewEdge, toEdgeKey, paramToNodes };
