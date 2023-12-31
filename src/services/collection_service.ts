import { ICollectionSchema } from "../utils/interfaces";
import Collection from "../models/collection";
import { Status } from "../utils/enum";
import HandleError from "../utils/errors/handleError";
import User from "../models/users";
import Sediments from "../models/sediment";
import { log } from "console";

class CollectionService {
  static async createCollectionService(
    collectionData: Partial<ICollectionSchema>,
    session: any
  ) {
    try {
      collectionData.status = Status.WAITING_FOR_APPROVAL;

      const collection = new Collection({ ...collectionData });

      const saveCollection = await collection.save({ session });

      return saveCollection;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCollectionByPageService(
    idCompany: string,
    idDepartment: string,
    itemsPerPage: number,
    skip: number
  ) {
    try {
      let query: any = {
        idCompany,
        deleted: false,
      };

      if (idDepartment) {
        query = { ...query, idDepartment };
      }

      const collections = await Collection.find(query)
        .skip(skip)
        .limit(itemsPerPage);

      if (collections.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      let totalCollection = await Collection.find(query).count();

      const totalPages = Math.ceil(totalCollection / itemsPerPage);

      return { collections: collections.reverse(), totalPages };
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getCollectionByIdService(
    idCompany: string,
    idDepartment: string,
    id: string
  ) {
    try {
      let query: any = {
        idCompany,
        id,
        deleted: false,
      };

      if (idDepartment) {
        query = { ...query, idDepartment };
      }

      const collection = await Collection.findById(id);

      return collection;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CollectionService;
