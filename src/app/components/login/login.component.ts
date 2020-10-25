import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  login = new Usuario;

  constructor(private service:UsuarioService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logarSistema(){
    console.log(this.login)
    this.service.login(this.login).subscribe(res=>{
      localStorage.setItem('usuario', JSON.stringify(res));
      this.router.navigate(['/']);
    },(error)=>{
      this.toastr.error("usuario ou senha não encontrados!")
    })
  }

}
