import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApplicationDataService {
    constructor() { }
    
    public otheruserdata = new BehaviorSubject<any | null>(null);
    public convenordata = new BehaviorSubject<any | null >(null);
    public attendeedata = new BehaviorSubject<any | null>(null);
    public role = new BehaviorSubject<string>("");
    public isFileUploaded = new BehaviorSubject<any | null>(null);
    public selectedorganiser = new BehaviorSubject<any|null>(null);
    public availableorganisers = new BehaviorSubject<any | null>(null);
    public availabletimeslots = new BehaviorSubject<any | null>(null);
    public availabledates = new BehaviorSubject<any | null>(null);
}