

import { Router } from 'express';
import { haccpController } from '../dependencies';


const haccpRoute = Router();
haccpRoute.post('/haccp', haccpController.addLot.bind(haccpController));
haccpRoute.post('/haccp/update-state', haccpController.updateState.bind(haccpController));
haccpRoute.post('/haccp/search', haccpController.searchByState.bind(haccpController));

export { haccpRoute };