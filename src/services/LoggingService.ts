import { SpFxCoreLoggingService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreLoggingService/SpFxCoreLoggingService';
import store from '../redux/Store';
import { ENABLE_ERROR } from '../redux/reducers/CommonsStateReducer';

const coreLoggingService = new SpFxCoreLoggingService();

export class LoggingService {
  public static async handleError(error: Error, message: string): Promise<void> {
    store.dispatch(ENABLE_ERROR());
    await coreLoggingService.handleError(error, message);
  }
}
