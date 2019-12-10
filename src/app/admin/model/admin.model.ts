import { Candidate } from './User.interface';

export class AdminModel {
    candidateList: Candidate[];
    newList: Array<any>;
    uniqueNames: Set<any>;
    menuExpanded: boolean;
    


    constructor(){
        this.candidateList=[];
        this.newList =[];
        this.uniqueNames = new Set();
        this.menuExpanded = true;
    }
}