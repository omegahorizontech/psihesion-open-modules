import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-group',
  templateUrl: './image-group.component.html',
  styleUrls: ['./image-group.component.css']
})
export class ImageGroupComponent implements OnInit {

  @Input() imageroot: string = '';
  @Input() imagelist: string = '';
  imagepaths: Array<string> = []
  
  constructor() { }

  ngOnInit(): void {
    for (const i of this.imagelist.split(',')) {
      this.imagepaths.push(this.imageroot + i)  
    }
  }

}
