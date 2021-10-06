import { Note } from "@tonaljs/tonal";

export class MIDIEvent {
    note: number = -1;
    noteName: string = "";
    velocity: number = -1;
    start: boolean = false; // true if note on, false if note off

    static createEvent(rawEvent: any): MIDIEvent {
        // TODO check if event is valid
        const e = new MIDIEvent();
        e.start = rawEvent.isNoteOn();
        e.note = rawEvent.getNote();
        e.noteName = Note.fromMidi(e.note);
        e.velocity = rawEvent.getVelocity();
        return e;
    }
    constructor() { }
}
