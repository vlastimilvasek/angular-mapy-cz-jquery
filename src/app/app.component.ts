import { Component, VERSION, OnInit } from '@angular/core';
import SeznamMapFactory from './SeznamMapFactory';
// import $ from 'jquery';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  ngOnInit()
  {
    // console.log($('#map').text()); // jquery is accessible
    let map: any; // SMap object
    let mapContainter = document.getElementById("map");
    const mapFactory = new SeznamMapFactory(); // factory object
    mapFactory.init( () => { // async load of scripts
        map = mapFactory.helper.createDefaultMap(mapContainter, 49.8702481, 16.3110697, 17); // after load we can use maps
        // let layer = mapFactory.helper.createMarkerLayer;
        console.log(window.SMap);
        let layer = new window.SMap.Layer.Marker();
        map.addLayer(layer);
        layer.enable();

        let card = new window.SMap.Card();
        card.getHeader().innerHTML = "<strong>Nadpis</strong>";
        card.getBody().innerHTML = "Ahoj, já jsem <em>obsah vizitky</em>!";

        let options = { 
            title: "Dobré ráno"
        };
        let center = window.SMap.Coords.fromWGS84(16.3110, 49.870248);
        let marker = new window.SMap.Marker(center, "myMarker", options);
        
        marker.decorate(window.SMap.Marker.Feature.Card, card);
        layer.addMarker(marker);
        // map.addLayer(layer);
        // layer.;
        // other map stuff - markers, layers, etc.
    });
  }

}
