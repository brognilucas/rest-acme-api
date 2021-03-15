import { Router, Request, Response } from "express";
import Client, { IClient } from "../models/Client";
import { NextFunction } from "connect";
import * as jwt from "jsonwebtoken";
import Address from "../models/Address";
import { AddressService } from "../services/AddressService";
import { ClientService } from "../services/ClientService";
import { InstallationService } from "../services/InstallationsService";
import { IInstallation } from "../models/Installation";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const clients = await ClientService.findClients();

  return res.status(200).send(clients);
});

router.get("/:cpf", async (req: Request, res: Response) => {
  const { cpf } = req.params;

  const clients = await ClientService.findClient(cpf);

  return res.status(200).send(clients);
});

router.get("/:cpf/installations", async (req: Request, res: Response) => {
  const { cpf } = req.params;

  const [installations, client] = await Promise.all([
    InstallationService.findInstallations({
      client: cpf,
    }),
    ClientService.findClient(cpf),
  ]);

  installations.forEach((installation: any) => {
    installation.client = client;
  });

  return res.status(200).send(installations);
});

router.post("/", async (req: Request, res: Response) => {
  const client: IClient = req.body;

  if (!client.address || !AddressService.isAddressValid(client.address)) {
    return res.status(400).send({ error: "Malformed Address" });
  }

  const address = await Address.create(client.address);

  if (address) {
    client.address = address._id;
  }

  if (!ClientService.isClientValid(client)) {
    return res.status(400).send({ error: "Malformed Client" });
  }

  await ClientService.createClient(client);

  return res.status(201).end();
});

export const ClientRouter: Router = router;
