export class State {
    authSession: StateAuthSession;
    virtualMachines: StateVirtualMachines;
    virtualMachinesActions: StateVirtualMachinesActions;
    createVirtualMachine: StateCreateVirtualMachine;
    account: StateAccount;
    packages: StatePackages;
}

export class StateAuthSession {
    isPending: boolean;
    isAuthenticated: boolean;
    errorMessages: string[];
    user: any;
    isLoading: boolean;
}

export class StateVirtualMachines {
    vms: any[];
    isLoading: boolean;
    errorMessages: string[];
}

export class StateVirtualMachinesActions {
    isLoading: boolean;
    errorMessages: string[];
}

export class StateCreateVirtualMachine {
    isLoading: boolean;
    errorMessages: string[];
}

export class StateAccount {
    isLoading: boolean;
    errorMessages: string[];
}

export class StatePackages {
    packages: any[];
    errorMessages: string[];
    showInformation: boolean;
    selectedPackage: any;
}

export const initialState: State = {
    authSession: {
        isPending: false,
        isAuthenticated: false,
        errorMessages: [],
        user: null,
        isLoading: false
    },
    virtualMachines: {
        vms: [], 
        isLoading: false,
        errorMessages: []
    },
    virtualMachinesActions: {
        isLoading: false,
        errorMessages: []
    },
    createVirtualMachine: {
        isLoading: false,
        errorMessages: []
    },
    account: {
        isLoading: false,
        errorMessages: []
    },
    packages: {
        packages: [],
        errorMessages: [],
        showInformation: false,
        selectedPackage: null
    }
};