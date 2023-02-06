const animalService = require("../services/animal.service");
const sm = require("../constants/server-messages");

//==============================================================================
// Task: 1
// ROUTE: POST http://localhost:3001/api/tree
// PRE-CONDITION:
//    @header     Basic Authentication
//    @body       parent   ObjectId
//    @body       label    String
// POST-CONDITION:
//    Returns the created AnimalSchema Object
//    eg. AnimalSchema { parent: ObjectId, label: String }.
const createAnimal = async (req, res) => {
  const { parent, label } = req.body;
  if (!label) {
    return res
      .status(sm.INVALID_PAYLOAD.status)
      .json({ message: sm.INVALID_PAYLOAD.message });
  }
  let result;
  try {
    result = await animalService.createAnimal(parent, label);
  } catch (e) {
    return res
      .status(sm.ERROR_INTERNAL_SERVER.status)
      .json({ message: sm.ERROR_INTERNAL_SERVER.message });
  }
  return res.status(200).json({ result });
};
//==============================================================================

//==============================================================================
// Task: 2
// ROUTE: GET http://localhost:3001/api/tree
// PRE-CONDITION:
//    @header     Basic Authentication
// POST-CONDITION:
//    Returns array of nested tree structure of animals
//    eg. [AnimalSchema { parent: ObjectId, label: String }].
const getAnimals = async (req, res) => {
  let result;
  try {
    result = await animalService.getAnimals();
  } catch (e) {
    return res
      .status(sm.ERROR_INTERNAL_SERVER.status)
      .json({ message: sm.ERROR_INTERNAL_SERVER.message });
  }
  return res.status(sm.SUCCESS.status).json([result]);
};
//==============================================================================

module.exports = {
  createAnimal,
  getAnimals,
};
