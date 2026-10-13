import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MemberModel } from '../../models/MemberModel';
import { MemberService } from '../../services/member';
import { RouterLink } from '@angular/router';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './member.html',
  styleUrl: './member.css'
})
export class Member implements OnInit {

  dataSource: MemberModel[] = [];

  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'type',
    'createDate',
    'actions'
  ];

  constructor(private memberService: MemberService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.memberService.getALLMembers().subscribe((response: MemberModel[]) => {
      this.dataSource = response;
    });
  }

  editMember(member: MemberModel): void {
    console.log('Edit', member);
  }

deleteMember(id: String): void {
  //ouvrir la boite de dialogue de confirmation
  //attendre le click 
  let dialogRef = this.dialog.open(ConfirmDialog);
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.memberService.deleteMember(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  });
}
}