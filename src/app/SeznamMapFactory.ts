import SeznamMapHelper from "./SeznamMapHelper";
import $ from 'jquery';

// Declare global Loader and SMap
declare global {
    interface Window { Loader: any; SMap: any}
}

export default class SeznamMapFactory {
    // Helper for simple creating seznam mapy objects
    private _mapHelper?: SeznamMapHelper;

    public init(afterInit?: ()=>void) {
        afterInit = afterInit || (() => void 0);
        if (!window.Loader) {
            $.getScript('https://api.mapy.cz/loader.js', ()=> {
                window.Loader.async = true;
                window.Loader.load(null, null, afterInit?.bind(this));
            });
        } else {
            afterInit();
        }

    }

    public get helper(): SeznamMapHelper {
        if (!window.Loader) {
            throw Error('Seznam maps: Loader is not initialised. Please init() first.');
        }
        if (!this._mapHelper) {
            this._mapHelper = new SeznamMapHelper;
        }
        return this._mapHelper;
    }
}