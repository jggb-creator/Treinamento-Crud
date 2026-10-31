import prisma from "../database";

export class PlantaRepository {
  async create(data: any) {
    return await prisma.planta.create({
      data,
    });
  }

  async findAll(query?: any) {
    return await prisma.planta.findMany();
  }

  async findById(id: number) {
    return await prisma.planta.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    return await prisma.planta.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.planta.delete({
      where: { id },
    });
  }

  async valorTotalEstoque() {
    const plantas = await prisma.planta.findMany();
    return plantas.reduce((acc, planta) => {
      return acc + planta.preco * planta.estoque;
    }, 0);
  }

  async venda(id: number, quantidade: number) {
    const planta = await prisma.planta.findUnique({
      where: { id },
    });

    if (!planta) {
      throw new Error("Planta não encontrada");
    }

    if (planta.estoque < quantidade) {
      throw new Error("Estoque insuficiente");
    }

    return await prisma.planta.update({
      where: { id },
      data: {
        estoque: planta.estoque - quantidade,
      },
    });
  }
}