class Tarefa {
  id: number;
  nome: string;
  concluida: boolean;

  constructor(id: number, nome: string, concluida: boolean) {
    this.id = id;
    this.nome = nome;
    this.concluida = concluida;
  }
}

export default Tarefa;
