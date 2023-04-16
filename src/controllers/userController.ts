import { Request, Response } from "express";
import { UserUseCase } from "@/usecases/UserUsecase";

export interface UserPayload {
  githubId: number;
  githubUsername: string;
}

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  // between backend and frontend and github api server (exchange code for access token)
  async exchangeCodeForAccessToken(req: Request, res: Response): Promise<void> {
    const { code } = req.body;
    try {
      const accessToken = await this.userUseCase.exchangeCodeForAccessToken(
        code
      );
      const githubUser = await this.userUseCase.getGithubUser(accessToken);
      await this.userUseCase.findOrCreateByGithubId(
        githubUser.id,
        githubUser.login
      );
      const jwtToken = this.userUseCase.createJWT(
        githubUser.id,
        githubUser.login
      );
      res.status(200).json({ authToken: jwtToken });
    } catch (error) {
      res.status(400).json({ message: "failed" });
    }
  }

  async findOrCreateByGithubId(req: Request, res: Response): Promise<void> {
    const { githubId, githubUsername, codeforcesUsername } = req.body;
    try {
      const user = await this.userUseCase.findOrCreateByGithubId(
        githubId,
        githubUsername,
        codeforcesUsername
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: "failed" });
    }
  }

  // to update codeforces username, authentification is required
  async updateCodeforcesUsername(req: Request, res: Response): Promise<void> {
    const { codeforcesUsername } = req.body;
    const { githubId } = req.user as UserPayload;

    try {
      const user = await this.userUseCase.updateCodeforcesUsername(
        githubId,
        codeforcesUsername
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: "failed" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { githubId } = req.body;
    try {
      await this.userUseCase.delete(githubId);
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: "failed" });
    }
  }
}
