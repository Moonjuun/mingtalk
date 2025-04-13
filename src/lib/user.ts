import {supabase} from './supabase';

type UserProfile = {
  id: string;
  email: string;
  nickname: string;
  gender: string;
  birth: string;
  location: string;
  profile_image_url?: string;
};

export async function createUserProfile(profile: UserProfile) {
  const {error} = await supabase.from('users').insert([profile]);
  if (error) throw error;
}
