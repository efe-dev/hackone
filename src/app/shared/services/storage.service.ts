import { BehaviorSubject } from 'rxjs';
import { DatabaseResponse, EventResponse } from 'src/app/models';

class StorageService {
  public static instance = new StorageService();

  public events = new BehaviorSubject<DatabaseResponse<EventResponse[]>>(null);

  constructor() {
    if (StorageService.instance) {
      throw new Error('Cannot duplicate service.');
    }
  }
}

export default StorageService.instance;
