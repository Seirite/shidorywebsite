import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.getPosition().then(location =>
        {
        }).catch(error =>
        {
            var message = "Please allow the location.";
            var action = "";
            this.openSnackBarAddress(message, action);
        })
    }
    
    getPosition(): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
            navigator.geolocation.getCurrentPosition(resp => 
            {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => 
            {
                reject(err);
            });
        });

    }
    
    openSnackBarAddress(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }
}
