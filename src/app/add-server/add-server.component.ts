import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { DataService } from "../data.service";
import { Server } from "../Server";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: "app-add-server",
  templateUrl: "./add-server.component.html",
  styleUrls: ["./add-server.component.css"],
})
export class AddServerComponent {
  ngOnInit() {
    // will log the entire data object
    console.log(this.data);
  }

  formSubmitAttempt = false;
  createServerForm: FormGroup;

  formAction = this.data ? "Update" : "Save & Close";

  statusList = [
    { value: "online", displayVal: "Online" },
    { value: "pending", displayVal: "Pending" },
    { value: "error", displayVal: "Error" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddServerComponent>
  ) {
    this.createServerForm = this.formBuilder.group({
      name: [data ? data.name : null, Validators.required],
      description: [data ? data.description : null, Validators.required],
      status: [data ? data.status : null, Validators.required],
      server_ip: [data ? data.server_ip : null, Validators.required],
      server_nat_ip: [data ? data.server_nat_ip : null, Validators.required],
      nat_space_id: [data ? data.nat_space_id : null, Validators.required],
    });
  }

  onCancelClick() {
    this.dialogRef.close();
    console.log("Form closed");
  }

  onSubmit(formData: any) {
    this.formSubmitAttempt = true;
    if (this.createServerForm.valid) {
      if (!this.data) {
        const newServer: Server = {
          id: 0,
          name: formData.name,
          description: formData.description,
          server_ip: formData.server_ip,
          status: formData.status,
          server_nat_ip: formData.server_nat_ip,
          nat_space_id: formData.nat_space_id,
        };
        const result = this.dataService.addNewServer(newServer);
      } else {
        const updatedData: Server = {
          id: this.data.id,
          name: formData.name,
          description: formData.description,
          server_ip: formData.server_ip,
          status: formData.status,
          server_nat_ip: formData.server_nat_ip,
          nat_space_id: formData.nat_space_id,
        };
        const result = this.dataService.editServer(updatedData);
        console.log(result);
      }
      this.dialogRef.close();
    }
  }
}
