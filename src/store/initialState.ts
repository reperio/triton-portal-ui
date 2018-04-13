export class State {
    authSession: StateAuthSession;
    virtualMachines: StateVirtualMachines;
    virtualMachinesActions: StateVirtualMachinesActions;
    createVirtualMachine: StateCreateVirtualMachine;
    accountCreate: StateAccountCreate;
    accountEdit: StateAccountEdit;
    accountLoad: StateAccountLoad;
    packages: StatePackages;
    sshKeys: StateSshKeys;
    networks: StateNetworks;
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

export class StateAccountCreate {
    isLoading: boolean;
    errorMessages: string[];
}

export class StateAccountEdit {
    isLoading: boolean;
    errorMessages: string[];
}

export class StateAccountLoad {
    hasLoaded: boolean;
    errorMessages: string[];
    user: any;
}

export class StatePackages {
    packages: any[];
    errorMessages: string[];
    showInformation: boolean;
    selectedPackage: any;
}

export class StateSshKeys {
    sshKeys: any[];
    isLoading: boolean;
    errorMessages: string[];
}

export class StateNetworks {
    isLoading: boolean;
    errorMessages: string[];
    networks: any[];
    selectedNetworks: any[];
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
    accountCreate: {
        isLoading: false,
        errorMessages: []
    },
    accountEdit: {
        isLoading: false,
        errorMessages: []
    },
    accountLoad: {
        hasLoaded: false,
        errorMessages: [],
        user: null
    },
    packages: {
        packages: [],
        errorMessages: [],
        showInformation: false,
        selectedPackage: null
    },
    sshKeys: {
        sshKeys: [],
        errorMessages: [],
        isLoading: false
    },
    networks: {
        networks: [],
        errorMessages: [],
        isLoading: false,
        selectedNetworks: []
    }
};