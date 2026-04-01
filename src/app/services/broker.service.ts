import { Injectable } from '@angular/core';
import { Broker } from '../models/broker.model';

import brokersData from '../../assets/brokers.json';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  private brokers: Broker[] = brokersData as Broker[];

  constructor() {}
 
  getBrokers(): Broker[] {
    return this.brokers;
  }
}
