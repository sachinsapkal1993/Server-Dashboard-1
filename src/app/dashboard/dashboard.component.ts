import { Component } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { AddServerComponent } from "../add-server/add-server.component";
import { Server } from ".././Server";
import { DataService } from "../data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  serverList: Server[] = this.dataService.getAllServers();
  displayedColumns: string[] = [
    "select",
    "name",
    "description",
    "status",
    "server_ip",
    "server_nat_ip",
  ];
  dataSource = new MatTableDataSource<Server>(this.serverList);
  selection = new SelectionModel<Server>(true, []);

  editDisabled = false;
  removeDisabled = false;

  ngOnInit() {
    this.serverList = this.dataService.getAllServers();

    console.log(this.serverList);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Server): string {
    this.editDisabled = this.selection.selected.length !== 1;
    this.removeDisabled = this.selection.selected.length <= 0;

    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }

  addServer() {
    console.log(this.selection);
    const dialogRef = this.dialog.open(AddServerComponent, {
      width: "500px",
      height: "400px",
      data: null
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshTableData();
      console.log(`ServerList: ${this.serverList}`);
    });
  }
  editServer() {
    console.log(this.selection);
    const dialogRef = this.dialog.open(AddServerComponent, {
      width: "500px",
      height: "400px",
      data: this.selection.selected[0],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`ServerList: ${this.serverList}`);
      this.refreshTableData();
    });
  }
  removeServer() {
    this.dataService.removeServer(this.selection.selected);
    console.log("Remove server");
    this.refreshTableData();
  }

  refreshTableData() {
    this.serverList = this.dataService.getAllServers();
    this.dataSource = new MatTableDataSource<Server>(this.serverList);
    this.selection = new SelectionModel<Server>(true, []);
  }

  valueChange($event:any) {
    const searchValue = $event.target.value
    console.log(searchValue);

    const result = this.dataService.getAllServers();
    const filteredList = result.filter(
      (rec) =>
        rec.description.includes(searchValue) ||
        rec.name.includes(searchValue) ||
        rec.server_ip.includes(searchValue) ||
        rec.server_nat_ip.includes(searchValue) ||
        rec.status.includes(searchValue)
    );
    this.serverList = filteredList;
    this.dataSource = new MatTableDataSource<Server>(this.serverList);
    this.selection = new SelectionModel<Server>(true, []);
  }
}
