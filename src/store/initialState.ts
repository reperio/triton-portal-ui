export class State {
    authSession: StateAuthSession;
    virtualMachines: StateVirtualMachines;
    virtualMachineActions: StateVirtualMachineActions;
    virtualMachineCreate: StateVirtualMachineCreate;
    virtualMachineLoad: StateVirtualMachineLoad;
    accountCreate: StateAccountCreate;
    accountEdit: StateAccountEdit;
    accountLoad: StateAccountLoad;
    packages: StatePackages;
    sshKeys: StateSshKeys;
    networks: StateNetworks;
    networkCreate: StateNetworkCreate;
    networkActions: StateNetworkActions;
    images: StateImages;
}

export class StateAuthSession {
    isAuthenticated: boolean;
    user: any;
    isLoading: boolean;
}

export class StateVirtualMachines {
    vms: any[];
    isLoading: boolean;
}

export class StateVirtualMachineActions {
    isLoading: boolean;
}

export class StateVirtualMachineCreate {
    isLoading: boolean;
}

export class StateVirtualMachineLoad {
    hasLoaded: boolean;
    vm: any;
}

export class StateAccountCreate {
    isLoading: boolean;
}

export class StateAccountEdit {
    isLoading: boolean;
}

export class StateAccountLoad {
    hasLoaded: boolean;
    user: any;
}

export class StatePackages {
    hasLoaded: boolean;
    packages: any[];
    showInformation: boolean;
    selectedPackage: any;
}

export class StateImages {
    hasLoaded: boolean;
    images: any[];
    selectedImage: any;
}

export class StateSshKeys {
    sshKeys: any[];
    isLoading: boolean;
}

export class StateNetworks {
    hasLoaded: boolean;
    isLoading: boolean;
    networks: any[];
    selectedNetworks: any[];
}

export class StateNetworkCreate {
    isLoading: boolean;
}

export class StateNetworkActions {
    isLoading: boolean;
}

export const initialState: State = {
    authSession: {
        isAuthenticated: false,
        user: null,
        isLoading: false
    },
    virtualMachines: {
        vms: [], 
        isLoading: false
    },
    virtualMachineActions: {
        isLoading: false
    },
    virtualMachineCreate: {
        isLoading: false
    },
    virtualMachineLoad: {
        hasLoaded: false,
        vm: null
    },
    accountCreate: {
        isLoading: false
    },
    accountEdit: {
        isLoading: false
    },
    accountLoad: {
        hasLoaded: false,
        user: null
    },
    packages: {
        hasLoaded: false,
        packages: [],
        showInformation: false,
        selectedPackage: null
    },
    images: {
        hasLoaded: false,
        images: [],
        selectedImage: null
    },
    sshKeys: {
        sshKeys: [],
        isLoading: false
    },
    networks: {
        hasLoaded: false,
        networks: [],
        isLoading: false,
        selectedNetworks: []
    },
    networkCreate: {
        isLoading: false
    },
    networkActions: {
        isLoading: false
    }
};