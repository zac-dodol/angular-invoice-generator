import { Component } from '@angular/core';
import { InvoiceData } from './models/invoice.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Invoice Generation App';
  invoiceData: InvoiceData | null = null;

  onGenerateInvoice(data: InvoiceData) {
    this.invoiceData = data;
  }
}
