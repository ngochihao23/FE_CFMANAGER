import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoiboPage } from './noibo.page';

describe('NoiboPage', () => {
  let component: NoiboPage;
  let fixture: ComponentFixture<NoiboPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoiboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
