import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDisplayComponent } from './auth-display.component';

describe('AuthDisplayComponent', () => {
  let component: AuthDisplayComponent;
  let fixture: ComponentFixture<AuthDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
