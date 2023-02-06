const Animal = require("../models/animal");
const logger = require("./logger.service");
const sm = require("../constants/server-messages.js");

const ObjectId = require("mongodb").ObjectId;

//==============================================================================
// Description: Create Animal object with passed parameters (parent, label).
// PRE-CONDITION:
//    @param       parent   ObjectId
//    @param       label    String
// POST-CONDITION:
//    Returns the created AnimalSchema Object
//    eg. AnimalSchema { parent: ObjectId, label: String }.
const createAnimal = async (parent, label) => {
  let animalExist = await getAnimal({ parent: parent, label: label });
  try {
    if (animalExist) {
      return await Animal.findOneAndUpdate(
        { _id: animalExist._id },
        { parent: parent, label: label },
        { new: true, upsert: true }
      );
    }
    await Animal.create({
      parent: parent,
      label: label,
      root: !parent,
    });
    return await getAnimal({ parent: parent, label: label });
  } catch (e) {
    logger.error("Error creating animal data", e);
    throw {
      code: sm.ERROR_INTERNAL_SERVER.status,
      message: { message: sm.ERROR_INTERNAL_SERVER.message },
    };
  }
};
//==============================================================================

//==============================================================================
// Description: Internal utility function for retrieving Animal with filters.
// PRE-CONDITION:
//    @param       data   Object
// POST-CONDITION:
//    Returns the filtered AnimalSchema Object results
//    eg. [AnimalSchema { parent: ObjectId, label: String }].
const getAnimal = async (data) => {
  try {
    const result = await Animal.findOne(data).lean();
    return result;
  } catch (e) {
    logger.error("Error retrieving animal", e);
    throw {
      code: sm.ERROR_INTERNAL_SERVER.status,
      message: { message: sm.ERROR_INTERNAL_SERVER.message },
    };
  }
};
//==============================================================================

//==============================================================================
// Description: Get all nested animal object from a tree (Default root of the tree is the node with parent null).
// POST-CONDITION:
//    Returns array of nested tree structure of animals
//    eg. [AnimalSchema { parent: ObjectId, label: String }].
const getAnimals = async () => {
  try {
    let result = await getAnimalsHelper("");
    return result;
  } catch (e) {
    logger.error("Error retrieving tree", e);
    throw {
      code: sm.ERROR_INTERNAL_SERVER.status,
      message: { message: sm.ERROR_INTERNAL_SERVER.message },
    };
  }
};

//==============================================================================
// Description: Internal utility function for recursively tracking down the parent child loop in a tree.
// PRE-CONDITION:
//    @param       parent   ObjectId
// POST-CONDITION:
//    Returns the formatted tree result tracked down from the root of the tree
//    eg. [
//     {
//         "<id>": {
//             "label": "<first item>",
//             "children": [
//                 {
//                     "<id>": {
//                         "label": "<another item>",
//                         "children": [] // empty children
//                     }
//                 },
//                 {
//                     "<id>": {
//                         "label": "<another item>",
//                         "children": [ ...<any children>... ]
//                     }
//                 }
//             ]
//         }
//     }
// ]
const getAnimalsHelper = async (parent) => {
  let root = await getAnimal(
    parent ? { _id: ObjectId(parent) } : { parent: null }
  );
  if (!root) {
    return [];
  }
  try {
    let children = await Animal.find({
      parent: ObjectId(root._id),
    }).lean();

    if (!children.length) {
      return formatData(root._id, root.label, []);
    }

    let childrenResult = await Promise.all(
      children.map(async (child) => {
        {
          return await getAnimalsHelper(child._id);
        }
      })
    );
    return formatData(root._id, root.label, childrenResult);
  } catch (e) {
    logger.error("Error retrieving tree", e);
    throw {
      code: sm.ERROR_INTERNAL_SERVER.status,
      message: { message: sm.ERROR_INTERNAL_SERVER.message },
    };
  }
};

//==============================================================================

//==============================================================================
// Description: Internal utility function for formatting nested tree node data.
// PRE-CONDITION:
//    @param       id         ObjectId
//    @param       label      String
//    @param       children   [AnimalSchema]
// POST-CONDITION:
//    Returns the formatted tree result tracked down from the root of the tree
//    eg. {
//     "<id>": {
//         "label": "<another item>",
//         "children": [] // empty children
//     }
// },
const formatData = (id, label, children) => {
  return {
    [id]: Object.assign(
      {},
      {
        label: label,
        children: children,
      }
    ),
  };
};
//==============================================================================

module.exports = {
  createAnimal,
  getAnimals,
};
