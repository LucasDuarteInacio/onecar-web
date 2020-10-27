import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment';

import { Cliente } from 'src/app/model/Cliente';
import { Pagamento } from 'src/app/model/Pagamento';
import { Recibo } from 'src/app/model/recibo';
import { Usuario } from 'src/app/model/usuario';
import { Vaga } from 'src/app/model/Vaga';
import { CaixaDTO } from 'src/app/model/caixaDTO';
import { VagaDTO } from 'src/app/model/VagaDTO';
import { Veiculo } from 'src/app/model/Veiculo';
import { ClienteService } from 'src/app/service/cliente.service';
import { ReciboService } from 'src/app/service/recibo.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VagaService } from 'src/app/service/vaga.service';
import { VeiculoService } from 'src/app/service/veiculo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  novoUsuario = new Usuario;
  novoCliente = new Cliente;
  novoVeiculo = new Veiculo;
  pagamento = new Pagamento;
  usuario = new Usuario;
  novaVaga = new Vaga;
  recibo = new Recibo;
  usuarios: Array<Usuario>;
  clientes: Array<Cliente>;
  vagas: Array<VagaDTO>;
  veiculos: Array<Veiculo>;
  recibos: Array<Recibo>;
  caixa: Array<Pagamento> = [];
  detalhesCaixa = new CaixaDTO;
  editar = false;
  statusCaixa = false
  tabelaMoto = false
  tabelaCarro = false
  idCliente: number;
  idVeiculo: number;
  idVaga: number;
  avatar: File

  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private vagaService: VagaService,
    private reciboService: ReciboService
  ) { }

  ngOnInit(): void {
    this.carregarDados();
    this.controleCaixa();
    this.carregarUsuarioLogado();
  }


  async carregarDados() {
    this.usuarios = await this.usuarioService.buscarTodos().toPromise();
    this.clientes = await this.clienteService.buscarTodos().toPromise();
    this.vagas = await this.vagaService.buscarTodos().toPromise();
    this.recibos = await this.reciboService.buscarAtivos().toPromise();
    this.buscarReciboPlaca();
  }

  async carregarUsuarioLogado() {
    const usuario = localStorage.getItem('usuario')
    const usuarioObj:Usuario = JSON.parse(usuario);
    this.usuario = await this.usuarioService.buscarUsuarioPorId(usuarioObj.id).toPromise();
  }

  controleCaixa() {
    const caixaStatus = localStorage.getItem('statusCaixa');
    const caixaStatusObj = JSON.parse(caixaStatus);
    if (caixaStatusObj) this.statusCaixa = true

    const caixaStringfy = localStorage.getItem('caixa')
    const caixa: Array<Pagamento> = JSON.parse(caixaStringfy)
    if (caixa.length > 0) {
      caixa.forEach(e => {
        this.detalhesCaixa.Valor = this.detalhesCaixa.Valor + e.valor;
        if (e.tipo === "dinheiro") this.detalhesCaixa.dinheiro = this.detalhesCaixa.dinheiro++
        if (e.tipo === "cartaoDebito") this.detalhesCaixa.debito = this.detalhesCaixa.debito++
        if (e.tipo === "cartaoCredito") this.detalhesCaixa.credito = this.detalhesCaixa.credito++
      });
    }
  }



  buscarReciboPlaca() {
    this.recibos.forEach(e => {
      if (e.vaga.statusOcupacao) {
        this.adicionarPlaca(e.vaga.id, e.veiculo.placa)
      }
    });
  }

  adicionarPlaca(idvaga, placa) {
    this.vagas.forEach(e => {
      if (e.id == idvaga) {
        e.placa = placa;
      }
    })
  }

  AbrirModal(idModal) {
    this.modalService.open(idModal, { size: 'xl' });

  }


  async addUsuario() {
    const usuario = await this.usuarioService.addUsuario(this.novoUsuario).toPromise();
    this.usuarios.push(usuario);
  }

  async addCliente() {
    const cliente = await this.clienteService.addCliente(this.novoCliente).toPromise();
    this.clientes.push(cliente);
  }

  async addVaga() {
    this.novaVaga.status = true
    const vaga = await this.vagaService.addVaga(this.novaVaga).toPromise();
    this.vagas.push(vaga);
  }

  async addVeiculo() {
    this.clientes.forEach(cliente => {
      if (cliente.id == this.idCliente) {
        this.novoVeiculo.cliente = cliente;
      }
    });
    await this.veiculoService.addVeiculo(this.novoVeiculo).subscribe(res => {
      const cliente = res
      window.location.reload;
    });
  }

  async bucarVeiculoPorCliente() {
    this.veiculos = await this.veiculoService.buscarVeiculoPorCliente(this.idCliente).toPromise();
  }

  AbrirModalVaga(idVaga, idModal) {
    this.modalService.open(
      idModal, {
      beforeDismiss: () => {
        this.recibo = new Recibo

        return true;
      }
    });
    this.idVaga = idVaga;
    this.detalhesPagamentoRecibo(idVaga)
  }



  async addRecibo() {
    const veiculo = new Veiculo
    const vaga = new Vaga
    veiculo.id = this.idVeiculo;
    vaga.id = this.idVaga;

    this.recibo.veiculo = veiculo;
    this.recibo.vaga = vaga

    await this.reciboService.addRecibo(this.recibo).subscribe(res => {
      this.recibo = new Recibo;
      window.location.reload();
    })
  }

  detalhesPagamentoRecibo(idVaga) {
    this.recibos.forEach(e => {
      if (e.vaga.id == idVaga) {
        this.recibo = e;
        this.calcularValorPagamento();
        this.recibo.pagamento = this.pagamento
      }
    })
  }

  calcularValorPagamento() {

    const horaAtual = new Date();
    const horaInicio = (new Date(horaAtual.toDateString() + ' ' + this.recibo.entrada))

    const inicio = moment(horaInicio);
    const fim = moment(horaAtual)
    const intervalo = fim.diff(inicio, 'minutes');


    if (this.recibo.veiculo.tipo === "moto" || this.recibo.veiculo.tipo === "carro") {
      if (intervalo <= 15) return this.pagamento.valor = 2.50
      if (intervalo > 15 && intervalo <= 30) this.pagamento.valor = 5.0
      if (intervalo > 30 && intervalo <= 60) this.pagamento.valor = 7.5
      if (intervalo > 60 && intervalo <= 120) this.pagamento.valor = 10.0
      if (intervalo > 120 && intervalo <= 180) this.pagamento.valor = 12.5
      if (intervalo > 180 && intervalo <= 240) this.pagamento.valor = 15.0
      if (intervalo > 240) {
        let i = intervalo - 240
        i = i / 15
        this.pagamento.valor = 15 + 5 * i
      }
    }

    if (this.recibo.veiculo.tipo === "moto") {
      this.pagamento.valor = this.pagamento.valor / 2
      return parseFloat(this.pagamento.valor.toFixed(2));
    }
    return this.pagamento.valor.toFixed(2)
  }

  async pagamentoRecibo() {

    const horariosaida = moment().format('HH:mm');
    this.recibo.saida = horariosaida;
    this.recibo.pagamento = this.pagamento;
    await this.reciboService.pagarRecibo(this.recibo).subscribe(res => {
      debugger
      this.recibo = new Recibo;
      this.atualizarCaixa(this.pagamento)
      window.location.reload();
    })
  }


  abrirCaixa() {
    localStorage.setItem('caixa', JSON.stringify(this.caixa));
    localStorage.setItem('statusCaixa', JSON.stringify(true));
    window.location.reload();
  }

  atualizarCaixa(pagamento) {
    const caixaStringfy = localStorage.getItem('caixa')
    const caixa = JSON.parse(caixaStringfy)
    caixa.push(pagamento)
    localStorage.setItem('caixa', JSON.stringify(caixa))
  }
  fecharCaixa() {
    localStorage.setItem('statusCaixa', JSON.stringify(false));
    const caixaStringfy = localStorage.getItem('caixa')
    let caixa = JSON.parse(caixaStringfy)
    caixa = [];
    localStorage.setItem('caixa', JSON.stringify(caixa));
    this.detalhesCaixa = new CaixaDTO;
    window.location.reload()
  }

  adicionarAvatar() {
    this.usuarioService.addAvatar(this.avatar).subscribe(res => {
      console.log("funfou")
    })
  }

  carregarAvatar(event: FileList) {
    this.avatar = event.item(0)
  }

}
