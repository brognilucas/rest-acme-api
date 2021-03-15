import { Router, Request, Response } from "express";
import { BillsRouter } from "./routes/biils.router";
import { ClientRouter } from "./routes/clients.router";
import { InstallationRouter } from "./routes/installation.router";

const router: Router = Router();

router.use("/clients", ClientRouter);
router.use("/installations", InstallationRouter);
router.use("/bills", BillsRouter);

router.get("/", async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
