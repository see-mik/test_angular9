import {Component, OnInit} from '@angular/core';
import {Date, DateService} from "../../shared/date.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task, TasksService} from "../../shared/tasks.service";
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-organaizer',
  templateUrl: './organaizer.component.html',
  styleUrls: ['./organaizer.component.scss']
})
export class OrganaizerComponent implements OnInit {

  date: Date;
  form: FormGroup;
  tasks: Task[] = [];

  constructor(private dateService: DateService,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    this.date = this.dateService.getDate();
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });

    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe({
      next: tasks => {
        this.tasks = tasks
      },
      error: err => console.error(err)
    })
  }

  submit() {
    const {title} = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.getDate().value.format('DD-MM-YYYY')
    };

    this.tasksService.create(task).subscribe({
      next: task => {
        this.tasks.push(task);
        this.form.reset();
      },
      error: err => console.error(err)
    });
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id != task.id);
      },
      error: err => console.error(err)
    });
  }
}
