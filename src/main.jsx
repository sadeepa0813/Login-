import React, {useState, useRef, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {UserRound, Mail, LockKeyhole, Eye, EyeOff, ArrowRight, Apple} from 'lucide-react';
import './styles.css';

const SWAP_AT = 700;   // ms: content swaps while hidden
const DONE_AT = 1250;  // ms: animation finished

function Field({id, label, icon: Icon, value, onChange, ...rest}) {
  return <div>
    <label htmlFor={id}>{label}</label>
    <div className="field"><Icon aria-hidden="true"/>
      <input id={id} name={id} value={value} onChange={e => onChange(e.target.value)} required {...rest}/>
    </div>
  </div>;
}

function PasswordField({id, label, value, onChange, autoComplete, minLength}) {
  const [show, setShow] = useState(false);
  return <div>
    <label htmlFor={id}>{label}</label>
    <div className="field"><LockKeyhole aria-hidden="true"/>
      <input id={id} name={id} type={show ? 'text' : 'password'} placeholder="••••••••" value={value}
        onChange={e => onChange(e.target.value)} autoComplete={autoComplete} minLength={minLength} required/>
      <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(s => !s)}>
        {show ? <EyeOff/> : <Eye/>}
      </button>
    </div>
  </div>;
}

// Static background: memoized so typing never re-renders it
const Bg = React.memo(() => <>
  <div className="noise"/>
  <div className="aurora a1"/><div className="aurora a2"/><div className="aurora a3"/>
  <div className="ribbon r1"/><div className="ribbon r2"/><div className="ribbon r3"/><div className="ribbon r4"/>
</>);

function App() {
  const [mode, setMode] = useState('signup');
  const [phase, setPhase] = useState('idle'); // idle | out | in
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [f, setF] = useState({name: '', email: '', pw: '', pw2: '', terms: false});
  const [h, setH] = useState(null);
  const inner = useRef(null);
  const timers = useRef([]);
  const set = k => v => setF(s => ({...s, [k]: v}));
  const signup = mode === 'signup';

  // Smoothly animate card height between the two forms
  useEffect(() => {
    const ro = new ResizeObserver(() => setH(inner.current.offsetHeight));
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const toggle = () => {
    if (phase !== 'idle') return;
    setPhase('out'); setError('');
    timers.current = [
      setTimeout(() => { setMode(m => m === 'signup' ? 'login' : 'signup'); setPhase('in'); }, SWAP_AT),
      setTimeout(() => setPhase('idle'), DONE_AT)
    ];
  };

  const submit = e => {
    e.preventDefault();
    if (signup && f.pw !== f.pw2) { setError('Passwords do not match'); return; }
    setError(''); setLoading(true);
    setTimeout(() => setLoading(false), 1300); // TODO: replace with real API call
  };

  return <main className="page">
    <Bg/>

    <h1 className="hero"><span>Sadeepa</span><strong>login</strong></h1>

    <section className="card-wrap" data-sw={phase === 'idle' ? 'off' : 'on'}>
      {phase !== 'idle' && <><div className="corner c1"/><div className="corner c2"/><div className="spark"/></>}
      <div className="card" data-phase={phase}>
        <div className="body" style={{height: h === null ? 'auto' : h + 12}}>
          <div className="content" ref={inner}>
            <div className="topline"><span>{signup ? 'Create' : 'Welcome'} <b>Account</b></span></div>
            <p className="sub">{signup ? 'Join us today to access your secure workspace' : 'Sign in to continue to your workspace'}</p>

            <form onSubmit={submit}>
              {signup && <Field id="name" label="Full Name" icon={UserRound} placeholder="Alex Johnson" autoComplete="name" value={f.name} onChange={set('name')}/>}
              <Field id="email" label="Email Address" icon={Mail} type="email" placeholder="name@domain.com" autoComplete="email" value={f.email} onChange={set('email')}/>
              {signup ? <div className="twocol">
                <PasswordField id="password" label="Password" autoComplete="new-password" minLength={8} value={f.pw} onChange={set('pw')}/>
                <PasswordField id="confirm" label="Confirm Password" autoComplete="new-password" minLength={8} value={f.pw2} onChange={set('pw2')}/>
              </div> : <PasswordField id="password" label="Password" autoComplete="current-password" value={f.pw} onChange={set('pw')}/>}
              {signup && <label className="check"><input type="checkbox" required checked={f.terms} onChange={e => set('terms')(e.target.checked)}/> <span>I agree to the Terms &amp; Privacy Policy</span></label>}
              {error && <p className="err" role="alert">{error}</p>}
              <button className="primary" disabled={loading}>{loading ? (signup ? 'Creating...' : 'Signing in...') : (signup ? 'Create Account' : 'Sign In')} <ArrowRight aria-hidden="true"/></button>
            </form>

            <div className="divider"><span>or continue with</span></div>
            <div className="social"><button type="button"><span className="google">G</span> Google</button><button type="button"><Apple aria-hidden="true"/> Apple</button></div>
            <p className="switch">{signup ? 'Already have an account?' : 'Don’t have an account?'} <button type="button" onClick={toggle}>{signup ? 'Sign In' : 'Create Account'}</button></p>
          </div>
        </div>
      </div>
    </section>
    <div className="hint">LOW FLOW <b>FOR MORE</b></div>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
