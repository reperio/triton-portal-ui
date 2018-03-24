export class State {
    authSession: StateAuthSession;
    virtualMachines: StateVirtualMachines;
    createAccount: StateCreateAccount
}

export class StateAuthSession {
    isPending: boolean;
    isAuthenticated: boolean;
    isError: boolean;
    errorMessage: string;
    user: any;
    isLoading: boolean;
}

export class StateVirtualMachines {
    vms: any[];
    isLoading: boolean;
}

export class StateCreateAccount {
    isLoading: boolean;
}

export const initialState: State = {
    authSession: {
        isPending: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: null,
        user: null,
        isLoading: false
    },
    virtualMachines: {
        vms: [], 
        isLoading: false
    },
    createAccount: {
        isLoading: false
    }
};