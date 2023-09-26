import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comments } from 'src/app/model/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  comment!: Comments;
  constructor(public dialogRef: MatDialogRef<AddCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

     ngOnInit() {
      this.comment = new Comments();
      if (this.data)
      {
        this.comment.comment = this.data.comment;
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
