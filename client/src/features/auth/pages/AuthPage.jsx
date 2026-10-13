import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button'
import { loginUser, registerUser } from '../auth.service'

export default function AuthPage({ mode, state }) {
  const login = mode === 'login'
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      if (login) {
        const result = await loginUser({ login: form.get('email'), password: form.get('password') })
        state.notify('Signed in successfully')
        navigate(result.user?.role === 'admin' ? '/admin' : '/')
      } else {
        const [firstName, ...lastParts] = String(form.get('fullName')).trim().split(' ')
        await registerUser({ firstName, lastName: lastParts.join(' ') || firstName, email: form.get('email'), password: form.get('password'), phone: form.get('phone') })
        state.notify('Account created successfully')
        navigate('/login')
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to complete this request.')
    } finally { setBusy(false) }
  }
  return <div className="auth-page"><div className="auth-image"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85" alt="Calm interior" /><Link className="wordmark" to="/">FORM / OBJECT</Link></div><div className="auth-form"><span className="eyebrow">{login ? 'Welcome back' : 'Join the edit'}</span><h1>{login ? 'Sign in.' : 'Create an account.'}</h1><p className="muted">{login ? 'Access your saved objects and order history.' : 'Save your favourites and make checkout a little easier.'}</p><form onSubmit={submit}>{!login && <><label>Full name<input name="fullName" placeholder="Alex Morgan" required /></label><label>Phone number<input name="phone" placeholder="9876543210" pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian phone number" required /></label></>}<label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label><label>Password<input name="password" type="password" minLength="8" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}" title="Use at least 8 characters with uppercase, lowercase, number, and special character" placeholder="Enter your password" required /></label>{login && <label className="check-row"><input type="checkbox" /> Remember me</label>}{error && <p role="alert">{error.message || error}</p>}<Button type="submit" disabled={busy}>{busy ? 'Please wait...' : login ? 'Sign in' : 'Create account'} <ArrowRight size={17} /></Button></form><p className="auth-switch">{login ? 'New here?' : 'Already have an account?'} <Link to={login ? '/register' : '/login'}>{login ? 'Create an account' : 'Sign in'}</Link></p></div></div>
}
