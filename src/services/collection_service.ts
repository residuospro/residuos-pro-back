import { ICollectionFilter, ICollectionSchema } from "../utils/interfaces";
import Collection from "../models/collection";
import { Status } from "../utils/enum";
import HandleError from "../utils/errors/handleError";

class CollectionService {
  static async createCollectionService(
    collectionData: Partial<ICollectionSchema>,
    session: any
  ) {
    try {
      collectionData.status = Status.WAITING_FOR_APPROVAL;

      const collection = new Collection({ ...collectionData });

      let saveCollection = await collection.save({ session });

      collection.orderNumber = saveCollection.id.slice(-6);

      const newSaveCollection = await collection.save({ session });

      return newSaveCollection;
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
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(itemsPerPage);

      if (collections.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      let totalCollection = await Collection.find(query).count();

      const totalPages = Math.ceil(totalCollection / itemsPerPage);

      return { collections, totalPages };
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

  static async getCollectionByFilterService(
    collectionFilter: ICollectionFilter,
    itemsPerPage: number,
    skip: number
  ) {
    try {
      let query: Partial<ICollectionFilter> = {
        idCompany: collectionFilter.idCompany,
      };

      for (const key in collectionFilter) {
        if (collectionFilter[key as keyof ICollectionFilter]) {
          if (key === "date") {
            const startDate = new Date(collectionFilter.date);

            const endDate = new Date(
              new Date(collectionFilter.date).setDate(startDate.getDate() + 1)
            );

            query["createdAt"] = {
              $gte: startDate,
              $lt: endDate,
            };
          } else {
            query[key as keyof ICollectionFilter] =
              collectionFilter[key as keyof ICollectionFilter];
          }
        }
      }

      const collections = await Collection.find({ ...query, deleted: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(itemsPerPage);

      if (collections.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      let totalCollection = await Collection.find(query).count();

      const totalPages = Math.ceil(totalCollection / itemsPerPage);

      return { collections, totalPages };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  static async updateCollectionStatusService(
    id: string,
    status: string,
    reason?: string
  ) {
    try {
      let collection = await Collection.findById(id);

      collection.status = status;

      if (reason) collection.reasonRefusal = reason;

      const updateCollection = await collection.save();

      return updateCollection;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateCollectionService(
    id: string,
    collection: Partial<ICollectionSchema>
  ) {
    try {
      let currentCollection = await Collection.findById(id);

      Object.assign(currentCollection, collection);

      currentCollection.save();

      return currentCollection;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteCollectionService(id: string) {
    try {
      const currentDate = new Date();

      const collection = await Collection.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return collection;
    } catch (error: any) {
      throw new Error("Coleta não encontrada");
    }
  }
}

export default CollectionService;
