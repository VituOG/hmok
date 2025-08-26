// Login Page JavaScript
(function () {
	// Elements
	const tabs = document.querySelectorAll('.auth-tab')
	const forms = document.querySelectorAll('.auth-form')
	const loginForm = document.getElementById('login-form')
	const registerForm = document.getElementById('register-form')
	const socialButtons = document.querySelectorAll('.btn-social')
	
	// Tab switching
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const target = tab.dataset.tab
			
			// Update active tab
			tabs.forEach(t => t.classList.remove('active'))
			tab.classList.add('active')
			
			// Show/hide forms
			forms.forEach(form => {
				form.hidden = form.dataset.tab !== target
			})
			
			// Focus first input of active form
			const activeForm = document.querySelector(`[data-tab="${target}"]`)
			const firstInput = activeForm?.querySelector('input')
			if (firstInput) firstInput.focus()
		})
	})

	// Login form submission
	if (loginForm) {
		loginForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			
			const submitBtn = loginForm.querySelector('.auth-submit')
			const email = loginForm.querySelector('#login-email').value
			const password = loginForm.querySelector('#login-password').value
			const remember = loginForm.querySelector('input[name="remember"]').checked
			
			// Show loading state
			submitBtn.classList.add('loading')
			
			try {
				// Simulate API call
				await new Promise(resolve => setTimeout(resolve, 1500))
				
				// Store user data
				const userData = {
					email,
					remember,
					loggedIn: true,
					loginTime: Date.now()
				}
				
				if (remember) {
					localStorage.setItem('hone_user', JSON.stringify(userData))
				} else {
					sessionStorage.setItem('hone_user', JSON.stringify(userData))
				}
				
				// Success - redirect to main page with boot screen
				showToast('Login realizado com sucesso!', 'Redirecionando...', 'success')
				
				// Store login state for boot screen
				localStorage.setItem('hone_show_boot', 'true')
				
				setTimeout(() => {
					window.location.href = '/'
				}, 1500)
				
			} catch (error) {
				// Error
				showToast('Erro no login', 'Verifique suas credenciais e tente novamente', 'error')
			} finally {
				// Hide loading state
				submitBtn.classList.remove('loading')
			}
		})
	}

	// Register form submission
	if (registerForm) {
		registerForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			
			const submitBtn = registerForm.querySelector('.auth-submit')
			const name = registerForm.querySelector('#register-name').value
			const email = registerForm.querySelector('#register-email').value
			const password = registerForm.querySelector('#register-password').value
			const confirm = registerForm.querySelector('#register-confirm').value
			const terms = registerForm.querySelector('input[name="terms"]').checked
			
			// Validation
			if (password !== confirm) {
				showToast('Erro na validação', 'As senhas não coincidem', 'error')
				return
			}
			
			if (!terms) {
				showToast('Erro na validação', 'Você deve aceitar os termos', 'error')
				return
			}
			
			// Show loading state
			submitBtn.classList.add('loading')
			
			try {
				// Simulate API call
				await new Promise(resolve => setTimeout(resolve, 2000))
				
				// Store user data
				const userData = {
					name,
					email,
					remember: true,
					loggedIn: true,
					loginTime: Date.now(),
					isNewUser: true
				}
				
				localStorage.setItem('hone_user', JSON.stringify(userData))
				
				// Success - redirect to main page with boot screen
				showToast('Conta criada com sucesso!', 'Redirecionando...', 'success')
				
				// Store login state for boot screen
				localStorage.setItem('hone_show_boot', 'true')
				
				setTimeout(() => {
					window.location.href = '/'
				}, 1500)
				
			} catch (error) {
				// Error
				showToast('Erro na criação da conta', 'Tente novamente em alguns instantes', 'error')
			} finally {
				// Hide loading state
				submitBtn.classList.remove('loading')
			}
		})
	}

	// Social login buttons
	socialButtons.forEach(btn => {
		btn.addEventListener('click', async (e) => {
			e.preventDefault()
			
			const provider = btn.classList.contains('google') ? 'Google' : 'Microsoft'
			
			// Show loading state
			btn.classList.add('loading')
			btn.innerHTML = `
				<svg class="spinner" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
						<animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
						<animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
					</circle>
				</svg>
				Conectando...
			`
			
			try {
				// Simulate social login
				await new Promise(resolve => setTimeout(resolve, 2000))
				
				// Store user data
				const userData = {
					email: `user@${provider.toLowerCase()}.com`,
					provider,
					remember: true,
					loggedIn: true,
					loginTime: Date.now()
				}
				
				localStorage.setItem('hone_user', JSON.stringify(userData))
				
				// Success - redirect to main page with boot screen
				showToast(`Login com ${provider} realizado!`, 'Redirecionando...', 'success')
				
				// Store login state for boot screen
				localStorage.setItem('hone_show_boot', 'true')
				
				setTimeout(() => {
					window.location.href = '/'
				}, 1500)
				
			} catch (error) {
				// Error
				showToast(`Erro no login com ${provider}`, 'Tente novamente', 'error')
				
				// Reset button
				if (provider === 'Google') {
					btn.innerHTML = `
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
							<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
							<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
							<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
						</svg>
						Google
					`
				} else {
					btn.innerHTML = `
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<rect x="1" y="1" width="10" height="10" fill="#F25022"/>
							<rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
							<rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
							<rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
						</svg>
						Microsoft
					`
				}
			} finally {
				btn.classList.remove('loading')
			}
		})
	})

	// Check if user is already logged in
	function checkLoginStatus() {
		const userData = localStorage.getItem('hone_user') || sessionStorage.getItem('hone_user')
		
		if (userData) {
			try {
				const user = JSON.parse(userData)
				if (user.loggedIn) {
					// User is already logged in, redirect to main page
					showToast('Você já está logado!', 'Redirecionando...', 'info')
					setTimeout(() => {
						window.location.href = '/'
					}, 1500)
				}
			} catch (e) {
				// Invalid data, clear it
				localStorage.removeItem('hone_user')
				sessionStorage.removeItem('hone_user')
			}
		}
	}

	// Initialize
	checkLoginStatus()
	
	// Focus first input on page load
	const firstInput = document.querySelector('input')
	if (firstInput) firstInput.focus()
	
	console.log('🔐 Login page initialized successfully!')
})()
