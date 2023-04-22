import { Request, Response } from "express";
import { GetCustomContestUsecase } from "@/usecases/GetCustomContestUsecase";

export class CustomContestController {
  constructor(private getCustomContestUsecase: GetCustomContestUsecase) {}

  async getByContestId(req: Request, res: Response): Promise<void> {
    try {
      const contestId = req.params.contestId;
      const contest = await this.getCustomContestUsecase.getByContestId(
        contestId
      );
      res.status(200).json(contest);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const customContests = await this.getCustomContestUsecase.getAll();
      res.json(customContests);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async getByOwnerId(req: Request, res: Response): Promise<void> {
    try {
      const ownerId = req.query.ownerId as string;
      const customContests = await this.getCustomContestUsecase.getByOwnerId(
        ownerId
      );
      res.json(customContests);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const customContest = req.body;
      const createdContest = await this.getCustomContestUsecase.create(
        customContest
      );
      res.status(201).json(createdContest);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const customContest = req.body;
      const updatedContest = await this.getCustomContestUsecase.update(
        customContest
      );
      res.json(updatedContest);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async addUserToContest(req: Request, res: Response): Promise<void> {
    try {
      const { participant, contestId } = req.body;
      await this.getCustomContestUsecase.addUserToContest(
        participant,
        contestId
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async removeUserFromContest(req: Request, res: Response): Promise<void> {
    try {
      const { participant, contestId } = req.body;
      await this.getCustomContestUsecase.removeUserFromContest(
        participant,
        contestId
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }
}
