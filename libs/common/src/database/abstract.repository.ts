import { Logger, NotFoundException } from "@nestjs/common"
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose"

import { AbstractDocument } from "./abstract.document"

export abstract class AbstractRepository<D extends AbstractDocument> {
  protected abstract readonly logger: Logger

  protected constructor(protected readonly model: Model<D>) {}

  async create(payload: Omit<D, "_id">): Promise<D> {
    const document = new this.model({
      ...payload,
      _id: new Types.ObjectId()
    })
    return document.save()
  }

  async findOne(filter: FilterQuery<D>): Promise<D> {
    const document = await this.model.findOne(filter)
    if (!document) {
      this.logger.warn("Document not found with given query", filter)
      throw new NotFoundException("Document not found")
    }
    return document
  }

  async findOneAndUpdate(filter: FilterQuery<D>, update: UpdateQuery<D>) {
    const document = await this.model.findOneAndUpdate(filter, update, { new: true })
    if (!document) {
      this.logger.warn("Document not found with given query", filter)
      throw new NotFoundException("Document not found")
    }
    return document
  }

  async find(filter: FilterQuery<D>) {
    return this.model.find(filter)
  }

  async findOneAndDelete(filter: FilterQuery<D>): Promise<D> {
    const document = await this.model.findOneAndDelete(filter)
    if (!document) {
      this.logger.warn("Document not found with given query", filter)
      throw new NotFoundException("Document not found")
    }
    return document
  }
}
