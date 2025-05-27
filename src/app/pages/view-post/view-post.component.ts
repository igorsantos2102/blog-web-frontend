import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {


  postId = this.activatedRoute.snapshot.params['id'];
  postData: any;
  comments: any;
  likeInProgress = false;
  commentForm!: FormGroup;


  constructor(private postService: PostService,
     private activatedRoute: ActivatedRoute,
     private matSnackBar: MatSnackBar,
     private fb: FormBuilder,
     private commentService: CommentService) { }


  ngOnInit() {
    console.log(this.postId);
    this.getPostById();

    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    });
    }

  publishComment() {
      const postedBy = this.commentForm.get('postedBy')?.value;
      const content = this.commentForm.get('content')?.value;

      this.commentService.createComment(this.postId, postedBy, content).subscribe(res => {
        this.matSnackBar.open('Comentário publicado com sucesso', 'OK');
        this.getCommentsByPost();
      }, error => {
        this.matSnackBar.open('Erro ao publicar comentário', 'OK');
        console.log(error);
      });
      };

  getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(res => {
      this.comments = res;
    }, error => {
      this.matSnackBar.open('Erro ao carregar comentários', 'OK');
      console.log(error);
    });
    }

    

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(res => {
      this.postData = res;
      console.log(res);
      this.getCommentsByPost();
    }, error => {
      this.matSnackBar.open('Erro ao carregar post', 'OK');
      console.log(error);
    });
    }

  
  likePost() {
    this.likeInProgress = true;
    this.postService.likePost(this.postId).subscribe((response) => {
      this.matSnackBar.open('Post curtido com sucesso', 'OK');
      this.likeInProgress = false;
      this.getPostById();
    }, (error) => {
      this.likeInProgress = false;
      this.matSnackBar.open('Erro ao curtir post', 'OK');
      console.log(error);
    }
    );
  }
  


}
