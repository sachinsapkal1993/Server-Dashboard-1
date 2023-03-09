import { Injectable } from "@angular/core";
import { Server } from "./Server";
import { NatSpace } from "./NatSpace";

@Injectable({
  providedIn: "root",
})
export class DataService {
  serverList: Server[] = [
    {
      id: 1,
      name: "Box",
      description: "xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: 12,
      server_nat_ip: "122.12.19.21",
      status: "online",
    },
    {
      id: 2,
      name: "DoS",
      description: "Server Box xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: 1,
      server_nat_ip: "122.12.19.21",
      status: "online",
    },
    {
      id: 3,
      name: "Server Box",
      description: " 10.013.122-xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: 12,
      server_nat_ip: "122.12.19.21",
      status: "erorr",
    },
    {
      id: 4,
      name: "Nat-vat",
      description: "xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: 15,
      server_nat_ip: "122.12.19.21",
      status: "online",
    },
    {
      id: 5,
      name: "ZTh-vtc-1275844",
      description: "xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: 14,
      server_nat_ip: "122.12.19.21",
      status: "error",
    },
    {
      id: 6,
      name: "Box",
      description: "xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: 13,
      server_nat_ip: "122.12.19.21",
      status: "online",
    },
  ];

  natSpace: NatSpace[] = [
    {
      id: 1,
      name: "Box",
    },
    {
      id: 12,
      name: "DoS",
    },
    {
      id: 13,
      name: "Server Box",
    },
    {
      id: 14,
      name: "Nat-vat",
    },
    {
      id: 15,
      name: "ZTh-vtc-1275844",
    },
    {
      id: 17,
      name: "GBD",
    }
  ];

  constructor() {}

  getAllServers(): Server[] {
    return this.serverList;
  }

  addNewServer(server: Server) {
    let arr = this.serverList.map((server) => server.id);
    let max = Math.max(...arr);
    server.id = max + 1;
    this.serverList.push(server);
    return server.id;
  }
  editServer(server: Server) {
    let result = this.serverList.find((s) => s.id === server.id);
    if (result?.id) {
      result.name = server.name;
      result.nat_space_id = server.nat_space_id;
      result.server_ip = server.server_ip;
      result.server_nat_ip = server.server_nat_ip;
      result.description = server.description;
      result.status = server.status;
    }
    return this.serverList;
  }

  removeServer(serversToRemove: Server[]) {
    const serverIdsToRemove = serversToRemove.map((s) => s.id);

    const toRemove = new Set(serverIdsToRemove);

    this.serverList = this.serverList.filter((sl) => !toRemove.has(sl.id));
  }
}
