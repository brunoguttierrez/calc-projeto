import { Component, OnInit, HostListenerDecorator, HostListener } from '@angular/core';
import { concatMapTo } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostListener('document:keyup', ['$event'])

  onKeyUp(event: KeyboardEvent) {
    const typedKey = event.key;
    console.log(typedKey)
    console.log(this.regex.test(typedKey))
    this.regex.test(typedKey) ? this.write(typedKey) : console.log('teste');
  }

  title = 'calculadora';

  previousOperation: string = ''
  currentValue: string = '0'
  result: number = 0
  regexSinais = new RegExp(/[\+*/\-.]$/);
  regex: RegExp = /^[\d+*/\-.]|Enter|Backspace$/;

  ngOnInit() {
  }

  write(value: string) :void {

    if(value === 'Enter') {
      this.valueTotal()
      return;
    } else if (value === 'Backspace') {
      this.erase()
      return;
    }

    value === 'Enter' ? this.valueTotal() : '';
    value === 'Backspace' ? this.erase() : '';

    if(this.currentValue === '0') {
      this.currentValue = value //!== undefined ? value : value
    } else {
        this.currentValue += value
        this.previousOperation = this.currentValue
      }

  }

  operation(op: string) {
    if(this.regexSinais.test(this.currentValue)) {
      return;
    } else {
      if(op !== '') {
        this.previousOperation = this.currentValue + op
      }
      this.currentValue += op
    }
  }

  clear(): void {
    this.currentValue = '0'
    this.previousOperation = ''
  }

  erase() {


    if(this.currentValue === '' || this.currentValue === '0') {
      this.currentValue = '0'
    }
    if(this.currentValue != '0' ) {
      console.log(typeof(this.currentValue))
      //this.previousOperation = ''
      //console.log(this.currentValue = this.currentValue)
      //console.log('teste')
      this.currentValue = this.currentValue.toString().slice(0, -1)
      this.previousOperation = this.previousOperation.toString().slice(0, -1)

    }

  }

  valueTotal() {
    this.currentValue = isNaN(eval(this.currentValue)) ? 'Resultado indefinido' : eval(this.currentValue)
    this.previousOperation = eval(this.currentValue)
  }
}
