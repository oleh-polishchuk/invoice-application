import { Injectable } from '@angular/core';
import { SimpleTableConfig } from "../entities/simple-table-config";

@Injectable()
export class SimpleTableService {

  simpleTableConfig: SimpleTableConfig;

  constructor() { }

  initConfig(options) {
    this.simpleTableConfig = {
      edit: options && options.edit,
      remove: options && options.remove
    }
  }

  getConfig() {
    return this.simpleTableConfig;
  }

}
