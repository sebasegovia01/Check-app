import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoTransferComponent } from './do-transfer.component';

describe('DoTransferComponent', () => {
  let component: DoTransferComponent;
  let fixture: ComponentFixture<DoTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
