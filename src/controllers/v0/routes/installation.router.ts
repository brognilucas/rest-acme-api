import { Router, Request, Response } from "express";
import { InstallationService } from "../services/InstallationsService";
import { IInstallation } from "../models/Installation";
import { ClientService } from "../services/ClientService";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const [installations, clients] = await Promise.all([
    InstallationService.findInstallations(),
    ClientService.findClients(),
  ]);

  installations.forEach((installation) => {
    const client = clients.find((client) => client.cpf === installation.client);

    installation.client = client;
  });

  return res.status(200).send(installations);
});

router.post("/", async (req: Request, res: Response) => {
  const installation: IInstallation = req.body;

  const client = await ClientService.findClient(installation.client);
  if (!client) {
    return res.status(404).send({ error: "Client not found" });
  }

  if (!InstallationService.isInstallationsValid(installation)) {
    return res.status(400).send({ error: "Malformed Client" });
  }

  await InstallationService.create(installation);

  return res.status(201).end();
});

export const InstallationRouter: Router = router;
