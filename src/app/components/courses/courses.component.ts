import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterPaths } from 'src/app/enums/router-paths.enum';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  currentPath: string;
  routerPaths = RouterPaths;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.currentPath = this.route.snapshot.routeConfig?.path!;
  }

}
