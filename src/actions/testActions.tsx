import * as types from '../constants/actionTypes';
import {TestService} from '../services'

export function test(field: string, message: string) {
    return {
        type: types.TEST,
        field,
        message
    };
}

export function test2() {
    return async function (dispatch:any) {
      // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
      const service = new TestService();
      const result = await service.getTestMessage();
        
      return dispatch({
        type: types.TEST2,
        field: 'testAsyncMessage',
        message: result.data.message
      });
    };
  }