import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';


export abstract class BaseService {

  constructor(protected http: HttpClient, protected endPoint:string) { 
  
  }

  create<Type>(entity:Type){
      return lastValueFrom(this.http.post<Type>(`/api/create${this.endPoint}`, entity));
  }

  get<Type>(id:number){
    return lastValueFrom(this.http.get<Type>(`/api/${this.endPoint}/${id}`));
  }

  getAll<Type>(){
    return lastValueFrom(this.http.get<Type[]>(`/api/${this.endPoint}`));
  }

  delete(id:number){
    return lastValueFrom(this.http.delete(`/api/${this.endPoint}/${id}`));
  }

  update<Type>(entity:Type){
    return lastValueFrom(this.http.put<Type>(`/api/${this.endPoint}/${(entity as any).id}`, entity));
  }
}
