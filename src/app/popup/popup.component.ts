import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-popup',
	standalone: true,
	imports: [NgbDatepickerModule, FormsModule],
	templateUrl: './popup.component.html',
})
export class PopupComponent {
  @ViewChild('content') public ref!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  name!: string;
  desc!: string;

  @Input()
  set open(openN: number) {
    if(openN>0){
      console.log("open popup")
      this._open(this.ref);
    }
  }

  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter<Array<string>>();

	_open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        if(result==="save"){
          console.log("emit", [this.name, this.desc])
          this.onSave.emit([this.name, this.desc]);
          this.name = ""
          this.desc = ""
        }else{
          this.onClose.emit();
        }
			},
			(reason) => {
        this.onClose.emit();
			},
		);
	}
}