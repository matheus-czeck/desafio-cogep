import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPessoasComponent } from './lista-pessoas.component';

describe('ListaPessoasComponent', () => {
  let component: ListaPessoasComponent;
  let fixture: ComponentFixture<ListaPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPessoasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
