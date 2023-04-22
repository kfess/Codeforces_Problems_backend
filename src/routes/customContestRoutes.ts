import "module-alias/register";
import { Router } from "express";
import { PrismaSingleton } from "../repositories/prisma/prismaSingleton";
import { PrismaCustomContestRepository } from "../repositories/prisma/PrismaCustomContestRepository";
import { GetCustomContestInteractor } from "@/usecases/GetCustomContestInteractor";
import { CustomContestController } from "@/controllers/customContestController";

const router = Router();

const prisma = PrismaSingleton.getInstance();
const customContestRepository = new PrismaCustomContestRepository(prisma);
const getCustomContestUsecase = new GetCustomContestInteractor(
  customContestRepository
);
const customContestController = new CustomContestController(
  getCustomContestUsecase
);

router.get("/:contestId", (req, res) =>
  customContestController.getByContestId(req, res)
);

router.get("/", (req, res) => customContestController.getAll(req, res));

router.get("/owner/:ownerId", (req, res) => {
  customContestController.getByOwnerId(req, res);
});

router.post("/", (req, res) => customContestController.create(req, res));

router.put("/", (req, res) => customContestController.update(req, res));

router.post("/add-user", (req, res) =>
  customContestController.addUserToContest(req, res)
);

router.post("/remove-user", (req, res) => {
  customContestController.removeUserFromContest(req, res);
});

export default router;
