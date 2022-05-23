import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoComponent } from './dialogo.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DialogoComponent', () => {
  let component: DialogoComponent;
  let fixture: ComponentFixture<DialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
