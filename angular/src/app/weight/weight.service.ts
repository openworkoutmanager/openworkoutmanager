import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {WeightAdapter, WeightEntry} from './models/weight.model';


@Injectable({
  providedIn: 'root',
})
export class WeightService {
  weightEntryUrl = environment.apiUrl + 'weightentry';

  entries: WeightEntry[] = [];

  constructor(private http: HttpClient,
              private weightAdapter: WeightAdapter,
  ) {
  }


  async loadWeightEntries(): Promise<WeightEntry[]> {
    const data = await this.http.get<any>(this.weightEntryUrl, {params: {limit: 10}, headers: environment.headers}).toPromise();

    for (const weightData of data.results) {
      this.entries.push(this.weightAdapter.fromJson(weightData));
    }

    return this.entries;
  }

  updateWeightEntry(data: any) {

  }

  addWeightEntry(data: any) {

  }

  /**
   * Deletes the weight entry with the given ID
   *
   * @param id: ID of the weight entry
   */
  deleteWeightEntry(id: number) {

    this.http.delete<any>(this.weightEntryUrl + '/' + id + '/', {
      headers: environment.headers
    }).subscribe();


    this.entries.forEach((value: WeightEntry, index: number) => {
      if (value.id == id) {
        this.entries.splice(index, 1);
      }
    });
  }
}
