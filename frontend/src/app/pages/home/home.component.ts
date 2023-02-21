import { Component, OnInit } from '@angular/core';
import { TemperatureService } from 'src/app/services/temperature.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private temperatureService: TemperatureService) { }

  ngOnInit(): void {
    this.temperatureService.getTemperatureAndHumidity()
      .then((res) => {
        this.data = res.data;
      }).catch((err) => {
        console.log(err);
      })
  }

}
