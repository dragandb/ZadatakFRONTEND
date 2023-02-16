import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Kupac } from 'src/app/_interfaces/kupac.model';

@Directive({
  selector: '[appAppend]'
})
export class AppendDirective implements OnChanges {

  @Input('appAppend') kupacParam: Kupac;

  constructor(private element: ElementRef, private renderer: Renderer2) { }
  
  ngOnChanges(changes: SimpleChanges) {

    if(changes.kupacParam.currentValue){
      const accNum = changes.kupacParam.currentValue.accounts.length;
      const span = this.renderer.createElement('span');
      const text = this.renderer.createText(` (${accNum}) accounts`);
      this.renderer.appendChild(span, text);
      this.renderer.appendChild(this.element.nativeElement, span);
    }
  }
}