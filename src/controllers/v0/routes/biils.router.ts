import { Router, Request, Response } from "express";
import Client, { IClient } from "../models/Client";
import { NextFunction } from "connect";
import * as jwt from "jsonwebtoken";
import Address from "../models/Address";
import { AddressService } from "../services/AddressService";
import { ClientService } from "../services/ClientService";
import { InstallationService } from "../services/InstallationsService";
import { IInstallation } from "../models/Installation";
import { BillsService } from "../services/BillsService";
import { IBill } from "../models/Bill";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const [bills, clients, installations] = await Promise.all([
    BillsService.getBills(),
    ClientService.findClients(),
    InstallationService.findInstallations(),
  ]);

  bills.map((bill) => {
    bill.client = clients.find((client) => client.cpf == bill.client) as any;

    bill.installation = installations.find(
      (installation) => installation.code === bill.installation
    ) as any;
  });

  return res.status(200).send(bills);
});

router.get("/:code", async (req: Request, res: Response) => {
  const { code } = req.params;
  const [bill, clients, installations] = await Promise.all([
    BillsService.getBillByCode(code),
    ClientService.findClients(),
    InstallationService.findInstallations(),
  ]);

  bill.client = clients.find((client) => client.cpf == bill.client) as any;

  bill.installation = installations.find(
    (installation) => installation.code === bill.installation
  ) as any;

  return res.status(200).send(bill);
});

router.get("/client/:cpf", async (req: Request, res: Response) => {
  const { cpf } = req.params;
  const [bills, client, installations] = await Promise.all([
    BillsService.getBills({ client: cpf }),
    ClientService.findClient(cpf),
    InstallationService.findInstallations(),
  ]);

  bills.map((bill) => {
    bill.client = client;
    bill.installation = installations.find(
      (installation) => installation.code === bill.installation
    ) as any;
  });

  return res.status(200).send(bills);
});

router.post("/", async (req: Request, res: Response) => {
  const bill: IBill = req.body;

  if (!BillsService.isBillsValid(bill)) {
    return res.status(400).send({ error: "Malformed request" });
  }

  const client = await ClientService.findClient(bill.client);

  if (!client) {
    return res.status(404).send({ error: "Client not found" });
  }

  await BillsService.createBills(bill);

  return res.status(201).end();
});

export const BillsRouter: Router = router;
