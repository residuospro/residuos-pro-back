import { ISediments, ISedimentsService } from "../utils/interfaces";
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
        throw new HandleError("Esse resíduo já foi cadastrado", 409);
      }

      const sediments = new Sediments({
        ...sediment,
      });

      const saveSedments = await sediments.save();

      return saveSedments;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getSedimentsByPageService(
    idCompany: string,
    idDepartment: string,
    itemsPerPage: number
  ) {
    try {
      const sediments = await Sediments.find({
        idCompany,
        idDepartment,
        deleted: false,
      });

      if (sediments.length == 0) {
        throw new HandleError("Não há registros pra esse busca", 404);
      }

      let totalSediments = await Sediments.find({
        idCompany,
        idDepartment,
        deleted: false,
      }).count();

      const totalPages = Math.ceil(totalSediments / itemsPerPage);

      return { sediments, totalPages };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async updateSedimentService(
    sediment: ISedimentsService[],
    id: string
  ) {
    try {
      const { name, idCompany, idDepartment } = sediment[0];

      if (name) {
        let existingSediment = (await Sediments.findOne({
          name,
          idCompany,
          idDepartment,
          deleted: false,
        })) as any;

        if (existingSediment) {
          throw new HandleError("Esse resíduo já existe", 409);
        }
      }

      let sedimentToEdit = (await Sediments.findById(id)) as any;

      for (const key in sediment[0]) {
        const value = sediment[0][key as keyof ISedimentsService];

        if (value) {
          sedimentToEdit[key] = value;
        }
      }

      const updateSediment = await sedimentToEdit.save();

      return updateSediment;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Resíduo não encontrado");
    }
  }

  static async deleteSedimentService(id: string) {
    try {
      const currentDate = new Date();

      const sediment = await Sediments.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return sediment;
    } catch (error: any) {
      throw new Error("Resíduo não encontrado");
    }
  }
}

export default SedimentsService;
