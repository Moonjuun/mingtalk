// src/lib/auth.ts
import {supabase} from './supabase';

// 회원가입
export async function signUpWithEmail(email: string, password: string) {
  const {user, session, error} = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return {user, session};
}

// 로그인
export async function signInWithEmail(email: string, password: string) {
  const {user, session, error} = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) throw error;
  return {user, session};
}

// 로그아웃
export async function signOut() {
  const {error} = await supabase.auth.signOut();
  if (error) throw error;
}
