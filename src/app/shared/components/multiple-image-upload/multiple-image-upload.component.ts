import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multiple-image-upload',
  templateUrl: './multiple-image-upload.component.html',
  styleUrls: ['./multiple-image-upload.component.scss'],
})
export class MultipleImageUploadComponent implements OnInit {

  @Output() files = new EventEmitter<any>();

  images: any = [];
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  submit() {
    console.log(this.myForm.value);
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event?.target.result);
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
