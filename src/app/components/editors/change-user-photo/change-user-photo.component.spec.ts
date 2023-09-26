import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserPhotoComponent } from './change-user-photo.component';

describe('ChangeUserPhotoComponent', () => {
  let component: ChangeUserPhotoComponent;
  let fixture: ComponentFixture<ChangeUserPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUserPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeUserPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
