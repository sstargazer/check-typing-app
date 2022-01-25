import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'newtyping';
  url = 'https://api.publicapis.org/entries';
  sentences: any;
  sentence: any;
  initialLoad = true;
  match = false;

  value: string = '';

  constructor(private http: HttpClient) {
    http
      .get(this.url)
      .pipe(map((res: any) => res.entries))
      .subscribe((data) => {
        this.sentences = data
          .slice(0, 100)
          .map((article: any) => article.Description);
        this.loadSentences();
      });
  }

  compare(main: string, input: string) {
    if (!input) return 'pending';

    return main === input ? 'correct' : 'incorrect';
  }

  onChange(e: any) {
    this.value = e.target.value;
    if (this.sentence.join('') === this.value) this.match = true;
    else this.match = false;
  }

  loadSentences() {
    let n = Math.floor(Math.random() * 100 + 1);
    this.initialLoad = false;
    this.sentence = this.sentences[n].split('');
    // console.log(this.sentence.split(''));
  }
}
