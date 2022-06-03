import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import data from 'src/assets/data.json';


@Component({
  selector: 'autocomplete-plain-input-example',
  templateUrl: 'autocomplete-plain-input-example.html',
  styleUrls: ['autocomplete-plain-input-example.css'],
})


export class AutocompletePlainInputExample implements OnInit {
  private Phrases: string[] = data;
  control = new FormControl();
  filteredPhrases: Observable<string[]>;
  ngOnInit() {
    this.filteredPhrases = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.Phrases.filter((phrase) =>
      this._normalizeValue(phrase).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  link(search_text: string) {
    const input = search_text;
    let url = 'https://www.google.com/search?q=' + search_text;
    window.open(url, '_blank');
  }
}
