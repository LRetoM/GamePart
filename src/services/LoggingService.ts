import store from "../redux/Store";
import { SpFxCoreLoggingService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreLoggingService/SpFxCoreLoggingService';
import { ENABLE_ERROR } from "../redux/reducers/CommonsStateReducer";
import { HttpRequestError } from '@pnp/queryable';

const coreLoggingService = new SpFxCoreLoggingService();

export class LoggingService {
    public static async handleError(error: Error | HttpRequestError, message: string): Promise<void> {
        store.dispatch(ENABLE_ERROR())
        await coreLoggingService.handleError(error, message)
    }
}