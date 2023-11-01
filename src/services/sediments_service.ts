import { ISedimentsService } from "../utils/interfaces";
import Sediments from "../models/sediment";
import HandleError from "../utils/errors/handleError";

class SedimentsService {
  static async createSedimentsService(sediment: ISedimentsService) {
    try {
      const { name, idCompany, idDepartment } = sediment;

      const existingSediment = await Sediments.findOne({
        name,
        idCompany,
        idDepartment,
      });

      if (existingSediment != null) {
        throw new Error("Esse resíduo já foi cadastrado");
      }

      const sediments = new Sediments({
        ...sediment,
      });

      const saveSedments = await sediments.save();

      return saveSedments;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getSedimentsByPageService(
    idCompany: string,
    idDepartment: string,
    skip: number,
    itemsPerPage: number
  ) {
    try {
      const sediments = await Sediments.find({
        idCompany,
        idDepartment,
        deleted: false,
      })
        .skip(skip)
        .limit(itemsPerPage);

      if (sediments.length == 0) {
        throw new HandleError("Não há registros pra esse busca", 404);
      }

      const totalSediments = await Sediments.find({
        idCompany,
        idDepartment,
        deleted: false,
      }).count();

      const totalPages = Math.ceil(totalSediments / itemsPerPage);

      return { sediments, totalPages };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getNameOfSedimentsService(
    idCompany: string,
    idDepartment: string
  ) {
    try {
      const sediments = await Sediments.find({
        idCompany,
        idDepartment,
        deleted: false,
      });

      return sediments;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default SedimentsService;
