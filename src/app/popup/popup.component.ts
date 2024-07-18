import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-popup',
	standalone: true,
	imports: [NgbDatepickerModule],
	templateUrl: './popup.component.html',
})
export class PopupComponent {
  @ViewChild('content') public ref!: TemplateRef<any>;

  @Input()
  set open(openN: number) {
    if(openN>0){
      console.log("open popup")
      this._open(this.ref);
    }
  }

  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();

	private modalService = inject(NgbModal);

	_open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        if(result==="save"){
          this.onSave.emit();
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