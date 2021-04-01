/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as firebase from 'firebase/app';
import {Upload} from '../pojos/Upload';
//import {UploadTask} from '@firebase/storage-types';
import * as dash from "lodash";

@Injectable()
export class SiUtil {

    citys: any[];
    constructor(
        public toast: ToastrService,
        public router: Router,
        public translate: TranslateService,
        public httpService: HttpClient
    ) {



    }




    pagePush(pageName: string) {
        this.router.navigate(['/', pageName]).then(nav => {
            console.log("Navigate On " + pageName);
        });


    }
    pageDispose(pageName: any) {
        this.router.dispose();


    }

    toastSuccess(title: string, message: string) {
        this.toast.success(message, title, {
            closeButton: true,
            progressBar: true,
            tapToDismiss: true,
        })
    }
    toastInfo(title: string, message: string) {
        this.toast.info(message, title, {
            closeButton: true,
            progressBar: true,
            tapToDismiss: true,
        })
    }
    toastError(title: string, message: string) {
        this.toast.error(message, title, {
            closeButton: true,
            progressBar: true,
            tapToDismiss: true,
        })
    }
    toastWarning(title: string, message: string) {
        this.toast.warning(message, title, {
            closeButton: true,
            progressBar: true,
            tapToDismiss: true,
        })
    }

    async getConditionalData(filterValue) {
        return new Promise((resolve, reject) => {
            this.httpService.get('../../assets/json/city.json').subscribe(
                (data: any[]) => {
                    if (filterValue.length > 2) {
                        const res = filterValue.toLowerCase();
                        resolve(data.filter(state => state.name.toLowerCase().indexOf(res) === 0));
                    }

                },
                (err: HttpErrorResponse) => {
                    console.log(err.message);
                    reject(err);
                }
            );
        }).then((data: any[]) => {
            let new_list = data.map(function (obj) {

                return obj.name;

            });
            return new_list;
        })
    }
    async getConuntrys(filterValue) {
        return new Promise((resolve, reject) => {
            this.httpService.get('../../assets/json/country.json').subscribe(
                (data: any[]) => {
                    if (filterValue.length > 2) {
                        console.log(filterValue);
                        const res = filterValue.toLowerCase();
                        resolve(data.filter(state => state.name.toLowerCase().indexOf(res) === 0));
                    }

                },
                (err: HttpErrorResponse) => {
                    console.log(err.message);
                    reject(err);
                }
            );
        }).then((data: any[]) => {
            let new_list = data.map(function (obj) {

                return {
                    name: obj.name,
                    id: obj.id,
                    phonecode: obj.phonecode

                }

            });
            return new_list;
        })
    }
    
    
    uploadSingle(selectedFiles: FileList,uploadFolderUrl:string) {
    let file = selectedFiles.item(0)
    this.pushUpload(new Upload(file),uploadFolderUrl);
  }

  uploadMulti(selectedFiles: FileList,uploadFolderUrl:string) {
    let files = selectedFiles
    let filesIndex = dash.range(files.length)
    dash.each(filesIndex, (idx) => {
        this.pushUpload(new Upload(files[idx]), uploadFolderUrl)}
    )
  }


    pushUpload(upload: Upload,uploadUrl:string) {
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(`${uploadUrl}/${upload.file.name}`).put(upload.file);

//        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//            (snapshot: UploadTask) => {
//                // upload in progress
//               
//                upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
//                console.log(upload.progress);
//            },
//            (error) => {
//                // upload failed
//                console.log(error)
//            },
//            () => {
//                // upload success
//                upload.url = uploadTask.snapshot.downloadURL
//                upload.name = upload.file.name
//            }
//        );
    }

}