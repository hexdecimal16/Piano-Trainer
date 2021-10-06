import { Injectable } from '@angular/core';
import * as JZZ from "jzz"
import { MIDIEvent } from '../models/midi-event.model';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MidiInService {
  inputs: any[] =[];
  port:any = null;
  engine:any = null;
  private sub = new Subject<MIDIEvent>();

  async init() {
    this.engine = await JZZ();
    this.inputs = this.engine.info().inputs.reverse();
    this.changeInputPort(this.inputs[0]);
  }

  constructor() {
  }

  changeInputPort(portName: string) {
    if (this.port != null) {
      this.port.close();
    }
    this.port = this.engine.openMidiIn(portName)
    .connect((event:any) => {
      this.nextMIDIEvent(MIDIEvent.createEvent(event));
    });
    console.log('connected', this.port.info());
  }

  addChangeListener(callback: (msg: any) => void) {
    this.engine.onChange(callback);
  }

  addConnectionListener(callback: (msg: any) => void) {
    this.port.connect(callback);
  }
  
  addMIDIEventListener(callback: (msg: MIDIEvent) => void) {
    this.port.connect((event:any) => {
      return callback(MIDIEvent.createEvent(event));
    });
  }
  
  getInputs() {
    return this.engine.info().inputs;
  }

  getMIDIEventListener() {
    return this.sub.asObservable();
  }

  private nextMIDIEvent(event: MIDIEvent) {
    this.sub.next(event);
  }
}

