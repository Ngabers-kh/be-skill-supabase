const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Cek koneksi dengan query sederhana
(async () => {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) {
    console.error('Koneksi ke Supabase GAGAL:', error.message);
  } else {
    console.log('Koneksi ke Supabase BERHASIL');
  }
})();

module.exports = supabase;