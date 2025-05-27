import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createNewPost(data: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/posts`, data);
  }
  getAllPosts(): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts`);
  }

  getPostById(postId:number): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/${postId}`);
  }

  likePost(postId:number): Observable<any> {
    return this.http.put(BASIC_URL + `api/posts/${postId}/like`, {});
  }

   searchByName(name: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/search/${name}`);
  }

  getPostsCount(): Observable<number> {
    return this.http.get<number>(`${BASIC_URL}api/posts/count`);
  }

  getTagStats(): Observable<{ tag: string; count: number }[]> {
    return this.http.get<{ tag: string; count: number }[]>(`${BASIC_URL}api/posts/tag-stats`);
  }

  updatePost(postId: number, data: any): Observable<any> {
    return this.http.put(`${BASIC_URL}api/posts/${postId}`, data);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}api/posts/${postId}`);
  }



}
