import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {UserRound, Mail, LockKeyhole, Eye, EyeOff, ArrowRight, Apple} from 'lucide-react';
import './styles.css';

function App(){
  const [mode,setMode]=useState('signup');
  const [showPass,setShowPass]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);
  const [loading,setLoading]=useState(false);
  const submit=(e)=>{e.preventDefault();setLoading(true);setTimeout(()=>setLoading(false),1300)};
  return <main className="page">
    <div className="noise"/>
    <div className="aurora a1"/><div className="aurora a2"/><div className="aurora a3"/>
    <div className="ribbon r1"/><div className="ribbon r2"/><div className="ribbon r3"/><div className="ribbon r4"/>

    <header className="hero"><div>Login form</div><strong>V7</strong></header>

    <section className="card-wrap">
      <div className="corner c1"/><div className="corner c2"/>
      <div className="card">
        <div className="topline"><span>{mode==='signup'?'Create':'Welcome'} <b>Account</b></span></div>
        <p className="sub">{mode==='signup'?'Join us today to access your secure workspace':'Sign in to continue to your workspace'}</p>

        {mode==='signup' ? <form onSubmit={submit}>
          <label>Full Name</label><div className="field"><UserRound/><input placeholder="Alex Johnson"/></div>
          <label>Email Address</label><div className="field"><Mail/><input type="email" placeholder="name@domain.com"/></div>
          <div className="twocol"><div><label>Password</label><div className="field"><LockKeyhole/><input type={showPass?'text':'password'} placeholder="••••••••"/><button type="button" onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff/>:<Eye/>}</button></div></div><div><label>Confirm Password</label><div className="field"><LockKeyhole/><input type={showConfirm?'text':'password'} placeholder="••••••••"/><button type="button" onClick={()=>setShowConfirm(!showConfirm)}>{showConfirm?<EyeOff/>:<Eye/>}</button></div></div></div>
          <label className="check"><input type="checkbox" defaultChecked/> <span>I agree to the Terms & Privacy Policy</span></label>
          <button className="primary" disabled={loading}>{loading?'Creating...':'Create Account'} <ArrowRight/></button>
        </form> : <form onSubmit={submit}>
          <label>Email Address</label><div className="field"><Mail/><input type="email" placeholder="name@domain.com"/></div>
          <label>Password</label><div className="field"><LockKeyhole/><input type={showPass?'text':'password'} placeholder="••••••••"/><button type="button" onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff/>:<Eye/>}</button></div>
          <button className="primary" disabled={loading}>{loading?'Signing in...':'Sign In'} <ArrowRight/></button>
        </form>}

        <div className="divider"><span>or continue with</span></div>
        <div className="social"><button><span className="google">G</span> Google</button><button><Apple/> Apple</button></div>
        <p className="switch">{mode==='signup'?'Already have an account?':'Don’t have an account?'} <button onClick={()=>setMode(mode==='signup'?'login':'signup')}>{mode==='signup'?'Sign In':'Create Account'}</button></p>
      </div>
    </section>
    <div className="hint">LOW FLOW <b>FOR MORE</b></div>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);
