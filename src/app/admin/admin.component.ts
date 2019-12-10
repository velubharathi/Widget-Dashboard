import { Component, OnInit } from '@angular/core';
import { AdminService } from './serivce/admin.service';
import { AdminModel } from './model/admin.model';
import { HttpErrorResponse } from '@angular/common/http';

import { User, Candidate } from './model/User.interface';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminModel: AdminModel;
  total: number;

  constructor(private readonly adminService: AdminService, private readonly route: Router, private readonly auth: AuthService) {
    this.adminModel = new AdminModel();
   }

  ngOnInit() {

    this.adminService.getCandidatesList().subscribe((data: Candidate[]) => {
      let newList= new Array();
      if (data) {
        data['data'].map((data: Candidate, i: number) => {
          this.adminModel.candidateList[i] = data;
          this.adminModel.uniqueNames.add(data.domain);
        });

        Array.from(this.adminModel.uniqueNames).forEach((name, index)=>{
          this.adminModel.newList.push(this.adminModel.candidateList.filter((data, i) =>{
            return data.domain == name;
          }))
        })
        this.total = this.adminModel.candidateList.length;
        console.log(this.adminModel.newList);
        // this.adminModel.groupedCandidateList = this.groupBy(this.adminModel.candidateList, 'domain');
      }
    }, (error: HttpErrorResponse)=>{
         
    })
  }

  expandMenu() {
      this.adminModel.menuExpanded = this.adminModel.menuExpanded == true ? false : true;
  }

  logOutUser() {
    this.auth.setLoggedIn(false);
    this.route.navigate(['login']);
  }

}
