import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberModel } from '../models/MemberModel';
//le decorateur @injectable signifie que le service accepte d'etre injecté(appelé) dans les composants ou 
// dans les autres services

@Injectable({
  providedIn: 'root',//onjectable sur toute le root de l'application
})
export class MemberService {
  constructor(private http:HttpClient){}

 //genere les requetes http pour consommer les API de backend
 getALLMembers(){
  return this.http.get<MemberModel[]>('http://localhost:3000/members');
 } 
 AddMember(member:MemberModel){
  return this.http.post<MemberModel>('http://localhost:3000/members',member);
 }
deleteMember(id: String) {
  return this.http.delete<void>(`http://localhost:3000/members/${id}`);
}
getMemberById(id: string) {
  return this.http.get<MemberModel>(`http://localhost:3000/members/${id}`);
}
updateMember(id: string, member: MemberModel) {//put khater 3titeha object
  return this.http.put<MemberModel>(`http://localhost:3000/members/${id}`, member); 
}
//njemou nest3mlou patch ama ndeblou kol attribut mnjibouch object kmel (patch ta3ti attribut o put ta3ti object kmel )

}
