import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SessionStorageService } from 'ngx-storage-api';
import { HomePage } from '../home/home.page';

import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements AfterViewInit {
  loaded = false
  component = HomePage;

  @ViewChild('pdfContent', { static: true }) map: ElementRef | undefined
  link: any = ''
  pdfData = JSON.parse(this.storageService.getItem('pdf'));
  row = 0;
  col = 0;
  data: any = {}

  constructor(private http: HttpClient, public navCtrl: NavController, public storageService: SessionStorageService, private route: ActivatedRoute) {
    const data = this.storageService.getItem('print');
    if (data)
      this.data = JSON.parse(data)
  }
  ngAfterViewInit(): void {
    this.captureScreen()
  }


  back() {
    this.navCtrl.navigateRoot('/');
  }
  captureScreen() {

    var data = document.getElementById('pdfContent') as any;
    var html = data.outerHTML

    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');


    const formData = { html: html };
    const encodedData = JSON.stringify(formData);

    axios({
      method: 'post',
      url: 'https://www.lineavitacarnia.com/pdf/1.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: encodedData,
    })
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      // @ts-ignore
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      const filename = 'Report_2023_09_30.pdf';
      pdf.save(filename); // Generated PDF  
      this.loaded = true
    });
  }

  goHome() {
    this.navCtrl.navigateRoot('/');
  }
}
