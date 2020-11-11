// Declare types for Seznam Mapy
declare global {
  interface Window {
    Loader: any;
    SMap: any;
  }
}

export type TLayer = {
  setClusterer: (clusterer: TClusterer) => TLayer;
  addMarker: (marker: TMarker | TMarker[]) => TLayer;
  enable: () => void;
  disable: () => void;
  redraw: (full: boolean) => void;
  getId: () => string;
};
export type TClusterer = {};
export type TMarker = {
  click: () => void;
  getId: () => void;
  decorate: (type: any, item: TCard) => void;
};
export type TCard = {
  setSize: (x: number, y: number) => TCard;
  getHeader: () => Element;
  getFooter: () => Element;
  getBody: () => Element;
};

export type TMap = {
  addDefaultLayer: ([...any]) => TLayer;
  addLayer: (layer: TLayer) => TLayer;
  addDefaultControls: () => TMap;
  enable: () => TMap;
};

export default class SeznamMapHelper {
  public createCoords(
    gpsLat: number,
    gpsLng: number
  ): { x: number; y: number } {
    return window.SMap.Coords.fromWGS84(gpsLng, gpsLat); // Seznam map has swapped coords, really.
  }

  public createMap(
    el: Element,
    gpsLat: number,
    gpsLng: number,
    zoom: number = 10
  ): TMap {
    const center = this.createCoords(gpsLat, gpsLng);
    return new window.SMap(el, center, zoom);
  }

  public createDefaultMap(
    el: Element,
    gpsLat: number = 50.12655,
    gpsLng: number = 14.4179,
    zoom: number = 13
  ): TMap {
    const map = this.createMap(el, gpsLat, gpsLng, zoom);
    map.addDefaultLayer(window.SMap.DEF_BASE).enable();
    map.addDefaultControls();
    return map;
  }

  public createMarkerLayer(): TLayer {
    return new window.SMap.Layer.Marker();
  }

  public createClusterer(map: TMap): TClusterer {
    return new window.SMap.Marker.Clusterer(map);
  }

  public createMarker(
    gpsLat: number,
    gpsLng: number,
    id: string | number | undefined = undefined,
    title: string = "",
    url: string | null = null
  ): TMarker {
    const options: any = { title: title };
    if (url) {
      options.url = url;
    }
    return new window.SMap.Marker(
      this.createCoords(gpsLat, gpsLng),
      id,
      options
    );
  }

  public createCard(
    marker: TMarker,
    header: string,
    body: string,
    footer: string = "",
    x: number = 200,
    y: number = 200
  ): TCard {
    const card: TCard = new window.SMap.Card();
    card.setSize(x, y);
    card.getHeader().innerHTML = header;
    card.getBody().innerHTML = body;
    card.getFooter().innerHTML = footer;
    marker.decorate(window.SMap.Marker.Feature.Card, card);

    return card;
  }
}
