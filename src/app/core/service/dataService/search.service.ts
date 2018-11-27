
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private messageSource = new BehaviorSubject(' this is default message');
  currentMessage = this.messageSource.asObservable();
  
  private datasource=new BehaviorSubject("this is defalut")
  currentdata=this.datasource.asObservable();

  private change=new BehaviorSubject("defalut");
  currchange=this.change.asObservable();

  public add=new BehaviorSubject("defalut");
  onadd=this.add.asObservable();

  public reminder=new BehaviorSubject("default");
  onReminder=this.reminder.asObservable();

  public archive=new BehaviorSubject("daufault")
  onarchive=this.archive.asObservable();

  public chip=new BehaviorSubject("default")
  onClickChip=this.chip.asObservable()

  public select=new BehaviorSubject("default");
  onSelect=this.select.asObservable();


  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  
  changedata(data:any){
    this.datasource.next(data);
  }

  changecurr(data:any){
    this.change.next(data);
  }

  reminderToAdd(data:any){
    this.reminder.next(data);
  }

  addSucess(data:any){
    this.add.next(data);
  }

  updateReminder(data:any){
    this.archive.next(data);
  }

  getMenu(data:any){
    this.chip.next(data);
  }

  deSelect(data:any){
    this.select.next(data);
  }

}
