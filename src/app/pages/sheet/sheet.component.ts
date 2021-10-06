import { Component, OnDestroy, OnInit } from "@angular/core";
import { MidiInService } from "src/app/services/midi-in.service";
import Vex from "vexflow";
import { MIDIEvent } from 'src/app/models/midi-event.model';
import { Subscription } from "rxjs";

@Component({
    selector: "app-sheet",
    templateUrl: "./sheet.component.html",
    styleUrls: ["./sheet.component.scss"]
})
export class SheetComponent implements OnInit, OnDestroy {
    sub: Subscription;
    constructor(private midiIn: MidiInService) { }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    notes = [];

    ngOnInit() {
        const VF = Vex.Flow;

        var div = document.getElementById("boo")
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Size our SVG:
        renderer.resize(500, 500);


        // And get a drawing context:
        var context = renderer.getContext();
        // Create a stave at position 10, 40 of width 400 on the canvas.
        var stave = new VF.Stave(10, 40, 400);

        // Add a clef and time signature.
        stave.addClef("treble").addTimeSignature("4/4");

        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();


        // Size our SVG:
        renderer.resize(500, 500);

        // And get a drawing context:
        var context = renderer.getContext();
        const vf = new Vex.Flow.Factory({
            renderer: { elementId: "boo" }
        });
        this.sub = this.midiIn.getMIDIEventListener().subscribe((midiEvent: MIDIEvent) => {
            if (midiEvent.start) {
                this.notes.push(midiEvent);
                console.log('midiEvent', midiEvent);
                if (this.notes.length % 4 === 0) {
                    const system = vf.System();
                    for (let i = 0; i < this.notes.length; i += 4) {
                        const score = vf.EasyScore();
                        var op = this.notes.slice(i, i + 4).map(n => n.noteName).join('/q, ') + '/q';
                        op = op.toString()
                        console.log('op', op);
                        system.addStave({
                            voices: [
                                score.voice(score.notes(op, { stem: 'down' }))
                            ]
                        });
                    }
                    system.addConnector()
                    vf.draw();
                }
            }

        })
    }



}
