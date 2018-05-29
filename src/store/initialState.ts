import VirtualMachineModel from "../models/virtualMachineModel";
import NetworkModel from "../models/networkModel";
import UserModel from "../models/userModel";
import PackageModel from "../models/packageModel";

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
}

export class StateAuthSession {
    isAuthenticated: boolean;
    user: UserModel;
    isLoading: boolean;
}

export class StateVirtualMachines {
    vms: VirtualMachineModel[];
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
    user: UserModel;
}

export class StatePackages {
    isLoading: boolean;
    packages: PackageModel[];
    showInformation: boolean;
    selectedPackage: PackageModel;
}

export class StateImages {
    isLoading: boolean;
    images: any[];
    selectedImage: any;
}

export class StateSshKeys {
    sshKeys: any[];
    isLoading: boolean;
}

export class StateNetworks {
    isLoading: boolean;
    networks: NetworkModel[];
    selectedNetworks: NetworkModel[];
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
        images: [],
        selectedImage: null
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
    }
};