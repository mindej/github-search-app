import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHasStarComponent } from './user-has-star.component';

describe('UserHasStarComponent', () => {
  let component: UserHasStarComponent;
  let fixture: ComponentFixture<UserHasStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHasStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHasStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
