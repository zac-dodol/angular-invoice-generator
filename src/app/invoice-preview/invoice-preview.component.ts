import { Component, Input } from '@angular/core';
import { InvoiceData } from '../models/invoice.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  // styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent {
  @Input() invoiceData: InvoiceData | null = null;

  async downloadPDF() {
    const element = document.getElementById('invoice-preview');
    const buttonContainer = document.getElementById(
      'download-button-container'
    );
    if (element && buttonContainer && this.invoiceData) {
      buttonContainer.style.display = 'none';
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      buttonContainer.style.display = 'block';
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice-${this.invoiceData.invoiceNumber}.pdf`);
    }
  }
}
