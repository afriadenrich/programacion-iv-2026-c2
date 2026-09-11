import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    "(mouseenter)": "onMouseEnter()",
    "(mouseleave)": "onMouseLeave()"
  }
})
export class Highlight {
  private el: ElementRef<HTMLElement> = inject(ElementRef); // Referencia al elemento que tiene la directiva
  color = input('');

  onMouseEnter(){
    this.resaltar(this.color() || "#f00");
  }

  onMouseLeave(){
    this.resaltar("");
  }

  resaltar(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
