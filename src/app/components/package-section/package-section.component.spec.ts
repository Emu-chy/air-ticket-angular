import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSectionComponent } from './package-section.component';

describe('PackageSectionComponent', () => {
  let component: PackageSectionComponent;
  let fixture: ComponentFixture<PackageSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageSectionComponent]
    });
    fixture = TestBed.createComponent(PackageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
