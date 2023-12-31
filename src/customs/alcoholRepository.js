import { AlcoholData } from "./alcoholNode";
import { TagData } from "./tagNode";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

/**
 *
 * @param {string} str
 * @returns {string}
 */
const hashString = (str) => {
  let hash = "";
  for (let i = 0; i < str.length; ++i) {
    hash += str.charCodeAt(i).toString();
  }
  return hash;
};

/**
 *
 * @param {string} search
 * @returns {Promise<AlcoholData | undefined>}
 */
const trySearchAlcohol = async (search) => {
  /**
   * @type {{data: {id: number, title: string, image: string}[], count: number}}
   */
  const data = await fetch(`${baseUrl}/alcohol/search?s=${search}&size=1`)
    .then(async (res) => {
      if (res.ok) return await res.json();
      return { data: [], count: 0, err: true };
    })
    .catch((err) => {
      console.error(err);
      return { data: [], count: 0, err: true };
    });

  if (data.count === 0) return undefined;
  const toReturn = data.data[0];
  return new AlcoholData({
    ...toReturn,
    image: `${process.env.REACT_APP_IMAGE_BASE_URL}${toReturn.image}`,
    key: `a${toReturn.id}`,
  });
};

/**
 * @async
 * @param {number} id
 * @returns {Promise<TagData[]>}
 */
const getTagsById = async (id) => {
  /**
   * @type {{data: {title: string, weight: number}[], count: number}}
   */
  const data = await fetch(`${baseUrl}/tag/byalc/${id}`)
    .then(async (res) => {
      if (res.ok) return await res.json();
      return { data: [], count: 0, err: true };
    })
    .catch((err) => {
      console.error(err);
      return { data: [], count: 0, err: true };
    });

  const tags = data.data.map(
    (e) => new TagData({ key: "t" + hashString(e.title), id: e.title })
  );

  return tags;
};

/**
 * @async
 * @param {string} tag
 * @returns {Promise<AlcoholData[]>}
 */
const getAlcsByTag = async (tag) => {
  /**
   * @type {{data: {id: number, score: number, title: string, image: string}[], count: number}}
   */
  const data = await fetch(`${baseUrl}/tag/bytag/${tag}`)
    .then(async (res) => {
      if (res.ok) return await res.json();
      return { data: [], count: 0, err: true };
    })
    .catch((err) => {
      console.error(err);
      return { data: [], count: 0, err: true };
    });

  const tags = data.data.map(
    (e) =>
      new AlcoholData({
        id: e.id,
        key: `a${e.id}`,
        title: e.title,
        image: `${process.env.REACT_APP_IMAGE_BASE_URL}${e.image}`,
      })
  );

  return tags;
};

/**
 *
 * @param {number} rad
 * @param {number} index
 * @param {number} count
 * @param {{x: number, y: number}} offset
 * @returns {{x: number, y: number}}
 */
const getNodePosition = (rad = 5, index, count, offset = { x: 0, y: 0 }) => {
  const radian = 2 * Math.PI * (index / count);
  return {
    x: Math.cos(radian) * rad + offset.x,
    y: Math.sin(radian) * rad + offset.y,
  };
};

export {
  hashString,
  getTagsById,
  getAlcsByTag,
  getNodePosition,
  trySearchAlcohol,
};
