import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InvoiceData, InvoiceItem } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  // styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent {
  @Output() generateInvoice = new EventEmitter<InvoiceData>();
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      clientName: ['', Validators.required],
      clientContact: ['', Validators.required],
      clientAddress: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const formValue = this.invoiceForm.value;
      const total = formValue.items.reduce(
        (sum: number, item: InvoiceItem) => sum + item.quantity * item.price,
        0
      );
      const sst = total * 0.1;
      const invoiceData: InvoiceData = {
        ...formValue,
        total,
        sst,
        grandTotal: total + sst,
        date: new Date().toISOString().split('T')[0],
        invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0')}`,
      };
      this.generateInvoice.emit(invoiceData);
    }
  }
}
