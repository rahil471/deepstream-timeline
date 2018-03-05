import { Injectable } from "@angular/core";

declare var deepstream;

@Injectable()
export class DsService {
    public ds;

    constructor(){
        this.ds = deepstream('localhost:6020');
    }
}