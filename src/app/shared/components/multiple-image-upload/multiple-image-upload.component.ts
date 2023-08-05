import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-multiple-image-upload',
  templateUrl: './multiple-image-upload.component.html',
  styleUrls: ['./multiple-image-upload.component.scss'],
})
export class MultipleImageUploadComponent implements OnInit {

  serverUrl:string = environment.url;

  @Output() files = new EventEmitter<any>();
  @Input() editImages:any = [];

  images: any = [];
  totalFiles: File[] = [];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    files: new FormControl<any>([], Validators.required),
  });

  constructor(private toster: ToastrService) {}

  ngOnInit(): void {

  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        if (this.images.length > 5) {
          this.toster.error("Sorry..You Can't Add More Then Six Images.");
          return;
        } else {
          this.files.emit(event.target.files[0]);
          const reader = new FileReader();
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
}
