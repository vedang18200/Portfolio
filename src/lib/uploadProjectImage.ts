import { supabase } from '@/lib/supabaseClient';

export async function uploadProjectImage(file: File, projectId: string) {
  const fileExt = file.name.split('.').pop();
  const filePath = `projects/${projectId}.${fileExt}`;
  const { data, error } = await supabase.storage.from('project-images').upload(filePath, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  // Get public URL
  const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}
