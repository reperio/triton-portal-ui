export class State {
    authSession: StateAuthSession;
    virtualMachines: StateVirtualMachines;
    account: StateAccount;
}

export class StateAuthSession {
    isPending: boolean;
    isAuthenticated: boolean;
    isError: boolean;
    errorMessages: string[];
    user: any;
    isLoading: boolean;
}

export class StateVirtualMachines {
    vms: any[];
    isLoading: boolean;
    isError: boolean;
    errorMessages: string[];
}

export class StateAccount {
    isLoading: boolean;
    isError: boolean;
    errorMessages: string[];
}

export const initialState: State = {
    authSession: {
        isPending: false,
        isAuthenticated: false,
        isError: false,
        errorMessages: [],
        user: null,
        isLoading: false
    },
    virtualMachines: {
        vms: [], 
        isLoading: false,
        isError: false,
        errorMessages: [],
    },
    account: {
        isLoading: false,
        isError: false,
        errorMessages: []
    }
};