import { Component, OnChanges, SimpleChange, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wtp-url',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="urlForm" (ngSubmit)="onChangeUrl()">
      <input formControlName="url" class="form-control" placeholder="magnet or torrent url"/>
    </form>
  `
})
export class UrlComponent implements OnChanges, OnInit{
  @Input() url: string;
  @Output() changeUrl = new EventEmitter<string>();
  
  urlForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['url'] && changes['url'].previousValue !== changes['url'].currentValue) {
      if (!this.url) return;

      this.urlForm.patchValue({
        url: this.url
      })
    }
  }

  ngOnInit() {
    this.urlForm = this.fb.group({
      url: [this.url, Validators.required]
    });
  }

  onChangeUrl() {
    if (!this.urlForm.valid) return;

    this.changeUrl.emit(this.urlForm.value.url);

    // this.urlForm.reset();
  }
}
