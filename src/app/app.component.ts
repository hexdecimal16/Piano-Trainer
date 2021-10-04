import { Component } from '@angular/core';
import * as JZZ from 'jzz';
import * as SYNTH from 'jzz-synth-tiny';
import * as INPUT from 'jzz-input-kbd';
// var JZZ = require('jzz');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'piano-trainer';
  inputs = [];
  outputs = [];
  selectedInput = null;
  selectedOutput = null;

  constructor() {
    this.onInOutChange();
  }

  onChangeInput(event) {
    let name = event.target.value;
    console.log('onChangeInput', this.selectedInput);
    JZZ().openMidiIn(name).connect((msg) => {this.initListener(msg)})
  }

  onInOutChange() {
    JZZ().and(() => {
      console.log('JZZ ready', JZZ.info());
      this.inputs = []
      this.outputs = []
      this.inputs.push({'name': 'HTML Piano'});
      this.outputs.push({'name': 'Not Available'});
      this.inputs.push(...JZZ.info().inputs);
      this.outputs.push(...JZZ.info().outputs);
    });
  }

  initListener(msg) {
    console.log('initListener', msg);
  }

}
