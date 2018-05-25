export class State {
    authSession: StateAuthSession;
    virtualMachines: StateVirtualMachines;
    virtualMachineActions: StateVirtualMachineActions;
    virtualMachineCreate: StateVirtualMachineCreate;
    virtualMachineLoad: StateVirtualMachineLoad;
    accountCreate: StateAccountCreate;
    accountEdit: StateAccountEdit;
    account: StateAccount;
    packages: StatePackages;
    networks: StateNetworks;
    networkCreate: StateNetworkCreate;
    networkActions: StateNetworkActions;
    images: StateImages;
    virtualMachineExtendedDetails: StateVirtualMachineExtendedDetails;
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
    isLoading: boolean;
    vm: any;
}

export class StateAccountCreate {
    isLoading: boolean;
}

export class StateAccountEdit {
    isLoading: boolean;
}

export class StateAccount {
    isLoading: boolean;
    user: any;
}

export class StatePackages {
    isLoading: boolean;
    packages: any[];
    showInformation: boolean;
    selectedPackage: any;
}

export class StateImages {
    isLoading: boolean;
    images: any[];
    //selectedImage: any;
}

export class StateSshKeys {
    sshKeys: any[];
    isLoading: boolean;
}

export class StateNetworks {
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

export class StateVirtualMachineExtendedDetails {
    isLoading: boolean;
    imageName: string;
    serverName: string;
    packageName: string;
    vm: any;
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
        isLoading: false,
        vm: null
    },
    accountCreate: {
        isLoading: false
    },
    accountEdit: {
        isLoading: false
    },
    account: {
        isLoading: false,
        user: null
    },
    packages: {
        isLoading: false,
        packages: [],
        showInformation: false,
        selectedPackage: null
    },
    images: {
        isLoading: false,
        images: []
        //selectedImage: null
    },
    networks: {
        isLoading: false,
        networks: [],
        selectedNetworks: []
    },
    networkCreate: {
        isLoading: false
    },
    networkActions: {
        isLoading: false
    },
    virtualMachineExtendedDetails: {
        isLoading: false,
        imageName: null,
        packageName: null,
        serverName: null,
        vm: null
    }
};