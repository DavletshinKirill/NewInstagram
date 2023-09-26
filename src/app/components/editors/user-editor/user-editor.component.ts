import { ROLE } from './../../../model/auth/role';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { userAuth } from 'src/app/model/userAuth';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent {
  editingStudent!: User;

  constructor(public dialogRef: MatDialogRef<UserEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  ngOnInit() {
    this.editingStudent = new User();
    if (this.data)
    {
      this.editingStudent.id = this.data.id;
      this.editingStudent.username = this.data.username;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
