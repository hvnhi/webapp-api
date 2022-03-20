import { NotFoundException } from '@nestjs/common';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  getRepository,
  Repository,
} from 'typeorm';

export abstract class BaseService<T> {
  protected repository: Repository<T>;

  constructor(type) {
    this.repository = getRepository(type);
  }

  public async list(
    params: any = {},
    options?: FindManyOptions<T>,
  ): Promise<[T[], number]> {
    const { page = 1, limit = 100 } = params;

    const opts: FindManyOptions<T> = {
      skip: (page - 1) * limit,
      take: limit,
      ...options,
    };

    return await this.repository.findAndCount(opts);
  }

  public async getOne(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    return await this.repository.findOne(conditions, options);
  }

  public async getOneOrFail(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    try {
      return await this.repository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
