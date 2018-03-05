import { Component, OnInit } from '@angular/core';
import { DsService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  userStatus = "";
  user = "";
  timeline=[];
  client;

  constructor(private dsservice: DsService){

  }

  ngOnInit(){
    this.client = this.dsservice.ds.login();
    const list = this.client.record.getList('timeline');
    
    
    list.whenReady( list =>{
      const entries = list.getEntries();
      /** Fetch all existing entries */
      for(let i =0; i<entries.length; i++){
        this.client.record.getRecord(entries[i]).whenReady(record =>{
          record.subscribe(data => {
            this.timeline.unshift(data);
          }, true);
        });
      }

      /** Listen to new entries */
      list.on('entry-added', (recordName)=>{
        console.log(list.getEntries());
        this.client.record.getRecord(recordName).whenReady(record =>{
          record.subscribe(data => {
            this.timeline.unshift(data);
          }, true);
        });
      });
    });
  }

  /** sets user's status */
  onKey(ev){
    this.userStatus = ev.target.value;
  }

  /** add a new post to timeline */
  addPost(){
    if(!this.user){
      return alert("Enter your name, to proceed.");
    }
    
    const uid = Math.floor(Math.random() * 1000);
    const recordName = `status/${uid}`;
    const record = this.client.record.getRecord(recordName);
    record.whenReady(record => {
      // data has now been loaded
      record.set({
        author: this.user,
        content: this.userStatus
      });
      const list = this.client.record.getList('timeline');
      list.addEntry(recordName);
      this.userStatus = "";
    });
  }

  /** Sets user's name */
  setUser(ev){
    this.user = ev.target.value;
  }
}
