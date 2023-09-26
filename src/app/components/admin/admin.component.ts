import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ROLE } from 'src/app/model/auth/role';
import { User } from 'src/app/model/user';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { UserEditorComponent } from '../editors/user-editor/user-editor.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username', 'password', 'role', "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private baseService: BaseServiceService, public dialog: MatDialog) {
    this.dataSource =  new MatTableDataSource<User>();;
    // Assign the data to the data source for the table to render
    // There is a problem
}

  ngOnInit(): void {
    console.log("Admin Component");
    this.baseService.getAllUsers().subscribe(data => this.setDataSoursePaginator(data));
  }

  setDataSoursePaginator(data: User[]): void {
    this.dataSource = new MatTableDataSource<User>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data.at(0)?.roles);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewUser() {
    const dialogAddingNewStudent = this.dialog.open(UserEditorComponent, {
      width: '400px',
      data: null
    });
    dialogAddingNewStudent.afterClosed().subscribe((result: User) => {
      if(result != null) {
        console.log("adding new user: " + result.username);
        this.baseService.addNewUser(result).subscribe(k=>
          this.baseService.getAllUsers().subscribe(data => this.dataSource.data = data));
      }
    });
}
  editUser(student: User) {
    const dialogEditStudent = this.dialog.open(UserEditorComponent, {
    width: '400px',
    data: student
  });

  dialogEditStudent.afterClosed().subscribe((result: User) => {
    if(result != null) {
      console.log("edit new user: " + result.id);
      this.baseService.editUser(result).subscribe(k=>
        this.baseService.getAllUsers().subscribe(data => this.dataSource.data = data));
        console.log("edit new user : " + result.username);
        console.log(result);
    }
  });
}

  deleteUser(id: number) {
    this.baseService.deleteUser(id).subscribe(k=>
      this.baseService.getAllUsers().subscribe(data => this.dataSource.data = data));
  }
}
