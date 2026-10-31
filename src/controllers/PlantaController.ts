import { Request, Response } from "express";
import { PlantaRepository } from "../repositories/PlantaRepository";

const plantaRepository = new PlantaRepository();

export class PlantaController {
  async create(req: Request, res: Response) {
    try {
      const planta = await plantaRepository.create(req.body);
      return res.status(201).json(planta);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao criar planta", error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const plantas = await plantaRepository.findAll(req.query);
      return res.status(200).json(plantas);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar plantas", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const planta = await plantaRepository.findById(Number(id));

      if (!planta) {
        return res.status(404).json({ message: "Planta não encontrada" });
      }

      return res.status(200).json(planta);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar planta", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const planta = await plantaRepository.update(Number(id), req.body);
      return res.status(200).json(planta);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao atualizar planta", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await plantaRepository.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: "Erro ao apagar planta", error });
    }
  }

  async valorTotalEstoque(req: Request, res: Response) {
    try {
      const total = await plantaRepository.valorTotalEstoque();
      return res.status(200).json({ valorTotal: total });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao calcular valor total", error });
    }
  }

  async venda(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;
      const planta = await plantaRepository.venda(Number(id), Number(quantidade));
      return res.status(200).json(planta);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Erro ao processar venda" });
    }
  }
}