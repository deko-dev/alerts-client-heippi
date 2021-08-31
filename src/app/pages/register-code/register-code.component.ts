import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { RegisterCodeService } from './register-code.service';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.scss']
})
export class RegisterCodeComponent implements OnInit {

  name: string= '';
  code: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private registerCodeService: RegisterCodeService
  ) {
    this.code = this.activatedRoute.snapshot.params.code; 
    this.registerCodeService.alertOut.subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  ngOnInit(): void {
  }


  register(){
    this.registerCodeService.registerCode(
      {
        name: this.name,
        code: this.code
      }
    );
  }

}
