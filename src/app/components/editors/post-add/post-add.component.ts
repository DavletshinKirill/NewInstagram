import { Post } from './../../../model/post';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {
  post!: Post;
  selectedFile: File;


  constructor(public dialogRef: MatDialogRef<PostAddComponent>,
    private postService: PostService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  ngOnInit() {
    this.post = new Post();
    if (this.data)
    {
      this.post.title = this.data.title;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    console.log("File selected");
    this.selectedFile = event.target.files[0];
    console.log("Selected file "+ this.selectedFile.name);
  }

  addClick() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.post.photo = this.selectedFile.name;
    this.postService.uploadPhoto(formData).subscribe(response => {
      console.log(response);
  });
    console.log("Post updated");
  }
}
