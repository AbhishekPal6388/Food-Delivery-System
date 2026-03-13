import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { username: '', password: '', confirmPassword: '' };
  error = ''; loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.user.password !== this.user.confirmPassword) { this.error = 'Passwords do not match.'; return; }
    this.loading = true; this.error = '';
    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => { this.error = err.error || 'Registration failed.'; this.loading = false; }
    });
  }
}
