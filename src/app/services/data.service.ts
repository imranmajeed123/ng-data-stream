import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class DataService {
    snapshot = new Subject<any>();
    updates = new Subject<any>();

    getSnapshotsObs() : Observable<any> {

        return this.snapshot.asObservable();
    }

    getUpdatesObs() : Observable<any> {

        return this.updates.asObservable();
    }

    sendSnapshot(snapshot: any) {
        this.snapshot.next(snapshot);
    }

    sendUpdate(update: any) {
        this.updates.next(update);
    }
}