import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <!-- About -->
          <div>
            <h3 class="text-lg font-bold mb-4">🎮 GameHub</h3>
            <p class="text-gray-400 text-sm">
              A gaming platform where you can play classic games, compete with others, and have fun.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold mb-4">Quick Links</h3>
            <ul class="text-gray-400 text-sm space-y-2">
              <li>
                <a href="#" class="hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition">Games</a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition">Rankings</a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition">Chat</a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-bold mb-4">Contact</h3>
            <p class="text-gray-400 text-sm mb-2">Have questions?</p>
            <p class="text-gray-400 text-sm">
              Email:
              <a href="mailto:support@gamehub.com" class="hover:text-white transition">
                support@gamehub.com
              </a>
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-700 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">&copy; 2026 GameHub. All rights reserved.</p>
            <div class="flex gap-6 mt-4 md:mt-0">
              <a href="#" class="text-gray-400 hover:text-white transition text-sm">
                Privacy Policy
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition text-sm">
                Terms of Service
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition text-sm">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
