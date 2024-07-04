import { Inject, Injectable, Scope } from '@nestjs/common'
import { Request } from 'express'
import { ENTITY_MANAGER_KEY } from './transaction.interceptor'
import { REQUEST } from '@nestjs/core'

import { DataSource, EntityManager, Repository as TypeormRepository } from 'typeorm'





@Injectable({ scope: Scope.REQUEST })
export class RepositoryService<T> {
  constructor(
    private dataSource: DataSource,
    @Inject(REQUEST)
    private request: Request
  ) {}



  protected entityClass: new () => T



  protected getRepository():TypeormRepository<T> {
    const entityManager:EntityManager = this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager
    return entityManager.getRepository(this.entityClass)
  }



  db():TypeormRepository<T> {
    return this.getRepository()
  }
}