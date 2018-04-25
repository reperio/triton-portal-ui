export class State {
    authSession: StateAuthSession;
    virtualMachines: StateVirtualMachines;
    virtualMachineActions: StateVirtualMachineActions;
    virtualMachineCreate: StateVirtualMachineCreate;
    accountCreate: StateAccountCreate;
    accountEdit: StateAccountEdit;
    accountLoad: StateAccountLoad;
    packages: StatePackages;
    sshKeys: StateSshKeys;
    networks: StateNetworks;
    networkCreate: StateNetworkCreate;
    networkActions: StateNetworkActions;
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

export class StateVirtualMachineActions {
    isLoading: boolean;
    errorMessages: string[];
}

export class StateVirtualMachineCreate {
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
    hasLoaded: boolean;
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
    hasLoaded: boolean;
    isLoading: boolean;
    errorMessages: string[];
    networks: any[];
    selectedNetworks: any[];
}

export class StateNetworkCreate {
    isLoading: boolean;
    errorMessages: string[];
}

export class StateNetworkActions {
    isLoading: boolean;
    errorMessages: string[];
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
    virtualMachineActions: {
        isLoading: false,
        errorMessages: [],
    },
    virtualMachineCreate: {
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
        hasLoaded: false,
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
        hasLoaded: false,
        networks: [],
        errorMessages: [],
        isLoading: false,
        selectedNetworks: []
    },
    networkCreate: {
        errorMessages: [],
        isLoading: false
    },
    networkActions: {
        errorMessages: [],
        isLoading: false
    }
};