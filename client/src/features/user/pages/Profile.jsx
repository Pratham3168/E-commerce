import { useEffect, useState } from 'react'
import { ArrowRight, Edit3, LogOut, ShieldAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button'
import { changePassword, deleteAccount, logoutUser } from '../../auth/auth.service'
import { getProfile } from '../user.service'

export default function Profile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' })
  const [passwordForm, setPasswordForm] = useState(false)
  const [message, setMessage] = useState('')
  useEffect(() => { getProfile().then(setProfile).catch(() => {}) }, [])
  async function passwordSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await changePassword({ oldPassword: data.get('oldPassword'), newPassword: data.get('newPassword') }).then(() => { setMessage('Password updated'); setPasswordForm(false) }).catch(error => setMessage(error.response?.data?.message || 'Unable to update password'))
  }
  async function logout() { await logoutUser().catch(() => {}); navigate('/login') }
  async function removeAccount() { const password = window.prompt('Enter your password to delete your account'); if (password) await deleteAccount(password).then(() => navigate('/login')).catch(error => setMessage(error.response?.data?.message || 'Unable to delete account')) }
  return <div className="page-shell narrow-page"><div className="page-intro compact"><div><span className="eyebrow">Your account</span><h1>Profile</h1></div><button className="text-button" onClick={logout}><LogOut size={15} /> Sign out</button></div><div className="profile-card"><div className="avatar">{profile.firstName?.[0]}{profile.lastName?.[0]}</div><div><h2>{profile.firstName} {profile.lastName}</h2><p className="muted">{profile.email}</p><p className="muted">Member account</p></div><Button variant="outline" onClick={() => navigate('/addresses')}><Edit3 size={15} /> Manage addresses</Button></div>{message && <p className="muted">{message}</p>}<div className="settings-list"><button className="setting-row" onClick={() => setPasswordForm(!passwordForm)}><div><b>Password & security</b><span>Update your password and account security</span></div><ArrowRight size={17} /></button><button className="setting-row danger" onClick={removeAccount}><div><b>Delete account</b><span>Permanently remove your account and data</span></div><ShieldAlert size={17} /></button></div>{passwordForm && <form className="detail-panel" onSubmit={passwordSubmit}><label>Current password<input name="oldPassword" type="password" required /></label><label>New password<input name="newPassword" type="password" minLength="6" required /></label><Button type="submit">Update password</Button></form>}</div>
}
