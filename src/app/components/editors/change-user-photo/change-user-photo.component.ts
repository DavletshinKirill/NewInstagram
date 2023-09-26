import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RenderUser } from 'src/app/model/render_user';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-change-user-photo',
  templateUrl: './change-user-photo.component.html',
  styleUrls: ['./change-user-photo.component.css']
})
export class ChangeUserPhotoComponent {
  selectedFile: File;
  user: RenderUser;

  constructor(public dialogRef: MatDialogRef<ChangeUserPhotoComponent>, private postService: PostService) {
    this.user = new RenderUser();
  }

  onFileSelected(event: any) {
    console.log("File selected");
    this.selectedFile = event.target.files[0];
    console.log("Selected file "+ this.selectedFile.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClick() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log("Selected file "+ this.selectedFile.name);
    this.user.mainPhoto = "1.jpg";
    console.log(this.user.mainPhoto);
    this.postService.uploadPhoto(formData).subscribe(response => {
      console.log(response);
  });
    console.log("User updated");
  }
}

