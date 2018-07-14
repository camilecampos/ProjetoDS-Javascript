import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { OperatorService } from './operator.service';
import { Operator } from './operator';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  // Component properties
  allOperators: Operator[];
  statusCode: number;
  requestProcessing = false;
  operatorIdToUpdate = null;
  processValidation = false;
  // Create form
  operatorForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  // Create constructor to get service instance
  constructor(private operatorService: OperatorService) {
  }
  // Create ngOnInit() and and load operators
  ngOnInit(): void {
    this.getAllOperators();
  }
  // Fetch all operators
  getAllOperators() {
    this.operatorService.getAllOperators().subscribe(
      data => this.allOperators = data,
      errorCode => this.statusCode = errorCode);
  }
  // Handle create and update operator
  onOperatorFormSubmit() {
    this.processValidation = true;
    if (this.operatorForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    const operator = this.operatorForm.value;
    if (this.operatorIdToUpdate === null) {
      // Generate operator id then create operator
      this.operatorService.getAllOperators()
        .subscribe(operators => {

          // Generate operator id
          const maxIndex = operators.length - 1;
          const operatorWithMaxIndex = operators[maxIndex];
          const operatorId = operatorWithMaxIndex.id + 1;
          operator.id = operatorId;

          // Create operator
          this.operatorService.createOperator(operator)
            .subscribe(successCode => {
              this.statusCode = successCode;
              this.getAllOperators();
              this.backToCreateOperator();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      // Handle update operator
      operator.id = this.operatorIdToUpdate;
      this.operatorService.updateOperator(operator)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllOperators();
          this.backToCreateOperator();
        },
          errorCode => this.statusCode = errorCode);
    }
  }
  // Load operator by id to edit
  loadOperatorToEdit(operatorId: string) {
    this.preProcessConfigurations();
    this.operatorService.getOperatorById(operatorId)
      .subscribe(operator => {
        this.operatorIdToUpdate = operator.id;
        this.operatorForm.setValue({ title: operator.name, category: operator.email });
        this.processValidation = true;
        this.requestProcessing = false;
      },
        errorCode => this.statusCode = errorCode);
  }
  // Delete operator
  deleteOperator(operatorId: string) {
    this.preProcessConfigurations();
    this.operatorService.deleteOperatorById(operatorId)
      .subscribe(successCode => {
        // this.statusCode = successCode;
        // Expecting success code 204 from server
        this.statusCode = 204;
        this.getAllOperators();
        this.backToCreateOperator();
      },
        errorCode => this.statusCode = errorCode);
  }
  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  // Go back from update to create
  backToCreateOperator() {
    this.operatorIdToUpdate = null;
    this.operatorForm.reset();
    this.processValidation = false;
  }
}
