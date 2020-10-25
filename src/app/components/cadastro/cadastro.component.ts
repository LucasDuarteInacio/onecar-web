
import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
funcionarios= new Array

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
   this.carregarFuncionarios()
  }

carregarFuncionarios(){

}
  AbrirModal(idModal){
    this.modalService.open(idModal,);
  }
}
