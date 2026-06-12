import { SpFxCoreLoggingService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreLoggingService/SpFxCoreLoggingService';
import store from '../redux/Store';
import { ENABLE_ERROR } from '../redux/reducers/CommonsStateReducer';

const coreLoggingService = new SpFxCoreLoggingService();

export class LoggingService {
  public static handleError(error: Error, context: string): void {
    void coreLoggingService.handleError(error, context);
    store.dispatch(ENABLE_ERROR());
  }
}
