import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit {
  postForm!: FormGroup;
  tags: string[] = [];
  postId: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.postId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      tags: [''] 
    });
    this.postService.getPostById(this.postId).subscribe(post => {
      this.postForm.patchValue({
        name: post.name,
        img: post.img,
        content: post.content
      });
      this.tags = post.tags || [];
    });
  }

  onSave() {
    const data = { ...this.postForm.value, tags: this.tags };
    this.postService.updatePost(this.postId, data).subscribe(() => {
      this.snackBar.open('Post atualizado!', 'OK');
      this.router.navigateByUrl(`/view-post/${this.postId}`);
    }, err => {
      this.snackBar.open('Erro ao atualizar', 'OK');
    });
  }

  addTag(event: any) {
    const value = (event.value || '').trim();
    if (value) this.tags.push(value);
    event.chipInput!.clear();
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }
  
}
