import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WeightEntry} from '../models/weight.model';
import {WeightService} from '../weight.service';

@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.component.html',
  styleUrls: ['./weight-list.component.css']
})
export class WeightListComponent implements OnInit {
  weightEntries: { entry: WeightEntry, weightDiff: number, dayDiff: number }[] = [];

  /**
  Starting page for the pagination
   */
  page = 1;

  /**
   * number of elements per page
   */
  pageSize = 10;

  /**
   * Number of pages shown before the ellipsis
   */
  maxPageShown = 7;

  constructor(
    private service: WeightService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.processWeightEntries();
  }

  /**
   * Processes the
   */
  async processWeightEntries(): Promise<void> {
    const entries = await this.service.loadWeightEntries();
    const nrOfEntries = entries.length;

    entries.forEach((currentEntry, index) => {

      // Newest entries are the first
      const prevIndex = index + 1;

      const weightDiff = prevIndex < nrOfEntries ? currentEntry.weight - entries[prevIndex].weight  : 0;
      const dayDiff = prevIndex < nrOfEntries ? (currentEntry.date.getTime() - entries[prevIndex].date.getTime()) / (1000 * 3600 * 24) : 0;

      this.weightEntries.push({entry: currentEntry, weightDiff: weightDiff, dayDiff: dayDiff});
    });

  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed`);
    });
  }
}