import { StompService } from 'src/app/services/stomp.service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SessionStorageService } from 'angular-web-storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ MatDialogModule } from '@angular/material/dialog';
import{ MatFormFieldModule} from '@angular/material/form-field';
import{ MatInputModule } from '@angular/material/input';
import {  MatSortModule } from "@angular/material/sort";
import {  MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserEditorComponent } from './components/editors/user-editor/user-editor.component';
import { UserComponent } from './components/user/user.component';
import { PostAddComponent } from './components/editors/post-add/post-add.component';
import { MatCardModule } from '@angular/material/card';
import { CommentsComponent } from './components/editors/comments/comments.component';
import { AddCommentComponent } from './components/editors/add-comment/add-comment.component';
import { RoutingComponent } from './components/routing/routing.component';
import{ MatIconModule } from '@angular/material/icon';
import { ChangeUserPhotoComponent } from './components/editors/change-user-photo/change-user-photo.component';
import { MatToolbarModule } from '@angular/material/toolbar';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    UserEditorComponent,
    UserComponent,
    PostAddComponent,
    CommentsComponent,
    AddCommentComponent,
    RoutingComponent,
    ChangeUserPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule

  ],
  providers: [SessionStorageService, StompService],
  entryComponents: [
    UserEditorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
