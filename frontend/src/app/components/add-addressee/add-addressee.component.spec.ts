import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddresseeComponent } from './add-addressee.component';

describe('AddAddresseeComponent', () => {
  let component: AddAddresseeComponent;
  let fixture: ComponentFixture<AddAddresseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAddresseeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAddresseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
