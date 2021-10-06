import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MidiInService } from "../../services/midi-in.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    title = 'piano-trainer';
    selectedInput: any;
    inputs: any[]= [];

    constructor(private ref: ChangeDetectorRef, private midiIn: MidiInService, private router: Router) { }

    ngOnInit() {
        this.midiIn.init().then(() => {
            this.inputs = this.midiIn.inputs
            this.ref.detectChanges();
            this.midiIn.addChangeListener(this.onInputChange.bind(this));
        });
    }

    onDropDownChange(event: any) {
        this.selectedInput = event.target.value;
        this.midiIn.changeInputPort(this.selectedInput);
    }

    onInputChange() {
        const inputs = this.midiIn.getInputs().reverse();
        for (let i = 0; i < inputs.length; i++) {
            let id = inputs[i]['id'];
            var found = false;
            for (let j = 0; j < this.inputs.length; j++) {
                if (this.inputs[j]['id'] === id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.inputs = inputs;
                this.ref.detectChanges();
                this.midiIn.changeInputPort(id);
                break;
            }
        }
    }

    onNavigate() {
        this.router.navigate(["/sheet"]);
    }
}