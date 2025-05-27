import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent {

  allPosts: any[] = [];
  currentUserEmail = localStorage.getItem('email');
  
  constructor(private postService: PostService,
     private snackBar: MatSnackBar,
     private router: Router) { }


  ngOnInit() {
    this.currentUserEmail = localStorage.getItem('email');
    this.getAllPosts();
  }

  getAllPosts() {
      this.postService.getAllPosts().subscribe(res => {
        console.log(res);
        this.allPosts = res;
        this.snackBar.open('Posts carregados com sucesso', 'OK');
      }, error => {
        this.snackBar.open('Erro ao carregar posts', 'OK');
        console.log(error);
      })
  }

  onDelete(postId: number) {
    if (!confirm('Tem certeza que deseja excluir esta postagem?')) {
      return;
    }
    this.postService.deletePost(postId).subscribe(() => {
      this.snackBar.open('Postagem excluída', 'OK');
      this.getAllPosts();
    }, error => {
      this.snackBar.open('Erro ao excluir', 'OK');
      console.error(error);
    });
  }

}
