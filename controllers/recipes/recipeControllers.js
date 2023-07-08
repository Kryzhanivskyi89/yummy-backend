const Recipe = require("../../models/recipes")

const getById = async (req, res, next) => {
    try{
      const {id} = req.params;
      const result = await Recipe.findOne({_id: id});
      if(!result){
        return res.status(404).json({ message: "Not found1" });
      }
      res.json(result);
   
    }
    catch(error) {
      return res.status(404).json({ message: "Invalid Id" });
    }
  }

  module.exports = {
    getById,
}