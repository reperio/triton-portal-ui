import nic from '../models/nicModel';

export default class VirtualMachineCreateModel {
    alias: string;
    image: string;
    brand: string;
    nics: nic;
}